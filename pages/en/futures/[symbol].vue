<template>
  <div class="futures-page">
    <section class="futures-grid">
      <div class="futures-left-section">
        <FavoritesBar class="futures-favorites" />
        <SubheaderStrip class="futures-subheader" />
        <ChartPanel class="futures-main-chart" :symbol="symbol" />
        <PositionsPanel class="futures-positions" />
      </div>

      <div class="futures-middle-column">
        <OrderBook :symbol="symbol" />
        <RecentTrades :symbol="symbol" />
      </div>

      <div class="futures-right-column">
        <OrderForm class="futures-order-form" :symbol="symbol" />
        <MarginPanel class="futures-margin" />
      </div>
    </section>
    
    <TickerMarquee class="futures-ticker" />
  </div>
</template>

<script setup>
const route = useRoute()

const symbol = computed(() => (route.params.symbol || 'BTCUSDT').toString().toUpperCase())

const {
  data: summary,
  pending: summaryPending,
  error: summaryError
} = await useAsyncData(
  'futures-summary',
  () =>
    $fetch('https://fapi.binance.com/fapi/v1/ticker/24hr', {
      params: { symbol: symbol.value }
    }),
  {
    watch: [symbol],
    server: false
  }
)

const summaryErrorMessage = computed(() => {
  if (!summaryError.value) {
    return ''
  }

  return 'Failed to load 24h stats from Binance.'
})
</script>

<style scoped>
.futures-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-bottom: 60px;
}

.futures-grid {
  display: grid;
  grid-template-columns: 1fr 280px 320px;
  gap: 8px;
  flex: 1;
  min-height: 0;
  height: calc(100vh - 64px - 60px);
}

.futures-left-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-height: 0;
  height: 100%;
}

.futures-favorites,
.futures-subheader {
  flex-shrink: 0;
}

.futures-main-chart {
  flex: 1;
  min-height: 0;
}

.futures-positions {
  flex-shrink: 0;
  height: 200px;
}

.futures-middle-column {
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 100%;
  min-height: 0;
}

.futures-middle-column > * {
  flex: 1 1 0;
  min-height: 0;
}

.futures-right-column {
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 100%;
  min-height: 0;
}

.futures-order-form {
  flex: 1 1 auto;
  min-height: 0;
}

.futures-margin {
  flex-shrink: 0;
}

.futures-ticker {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
}

@media (max-width: 1024px) {
  .futures-grid {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    height: auto;
  }
  
  .futures-left-section,
  .futures-middle-column,
  .futures-right-column {
    height: auto;
  }
}
</style>
