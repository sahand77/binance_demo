<template>
  <section class="card trades">
    <div class="trades__tabs">
      <button type="button" class="trades__tab trades__tab--active">Trades</button>
      <button type="button" class="trades__tab">Top Movers</button>
      <div class="flex-spacer" />
      <span v-if="pending" class="text-secondary trades__status">Loading…</span>
      <span v-else-if="hasError" class="text-red trades__status">Error</span>
      <button class="trades__refresh" type="button" aria-label="Refresh trades" @click="handleRefreshClick">
        <span />
      </button>
    </div>

    <div class="trades__body">
      <div class="trades__row trades__row--header">
        <span>Price (USDT)</span>
        <span>Amount (BTC)</span>
        <span>Time</span>
      </div>
      <div class="trades__rows">
        <div
          v-for="trade in formattedTrades"
          :key="trade.id"
          class="trades__row"
        >
          <span class="trades__price" :class="trade.direction === 'buy' ? 'text-green' : 'text-red'">
            {{ trade.price }}
          </span>
          <span class="trades__qty">{{ trade.qty }}</span>
          <span class="trades__time">{{ trade.time }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  symbol: {
    type: String,
    required: true
  }
})

const normalizedSymbol = computed(() => props.symbol.toUpperCase())

const { data, pending, error, refresh } = await useAsyncData(
  'recent-trades',
  () =>
    $fetch('https://fapi.binance.com/fapi/v1/trades', {
      params: {
        symbol: normalizedSymbol.value,
        limit: 50
      }
    }),
  {
    watch: [normalizedSymbol],
    server: false,
    default: () => []
  }
)

const trades = computed(() => data.value ?? [])

const formattedTrades = computed(() => {
  return trades.value.map(trade => ({
    id: trade.id,
    price: Number(trade.price).toFixed(1),
    qty: Number(trade.qty).toFixed(3),
    time: formatTime(trade.time),
    direction: trade.isBuyerMaker ? 'sell' : 'buy'
  }))
})

const hasError = computed(() => !!error.value)

const handleRefreshClick = () => {
  refresh()
}

const formatTime = timestamp => {
  const date = new Date(timestamp)
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')
  return `${hours}:${minutes}:${seconds}`
}
</script>

<style scoped>
.trades {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  padding: 0;
}

.trades__tabs {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  border-bottom: 1px solid var(--border-subtle);
}

.trades__tab {
  border: none;
  background: none;
  color: var(--text-secondary);
  font-size: 12px;
  cursor: pointer;
  position: relative;
  padding: 4px 0;
}

.trades__tab--active {
  color: var(--text-primary);
}

.trades__tab--active::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -8px;
  height: 2px;
  background-color: #fcd535;
}

.trades__status {
  font-size: 11px;
}

.trades__refresh {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid var(--border-subtle);
  background: transparent;
  cursor: pointer;
  position: relative;
}

.trades__refresh span {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 2px solid var(--text-secondary);
  border-top-color: transparent;
  display: inline-block;
}

.flex-spacer {
  flex: 1;
}

.trades__body {
  display: flex;
  flex-direction: column;
  padding: 8px 12px 12px;
  gap: 4px;
  flex: 1;
  min-height: 0;
}

.trades__row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  font-size: 11px;
  padding: 2px 0;
}

.trades__row--header {
  font-size: 11px;
  color: var(--text-secondary);
}

.trades__rows {
  flex: 1;
  overflow-y: auto;
  scrollbar-width: none;
}

.trades__rows::-webkit-scrollbar {
  display: none;
}

.trades__price {
  min-width: 0;
}

.trades__qty,
.trades__time {
  text-align: right;
  color: var(--text-secondary);
}

.trades__time {
  font-variant-numeric: tabular-nums;
}
</style>
