<template>
  <section class="card margin-panel">
    <header class="card__header">
      <span class="card__title">Account</span>
    </header>
    <div class="card__body margin-panel__body">
      <div class="margin-panel__section">
        <div class="margin-panel__label text-secondary">Margin Ratio</div>
        <div class="margin-panel__ratio">
          <div class="margin-panel__ratio-gauge">
            <div class="margin-panel__ratio-fill" />
          </div>
          <span class="margin-panel__ratio-value">0.00%</span>
        </div>
      </div>
      
      <div class="margin-panel__row">
        <span class="margin-panel__label text-secondary">Maintenance Margin</span>
        <span>
          <span class="text-primary">0.0000</span>
          <span class="text-secondary"> USDT</span>
        </span>
      </div>
      <div class="margin-panel__row">
        <span class="margin-panel__label text-secondary">Margin Balance</span>
        <span>
          <span class="text-primary">0.0000</span>
          <span class="text-secondary"> USDT</span>
        </span>
      </div>
      
      <div class="margin-panel__actions">
        <button class="margin-panel__button" disabled>Transfer</button>
        <button class="margin-panel__button" disabled>Buy Crypto</button>
        <button class="margin-panel__button" disabled>Swap</button>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
.margin-panel__body {
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-size: 11px;
}

.margin-panel__section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.margin-panel__label {
  font-size: 11px;
}

.margin-panel__ratio {
  display: flex;
  align-items: center;
  gap: 12px;
}

.margin-panel__ratio-gauge {
  flex: 1;
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  overflow: hidden;
}

.margin-panel__ratio-fill {
  height: 100%;
  width: 0%;
  background: linear-gradient(90deg, #0ecb81, #f0b90b, #f6465d);
  border-radius: 3px;
}

.margin-panel__ratio-value {
  color: var(--text-primary);
  font-size: 12px;
  font-weight: 500;
}

.margin-panel__row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.margin-panel__actions {
  display: flex;
  gap: 8px;
  margin-top: 4px;
}

.margin-panel__button {
  flex: 1;
  padding: 6px 8px;
  border: 1px solid var(--border-subtle);
  background: transparent;
  color: var(--text-secondary);
  border-radius: 3px;
  font-size: 11px;
  cursor: not-allowed;
  opacity: 0.5;
}

.margin-panel__button:not(:disabled) {
  cursor: pointer;
  opacity: 1;
}

.margin-panel__button:not(:disabled):hover {
  border-color: var(--text-secondary);
}
</style>
