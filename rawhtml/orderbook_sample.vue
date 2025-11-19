<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { generateOrderBook } from '../utils/mockData';

const orderBook = ref(generateOrderBook());
const displayCount = 15;

const visibleAsks = computed(() => orderBook.value.asks.slice(-displayCount));
const visibleBids = computed(() => orderBook.value.bids.slice(0, displayCount));

const maxTotal = computed(() => {
  const askTotals = visibleAsks.value.map(a => a.total);
  const bidTotals = visibleBids.value.map(b => b.total);
  return Math.max(...askTotals, ...bidTotals);
});

const getBarWidth = (total: number): number => {
  return (total / maxTotal.value) * 100;
};

const updateOrderBook = () => {
  const newBook = generateOrderBook();
  orderBook.value = newBook;
};

let interval: number;

onMounted(() => {
  interval = window.setInterval(updateOrderBook, 2000);
});

onUnmounted(() => {
  clearInterval(interval);
});

const formatNumber = (num: number, decimals: number = 2): string => {
  return num.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
};
</script>

<template>
  <div class="orderbook">
    <div class="orderbook-header">
      <h3>Order Book</h3>
      <div class="orderbook-controls">
        <button class="control-btn active">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <rect y="0" width="16" height="7" fill="#f6465d" opacity="0.5"/>
            <rect y="9" width="16" height="7" fill="#0ecb81" opacity="0.5"/>
          </svg>
        </button>
      </div>
    </div>

    <div class="orderbook-labels">
      <span>Price(USDT)</span>
      <span>Amount(BTC)</span>
      <span>Total</span>
    </div>

    <div class="orderbook-content">
      <div class="asks">
        <div v-for="ask in visibleAsks" :key="ask.price" class="order-row ask-row">
          <div class="depth-bar ask-bar" :style="{ width: getBarWidth(ask.total) + '%' }"></div>
          <span class="price ask-price">{{ formatNumber(ask.price, 2) }}</span>
          <span class="amount">{{ formatNumber(ask.amount, 4) }}</span>
          <span class="total">{{ formatNumber(ask.total, 2) }}</span>
        </div>
      </div>

      <div class="spread">
        <span class="spread-price">{{ formatNumber(visibleBids[0]?.price || 0, 2) }}</span>
        <span class="spread-value">
          {{ formatNumber(Math.abs((visibleAsks[visibleAsks.length - 1]?.price || 0) - (visibleBids[0]?.price || 0)), 2) }}
        </span>
      </div>

      <div class="bids">
        <div v-for="bid in visibleBids" :key="bid.price" class="order-row bid-row">
          <div class="depth-bar bid-bar" :style="{ width: getBarWidth(bid.total) + '%' }"></div>
          <span class="price bid-price">{{ formatNumber(bid.price, 2) }}</span>
          <span class="amount">{{ formatNumber(bid.amount, 4) }}</span>
          <span class="total">{{ formatNumber(bid.total, 2) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.orderbook {
  background: #1e2329;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.orderbook-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #2b3139;
}

.orderbook-header h3 {
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  color: #eaecef;
}

.orderbook-controls {
  display: flex;
  gap: 4px;
}

.control-btn {
  padding: 4px 8px;
  background: transparent;
  border: 1px solid #2b3139;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.2s;
}

.control-btn.active {
  border-color: #f0b90b;
}

.orderbook-labels {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 8px 16px;
  font-size: 12px;
  color: #848e9c;
  border-bottom: 1px solid #2b3139;
}

.orderbook-content {
  flex: 1;
  overflow-y: auto;
  padding: 0;
}

.asks,
.bids {
  display: flex;
  flex-direction: column;
}

.asks {
  flex-direction: column-reverse;
}

.order-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 4px 16px;
  font-size: 13px;
  position: relative;
  cursor: pointer;
  transition: background 0.2s;
}

.order-row:hover {
  background: rgba(43, 49, 57, 0.5);
}

.depth-bar {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  opacity: 0.2;
  transition: width 0.3s ease;
}

.ask-bar {
  background: #f6465d;
}

.bid-bar {
  background: #0ecb81;
}

.price,
.amount,
.total {
  position: relative;
  z-index: 1;
}

.ask-price {
  color: #f6465d;
}

.bid-price {
  color: #0ecb81;
}

.amount,
.total {
  color: #eaecef;
}

.spread {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: #2b3139;
  border-top: 1px solid #2b3139;
  border-bottom: 1px solid #2b3139;
  margin: 4px 0;
}

.spread-price {
  font-size: 18px;
  font-weight: 600;
  color: #0ecb81;
}

.spread-value {
  font-size: 12px;
  color: #848e9c;
}
</style>
