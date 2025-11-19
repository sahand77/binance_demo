import { ref, computed, watch, onMounted, onBeforeUnmount, type Ref } from 'vue'

export const useOrderBook = (symbol: Ref<string>, depthStep: Ref<string | number>) => {
  const DISPLAY_ROWS = 15
  const BOOK_LEVEL_LIMIT = 1000

  type RawLevel = [number | string, number | string]
  type Level = [number, number]

  const orderBookBids = ref<Level[]>([])
  const orderBookAsks = ref<Level[]>([])
  const lastUpdateId = ref<number | null>(null)
  const pending = ref(false)
  const error = ref<Error | null>(null)

  let ws: WebSocket | null = null
  let eventBuffer: any[] = []
  let isInitializing = false
  let lastStreamUpdateId: number | null = null

  const normalizeLevels = (levels: RawLevel[], side: 'bid' | 'ask'): Level[] => {
    const filtered = levels
      .map(level => {
        const price = Number(level[0])
        const size = Number(level[1])
        if (!price || !size) {
          return null
        }
        return [price, size] as Level
      })
      .filter((level): level is Level => level !== null)

    filtered.sort((a, b) => (side === 'bid' ? b[0] - a[0] : a[0] - b[0]))
    return filtered.slice(0, BOOK_LEVEL_LIMIT)
  }

  const applyDepthUpdate = (levelsRef: Ref<Level[]>, updates: RawLevel[], side: 'bid' | 'ask') => {
    if (!Array.isArray(updates) || !updates.length) {
      return
    }

    const nextLevels = [...levelsRef.value]
    let mutated = false

    for (const update of updates) {
      const price = Number(update[0])
      const size = Number(update[1])
      if (!price) {
        continue
      }

      const existingIndex = nextLevels.findIndex(level => level[0] === price)

      if (!size) {
        if (existingIndex !== -1) {
          nextLevels.splice(existingIndex, 1)
          mutated = true
        }
        continue
      }

      if (existingIndex !== -1) {
        if (nextLevels[existingIndex][1] !== size) {
          nextLevels[existingIndex][1] = size
          mutated = true
        }
      } else {
        nextLevels.push([price, size])
        mutated = true
      }
    }

    if (!mutated) {
      return
    }

    nextLevels.sort((a, b) => (side === 'bid' ? b[0] - a[0] : a[0] - b[0]))
    levelsRef.value = nextLevels.slice(0, BOOK_LEVEL_LIMIT)
  }

  const resetOrderBookState = () => {
    orderBookBids.value = []
    orderBookAsks.value = []
    lastUpdateId.value = null
    eventBuffer = []
    lastStreamUpdateId = null
    isInitializing = false
  }

  const rawBids = computed(() => orderBookBids.value)

  const rawAsks = computed(() => orderBookAsks.value)

  function formatNumber(value: number | string, decimals = 2) {
    const num = Number(value)
    if (Number.isNaN(num)) return '--'
    return num.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    })
  }

  const depthData = computed(() => {
    const step = Number(depthStep.value) || 0

    const groupSide = (levels: Array<[number | string, number | string]>, side: 'bid' | 'ask') => {
      const buckets = new Map()

      for (const level of levels) {
        const price = Number(level[0])
        const size = Number(level[1])
        if (!price || !size) {
          continue
        }

        let bucketPrice
        if (step > 0) {
          if (side === 'bid') {
            bucketPrice = Math.floor(price / step) * step
          } else {
            bucketPrice = Math.ceil(price / step) * step
          }
        } else {
          bucketPrice = price
        }

        const previous = buckets.get(bucketPrice) || 0
        buckets.set(bucketPrice, previous + size)
      }

      let entries = Array.from(buckets.entries())
      if (side === 'bid') {
        entries.sort((a, b) => b[0] - a[0])
      } else {
        entries.sort((a, b) => a[0] - b[0])
        entries = entries.reverse()
      }

      const rows = entries.slice(0, DISPLAY_ROWS).map(([price, size]) => ({
        price,
        size
      }))

      let cumulative = 0
      let sums: number[]

      if (side === 'bid') {
        sums = rows.map(row => {
          cumulative += row.size
          return cumulative
        })
      } else {
        const reversedRows = [...rows].reverse()
        const reversedSums = reversedRows.map(row => {
          cumulative += row.size
          return cumulative
        })
        sums = reversedSums.reverse()
      }

      return { rows, sums }
    }

    const bidResult = groupSide(rawBids.value, 'bid')
    const askResult = groupSide(rawAsks.value, 'ask')

    const totalBidSum = bidResult.sums[bidResult.sums.length - 1] || 1
    const totalAskSum = askResult.sums[0] || 1

    const formattedBids = bidResult.rows.map((row, index) => ({
      price: formatNumber(row.price, 1),
      size: formatNumber(row.size, 3),
      sum: formatNumber(bidResult.sums[index], 3),
      depth: `${((bidResult.sums[index] / totalBidSum) * 100).toFixed(1)}%`
    }))

    const formattedAsks = askResult.rows.map((row, index) => ({
      price: formatNumber(row.price, 1),
      size: formatNumber(row.size, 3),
      sum: formatNumber(askResult.sums[index], 3),
      depth: `${((askResult.sums[index] / totalAskSum) * 100).toFixed(1)}%`
    }))

    return {
      bids: formattedBids,
      asks: formattedAsks
    }
  })

  const formattedBids = computed(() => depthData.value.bids)
  const formattedAsks = computed(() => depthData.value.asks)

  const bestBid = computed(() => (rawBids.value[0] ? Number(rawBids.value[0][0]) : null))
  const bestAsk = computed(() => (rawAsks.value[0] ? Number(rawAsks.value[0][0]) : null))

  const spreadValue = computed(() => {
    if (!bestBid.value || !bestAsk.value) return null
    return bestAsk.value - bestBid.value
  })

  const midPrice = computed(() => {
    if (!bestBid.value || !bestAsk.value) {
      return '--'
    }
    return formatNumber((bestBid.value + bestAsk.value) / 2, 1)
  })

  const spreadDisplay = computed(() => {
    if (spreadValue.value == null) {
      return '--'
    }
    return `${formatNumber(spreadValue.value, 1)} spread`
  })

  const spreadDirectionClass = computed(() => {
    if (!bestBid.value || !bestAsk.value) return ''
    return bestBid.value >= bestAsk.value ? 'text-green' : 'text-red'
  })

  const hasError = computed(() => !!error.value)

  const handleDepthEvent = (payload: any): boolean => {
    const bids = Array.isArray(payload.bids) ? payload.bids : payload.b
    const asks = Array.isArray(payload.asks) ? payload.asks : payload.a

    if (!Array.isArray(bids) || !Array.isArray(asks)) {
      return true
    }

    if (typeof payload.u === 'number' && lastUpdateId.value !== null && payload.u < lastUpdateId.value) {
      return true
    }

    if (
      lastStreamUpdateId !== null &&
      typeof payload.pu === 'number' &&
      typeof payload.u === 'number' &&
      payload.pu !== lastStreamUpdateId
    ) {
      resetOrderBookState()
      connectOrderBookStream()
      return false
    }

    applyDepthUpdate(orderBookBids, bids, 'bid')
    applyDepthUpdate(orderBookAsks, asks, 'ask')

    if (typeof payload.u === 'number') {
      lastUpdateId.value = payload.u
      lastStreamUpdateId = payload.u
    }

    pending.value = false
    return true
  }

  const handleRefreshClick = () => {
    resetOrderBookState()
    connectOrderBookStream()
  }

  async function connectOrderBookStream() {
    if (typeof window === 'undefined') {
      return
    }

    console.log('[OrderBook] connectOrderBookStream called', { symbol: symbol.value })

    if (ws && ws.readyState === WebSocket.OPEN) {
      console.log('[OrderBook] Closing existing WebSocket before reconnect')
      ws.close()
    }

    resetOrderBookState()
    pending.value = true
    error.value = null
    isInitializing = true
    eventBuffer = []

    const streamSymbol = symbol.value.toLowerCase()
    const url = `wss://fstream.binance.com/stream?streams=${streamSymbol}@depth`

    console.log('[OrderBook] Connecting WebSocket to', url)

    ws = new WebSocket(url)

    ws.onopen = () => {
      console.log('[OrderBook] WebSocket opened', url)
    }

    ws.onerror = event => {
      console.error('[OrderBook] WebSocket error', event)
    }

    ws.onmessage = event => {
      try {
        console.log('payload')
        let payload: any = JSON.parse(event.data)

        if (payload && typeof payload === 'object' && 'stream' in payload && payload.data) {
          payload = payload.data
        }

        if (!payload) {
          return
        }

        if (isInitializing) {
          eventBuffer.push(payload)
          return
        }
        console.log(payload)
        handleDepthEvent(payload)
      } catch (e) {
        console.error(e)
        error.value = e instanceof Error ? e : new Error(String(e))
        pending.value = false
      }
    }

    ws.onclose = event => {
      console.log('[OrderBook] WebSocket closed', event)
      ws = null
    }

    try {
      const snapshotSymbol = symbol.value.toUpperCase()
      const snapshotUrl = `https://fapi.binance.com/fapi/v1/depth?symbol=${snapshotSymbol}`
      const res = await fetch(snapshotUrl)
      if (!res.ok) {
        throw new Error(`Failed to fetch depth snapshot: ${res.status}`)
      }
      const snapshot = await res.json()

      const snapshotLastUpdateId = snapshot.lastUpdateId

      if (typeof snapshotLastUpdateId !== 'number') {
        throw new Error('Invalid snapshot data')
      }

      const snapshotBids = Array.isArray(snapshot.bids) ? snapshot.bids : []
      const snapshotAsks = Array.isArray(snapshot.asks) ? snapshot.asks : []

      orderBookBids.value = normalizeLevels(snapshotBids, 'bid')
      orderBookAsks.value = normalizeLevels(snapshotAsks, 'ask')
      lastUpdateId.value = snapshotLastUpdateId

      const validBuffer = eventBuffer.filter(
        ev => typeof ev.u === 'number' && ev.u >= snapshotLastUpdateId
      )

      let started = false

      for (const ev of validBuffer) {
        if (!started) {
          if (!(typeof ev.U === 'number' && ev.U <= snapshotLastUpdateId && ev.u >= snapshotLastUpdateId)) {
            continue
          }
          started = true
        }

        const ok = handleDepthEvent(ev)
        if (!ok) {
          return
        }
      }

      isInitializing = false
      eventBuffer = []
      pending.value = false
    } catch (e) {
      console.error(e)
      error.value = e instanceof Error ? e : new Error(String(e))
      pending.value = false
    }
  }

  onMounted(() => {
    connectOrderBookStream()
  })

  watch(symbol, () => {
    resetOrderBookState()
    connectOrderBookStream()
  })

  onBeforeUnmount(() => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.close()
    }
    ws = null
  })

  return {
    pending,
    hasError,
    formattedBids,
    formattedAsks,
    midPrice,
    spreadDisplay,
    spreadDirectionClass,
    handleRefreshClick
  }
}
