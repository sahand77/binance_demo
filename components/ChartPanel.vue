<template>
  <section class="card chart-panel">
    <header class="card__header">
      <span class="card__title">Price Chart</span>
    </header>
    <div class="chart-panel__tabs">
      <button type="button" class="chart-panel__tab chart-panel__tab--active">
        Chart
      </button>
      <button type="button" class="chart-panel__tab">
        Info
      </button>
      <button type="button" class="chart-panel__tab">
        Trading Data
      </button>
    </div>
    <div class="card__body chart-panel__body">
      <ClientOnly>
        <div
          ref="containerRef"
          :id="containerId"
          class="chart-panel__tv-container"
        ></div>
      </ClientOnly>
    </div>
  </section>
</template>

<script setup>
 import { ref, onMounted, onBeforeUnmount, watch } from 'vue'

 const props = defineProps({
   symbol: {
     type: String,
     required: true
   }
 })

 const containerId = 'tv_chart_panel'
 const containerRef = ref(null)

 let widget = null
 let tvScriptLoading = null

 function loadTradingViewScript() {
   if (typeof window === 'undefined') {
     return Promise.resolve()
   }

   if (window.TradingView) {
     return Promise.resolve()
   }

   if (tvScriptLoading) {
     return tvScriptLoading
   }

   tvScriptLoading = new Promise((resolve, reject) => {
     const script = document.createElement('script')
     script.id = 'tradingview-widget-script'
     script.type = 'text/javascript'
     script.async = true
     script.src = 'https://s3.tradingview.com/tv.js'

     script.onload = () => resolve()
     script.onerror = () => reject(new Error('Failed to load TradingView script'))

     document.head.appendChild(script)
   })

   return tvScriptLoading
 }

 function buildSymbol() {
   if (!props.symbol) {
     return 'BINANCE:BTCUSDT'
   }

   return `BINANCE:${props.symbol}`
 }

 function createWidget() {
   if (typeof window === 'undefined' || !window.TradingView || !containerRef.value) {
     return
   }

   if (widget && typeof widget.remove === 'function') {
     widget.remove()
   }

   widget = new window.TradingView.widget({
     symbol: buildSymbol(),
     interval: '15',
     timezone: 'Etc/UTC',
     theme: 'dark',
     style: '1',
     locale: 'en',
     toolbar_bg: '#131722',
     enable_publishing: false,
     hide_legend: true,
     hide_side_toolbar: false,
     hide_top_toolbar: false,
     allow_symbol_change: false,
     autosize: true,
     container_id: containerId
   })
 }

 onMounted(async () => {
   try {
     await loadTradingViewScript()
     createWidget()
   } catch (error) {
     console.error(error)
   }
 })

 watch(
   () => props.symbol,
   async () => {
     try {
       await loadTradingViewScript()
       createWidget()
     } catch (error) {
       console.error(error)
     }
   }
 )

 onBeforeUnmount(() => {
   if (widget && typeof widget.remove === 'function') {
     widget.remove()
   }

   widget = null
 })
</script>

<style scoped>
.chart-panel {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
}

.chart-panel__body {
  flex: 1;
  min-height: 260px;
  display: flex;
  align-items: stretch;
  justify-content: stretch;
  text-align: center;
}

.chart-panel__tv-container {
  width: 100%;
  height: 100%;
}

.chart-panel__tabs {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0 0 4px;
  font-size: 12px;
}

.chart-panel__tab {
  position: relative;
  padding: 2px 0;
  border: none;
  background: none;
  color: var(--text-secondary);
  cursor: default;
}

.chart-panel__tab--active {
  color: var(--text-primary);
}

.chart-panel__tab--active::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -4px;
  height: 2px;
  background-color: #fcd535;
}
</style>
