<template>
  <section class="card positions">
    <div class="positions__tabs">
      <button type="button" class="positions__tab positions__tab--active">
        Positions(0)
      </button>
      <button type="button" class="positions__tab">
        Open Orders(0)
      </button>
      <button type="button" class="positions__tab">
        Order History
      </button>
      <button type="button" class="positions__tab">
        Trade History
      </button>
      <button type="button" class="positions__tab">
        Transaction History
      </button>
      <button type="button" class="positions__tab">
        Position History
      </button>
      <button type="button" class="positions__tab">
        Bots
      </button>
      <button type="button" class="positions__tab">
        Assets
      </button>
    </div>

    <div class="card__body positions__body">
      <div class="positions__empty">
        <span class="text-muted">Log In or Register Now to trade</span>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
.positions {
  display: flex;
  flex-direction: column;
  padding: 0;
}

.positions__tabs {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 8px 12px;
  border-bottom: 1px solid var(--border-subtle);
  font-size: 12px;
  overflow-x: auto;
  scrollbar-width: none;
}

.positions__tabs::-webkit-scrollbar {
  display: none;
}

.positions__tab {
  position: relative;
  padding: 4px 0;
  border: none;
  background: none;
  color: var(--text-secondary);
  cursor: pointer;
  white-space: nowrap;
  transition: color 0.2s;
}

.positions__tab:hover {
  color: var(--text-primary);
}

.positions__tab--active {
  color: var(--text-primary);
}

.positions__tab--active::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -9px;
  height: 2px;
  background-color: #fcd535;
}

.positions__body {
  font-size: 11px;
  padding: 12px;
  min-height: 120px;
}

.positions__empty {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
}
</style>
