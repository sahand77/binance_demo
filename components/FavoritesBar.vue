<template>
  <section class="card favorites-bar">
    <div class="favorites-bar__items">
      <a href="/en/futures/BTCUSDT" class="favorites-bar__item">
        <span class="favorites-bar__symbol">BTCUSDT</span>
        <span class="favorites-bar__change favorites-bar__change--down">-1.64%</span>
        <span class="favorites-bar__price">93,799.5</span>
      </a>
      <a href="/en/futures/ETHUSDT" class="favorites-bar__item">
        <span class="favorites-bar__symbol">ETHUSDT</span>
        <span class="favorites-bar__change favorites-bar__change--down">-1.18%</span>
        <span class="favorites-bar__price">3,115.26</span>
      </a>
      <a href="/en/futures/BNBUSDT" class="favorites-bar__item">
        <span class="favorites-bar__symbol">BNBUSDT</span>
        <span class="favorites-bar__change favorites-bar__change--down">-2.62%</span>
        <span class="favorites-bar__price">605.3</span>
      </a>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
.favorites-bar {
  display: flex;
  align-items: center;
  padding: 4px 16px;
  font-size: 11px;
  color: var(--text-secondary);
}

.favorites-bar__items {
  display: flex;
  gap: 16px;
  overflow-x: auto;
}

.favorites-bar__item {
  display: flex;
  align-items: baseline;
  gap: 6px;
  white-space: nowrap;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  transition: opacity 0.2s;
}

.favorites-bar__item:hover {
  opacity: 0.8;
}

.favorites-bar__symbol {
  font-weight: 500;
  color: var(--text-primary);
}

.favorites-bar__change {
  font-size: 10px;
}

.favorites-bar__change--up {
  color: var(--accent-green);
}

.favorites-bar__change--down {
  color: var(--accent-red);
}

.favorites-bar__price {
  color: var(--text-secondary);
}
</style>
