<template>
  <div class="ticker-marquee">
    <div class="ticker-marquee__track">
      <div class="ticker-marquee__items">
        <a
          v-for="(ticker, index) in tickers"
          :key="`${ticker.symbol}-${index}`"
          :href="`/en/futures/${ticker.symbol}`"
          class="ticker-marquee__item"
        >
          <span class="ticker-marquee__symbol">{{ ticker.symbol }}</span>
          <span
            class="ticker-marquee__change"
            :class="ticker.change >= 0 ? 'ticker-marquee__change--up' : 'ticker-marquee__change--down'"
          >
            {{ ticker.change >= 0 ? '+' : '' }}{{ ticker.change }}%
          </span>
          <span class="ticker-marquee__price">{{ ticker.price }}</span>
        </a>
        <!-- Duplicate for seamless loop -->
        <a
          v-for="(ticker, index) in tickers"
          :key="`${ticker.symbol}-dup-${index}`"
          :href="`/en/futures/${ticker.symbol}`"
          class="ticker-marquee__item"
        >
          <span class="ticker-marquee__symbol">{{ ticker.symbol }}</span>
          <span
            class="ticker-marquee__change"
            :class="ticker.change >= 0 ? 'ticker-marquee__change--up' : 'ticker-marquee__change--down'"
          >
            {{ ticker.change >= 0 ? '+' : '' }}{{ ticker.change }}%
          </span>
          <span class="ticker-marquee__price">{{ ticker.price }}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
const tickers = ref([
  { symbol: 'BTCUSDT', change: -1.64, price: '93,799.5' },
  { symbol: 'ETHUSDT', change: -1.18, price: '3,115.26' },
  { symbol: 'BNBUSDT', change: -2.62, price: '605.3' },
  { symbol: 'SOLUSDT', change: 2.45, price: '234.56' },
  { symbol: 'XRPUSDT', change: -0.89, price: '0.6234' },
  { symbol: 'DOGEUSDT', change: -1.26, price: '0.15863' },
  { symbol: 'ADAUSDT', change: 1.34, price: '0.8765' },
  { symbol: 'AVAXUSDT', change: -3.21, price: '45.67' },
  { symbol: 'DOTUSDT', change: 0.56, price: '12.34' },
  { symbol: 'MATICUSDT', change: -2.11, price: '1.234' }
])
</script>

<style scoped>
.ticker-marquee {
  background-color: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: 0;
  padding: 8px 0;
  overflow: hidden;
  position: relative;
  width: 100%;
}

.ticker-marquee__track {
  display: flex;
  width: 100%;
}

.ticker-marquee__items {
  display: flex;
  gap: 24px;
  animation: scroll 60s linear infinite;
  white-space: nowrap;
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.ticker-marquee__item {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 0 12px;
  font-size: 12px;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  transition: opacity 0.2s;
}

.ticker-marquee__item:hover {
  opacity: 0.8;
}

.ticker-marquee__symbol {
  font-weight: 500;
  color: var(--text-primary);
}

.ticker-marquee__change {
  font-size: 11px;
}

.ticker-marquee__change--up {
  color: var(--accent-green);
}

.ticker-marquee__change--down {
  color: var(--accent-red);
}

.ticker-marquee__price {
  color: var(--text-secondary);
  font-size: 11px;
}
</style>
