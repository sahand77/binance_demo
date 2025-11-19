<template>
  <section class="card orderbook">
    <header class="card__header">
      <span class="card__title">Order Book</span>
      <div class="orderbook__header-right">
        <button class="orderbook__refresh" type="button" @click="handleRefreshClick">
          Refresh
        </button>
        <span v-if="pending" class="text-muted">Loading…</span>
        <span v-else-if="hasError" class="text-red">Error</span>
      </div>
    </header>

    <div class="orderbook__controls">
      <div class="orderbook__view-toggles">
        <button type="button" class="orderbook__toggle orderbook__toggle--active" aria-label="Merged depth">
          <span />
        </button>
        <button type="button" class="orderbook__toggle" aria-label="Buy depth" />
        <button type="button" class="orderbook__toggle" aria-label="Sell depth" />
      </div>
      <select class="orderbook__depth-select" aria-label="Depth step" v-model="depthStep">
        <option value="0.1">0.1</option>
        <option value="1">1</option>
        <option value="10">10</option>
        <option value="100">100</option>
        <option value="1000">1000</option>
      </select>
    </div>

    <div class="card__body orderbook__body">
      <div class="orderbook__column-header">
        <span>Price (USDT)</span>
        <span>Size (BTC)</span>
        <span>Sum (BTC)</span>
      </div>

      <div class="orderbook__table orderbook__table--asks">
        <div class="orderbook__rows orderbook__rows--asks">
          <div
            v-for="level in formattedAsks"
            :key="`ask-${level.price}-${level.size}`"
            class="orderbook__row orderbook__row--ask"
            :style="{ '--depth': level.depth }"
          >
            <span class="orderbook__price text-red">{{ level.price }}</span>
            <span class="orderbook__qty text-secondary">{{ level.size }}</span>
            <span class="orderbook__sum text-secondary">{{ level.sum }}</span>
          </div>
        </div>
      </div>

      <div class="orderbook__spread">
        <span class="orderbook__spread-price" :class="spreadDirectionClass">{{ midPrice }}</span>
      </div>

      <div class="orderbook__table orderbook__table--bids">
        <div class="orderbook__rows orderbook__rows--bids">
          <div
            v-for="level in formattedBids"
            :key="`bid-${level.price}-${level.size}`"
            class="orderbook__row orderbook__row--bid"
            :style="{ '--depth': level.depth }"
          >
            <span class="orderbook__price text-green">{{ level.price }}</span>
            <span class="orderbook__qty text-secondary">{{ level.size }}</span>
            <span class="orderbook__sum text-secondary">{{ level.sum }}</span>
          </div>
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

const depthStep = ref('0.1')

const {
  pending,
  hasError,
  formattedBids,
  formattedAsks,
  midPrice,
  spreadDirectionClass,
  handleRefreshClick
} = useOrderBook(normalizedSymbol, depthStep)
</script>

<style scoped>
.orderbook__header-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.orderbook__refresh {
  border: 1px solid var(--border-subtle);
  background: transparent;
  color: var(--text-secondary);
  border-radius: 3px;
  padding: 2px 6px;
  font-size: 11px;
  cursor: pointer;
}

.orderbook__refresh:hover {
  border-color: var(--text-secondary);
}

.orderbook__controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0 8px;
}

.orderbook__view-toggles {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.orderbook__toggle {
  width: 24px;
  height: 16px;
  border-radius: 2px;
  border: 1px solid var(--border-subtle);
  background: transparent;
  cursor: pointer;
  opacity: 0.6;
}

.orderbook__toggle--active {
  opacity: 1;
  border-color: var(--text-primary);
}

.orderbook__depth-select {
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: 4px;
  color: var(--text-secondary);
  font-size: 11px;
  padding: 2px 6px;
}

.orderbook {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
}

.orderbook__body {
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
  min-height: 0;
  overflow: hidden;
}

.orderbook__table {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  min-height: 0;
}

.orderbook__column-header {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  font-size: 11px;
  color: var(--text-secondary);
}

.orderbook__rows {
  display: flex;
  flex-direction: column;
  gap: 2px;
  overflow-y: auto;
  flex: 1;
  min-height: 0;
  scrollbar-width: none;
}

.orderbook__rows--asks {
  justify-content: flex-end;
}

.orderbook__rows::-webkit-scrollbar {
  display: none;
}

.orderbook__row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  font-size: 11px;
  position: relative;
  padding: 2px 4px;
}

.orderbook__row::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: var(--depth, 0);
  opacity: 0.15;
  background-color: currentColor;
  pointer-events: none;
}

.orderbook__row--ask::after {
  color: #f6465d;
}

.orderbook__row--bid::after {
  color: #0ecb81;
}

.orderbook__price {
  min-width: 0;
}

.orderbook__qty,
.orderbook__sum {
  text-align: right;
}

.orderbook__spread {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 4px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.04);
  font-size: 12px;
}

.orderbook__spread-price {
  font-weight: 600;
}

.orderbook__spread-gap {
  font-size: 11px;
}
</style>
