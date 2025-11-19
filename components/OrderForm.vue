<template>
  <section class="card order-form">
    <header class="order-form__header">
      <div class="order-form__top-left">
        <button type="button" class="order-form__chip">
          Cross
        </button>
        <button type="button" class="order-form__chip">
          20x
        </button>
        <button type="button" class="order-form__chip order-form__chip--mode">
          S
        </button>
      </div>
      <button
        type="button"
        class="order-form__icon-button"
        aria-label="Order preferences"
      />
    </header>

    <div class="order-form__tabs">
      <button
        type="button"
        class="order-form__tab"
        :class="{ 'order-form__tab--active': orderType === 'Limit' }"
        @click="orderType = 'Limit'"
      >
        Limit
      </button>
      <button
        type="button"
        class="order-form__tab"
        :class="{ 'order-form__tab--active': orderType === 'Market' }"
        @click="orderType = 'Market'"
      >
        Market
      </button>
      <button
        type="button"
        class="order-form__tab"
        :class="{ 'order-form__tab--active': orderType === 'Stop Limit' }"
        @click="orderType = 'Stop Limit'"
      >
        Stop Limit
      </button>
    </div>

    <div class="card__body order-form__body">
      <div class="order-form__balance-row">
        <div class="order-form__balance">
          <span class="order-form__balance-label">Avbl</span>
          <span class="order-form__balance-value">- USDT</span>
        </div>
        <button
          type="button"
          class="order-form__icon-button"
          aria-label="Open calculator"
        />
      </div>

      <div class="order-form__side-toggle">
        <button
          type="button"
          class="order-form__side"
          :class="side === 'BUY' ? 'order-form__side--active-buy' : ''"
          @click="handleSideChange('BUY')"
        >
          Buy
        </button>
        <button
          type="button"
          class="order-form__side"
          :class="side === 'SELL' ? 'order-form__side--active-sell' : ''"
          @click="handleSideChange('SELL')"
        >
          Sell
        </button>
      </div>

      <div class="order-form__field-row">
        <div class="order-form__field order-form__field--grow">
          <label class="order-form__label">Price (USDT)</label>
          <div class="order-form__input-line">
            <input
              v-model="price"
              type="number"
              min="0"
              step="0.1"
              class="order-form__input"
            />
            <span class="order-form__suffix">USDT</span>
          </div>
        </div>
        <button type="button" class="order-form__badge">
          BBO
        </button>
      </div>

      <div class="order-form__field">
        <label class="order-form__label">Quantity (BTC)</label>
        <div class="order-form__input-line">
          <input
            v-model="quantity"
            type="number"
            min="0"
            step="0.001"
            class="order-form__input"
          />
          <button type="button" class="order-form__suffix-button">
            <span>BTC</span>
            <span class="order-form__chevron" />
          </button>
        </div>
      </div>

      <div class="order-form__slider-row">
        <input
          v-model="sizePercent"
          type="range"
          min="0"
          max="100"
          step="25"
          class="order-form__slider"
        />
        <div class="order-form__slider-marks">
          <span>0%</span>
          <span>25%</span>
          <span>50%</span>
          <span>75%</span>
          <span>100%</span>
        </div>
      </div>

      <div class="order-form__summary">
        <span class="text-secondary">Order Value</span>
        <span>{{ notional.toFixed(2) }} USDT</span>
      </div>

      <button
        type="button"
        class="order-form__submit"
        :class="side === 'BUY' ? 'order-form__submit--buy' : 'order-form__submit--sell'"
        @click="handleSubmit"
      >
        {{ side === 'BUY' ? 'Buy/Long' : 'Sell/Short' }} {{ symbol }}
      </button>
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

const side = ref('BUY')
const orderType = ref('Limit')
const price = ref('')
const quantity = ref('')
const sizePercent = ref(0)

const notional = computed(() => {
  const p = Number(price.value)
  const q = Number(quantity.value)
  if (!p || !q) {
    return 0
  }
  return p * q
})

const handleSideChange = value => {
  side.value = value
}

const handleSubmit = () => {
  alert('This is a read-only demo form and does not send real orders.')
}
</script>

<style scoped>
.order-form {
  display: flex;
  flex-direction: column;
}

.order-form__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.order-form__top-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.order-form__chip {
  border-radius: 4px;
  border: 1px solid var(--border-subtle);
  background: transparent;
  color: var(--text-secondary);
  padding: 2px 8px;
  font-size: 11px;
  cursor: default;
}

.order-form__chip--mode {
  min-width: 32px;
  text-align: center;
}

.order-form__icon-button {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: none;
  background: transparent;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  cursor: pointer;
}

.order-form__tabs {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0 0 8px;
  border-bottom: 1px solid var(--border-subtle);
  font-size: 12px;
}

.order-form__tab {
  position: relative;
  padding: 4px 0;
  border: none;
  background: none;
  color: var(--text-secondary);
  cursor: pointer;
}

.order-form__tab--active {
  color: var(--text-primary);
}

.order-form__tab--active::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -8px;
  height: 2px;
  background-color: #fcd535;
}

.order-form__body {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 12px;
}

.order-form__balance-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 11px;
}

.order-form__balance-label {
  color: var(--text-secondary);
}

.order-form__balance-value {
  color: var(--text-primary);
}

.order-form__side-toggle {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  border-radius: 3px;
  overflow: hidden;
  border: 1px solid var(--border-subtle);
}

.order-form__side {
  background: transparent;
  border: none;
  padding: 6px 0;
  font-size: 12px;
  color: var(--text-secondary);
  cursor: pointer;
}

.order-form__side--active-buy {
  background-color: rgba(14, 203, 129, 0.12);
  color: var(--accent-green);
}

.order-form__side--active-sell {
  background-color: rgba(246, 70, 93, 0.12);
  color: var(--accent-red);
}

.order-form__field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.order-form__field-row {
  display: flex;
  align-items: flex-end;
  gap: 8px;
}

.order-form__field--grow {
  flex: 1;
}

.order-form__label {
  font-size: 11px;
  color: var(--text-secondary);
}

.order-form__input-line {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 0;
  border-bottom: 1px solid var(--border-subtle);
}

.order-form__input {
  flex: 1;
  border: none;
  background-color: transparent;
  color: var(--text-primary);
  font-size: 12px;
}

.order-form__input:focus {
  outline: none;
}

.order-form__suffix {
  font-size: 11px;
  color: var(--text-primary);
}

.order-form__suffix-button {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  border: none;
  background: none;
  color: var(--text-primary);
  font-size: 11px;
  cursor: pointer;
}

.order-form__chevron {
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 5px solid var(--text-secondary);
}

.order-form__badge {
  border-radius: 3px;
  border: 1px solid var(--border-subtle);
  background: transparent;
  color: var(--text-primary);
  padding: 4px 8px;
  font-size: 11px;
  cursor: pointer;
}

.order-form__slider-row {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-top: 4px;
}

.order-form__slider {
  width: 100%;
}

.order-form__slider-marks {
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  color: var(--text-secondary);
}

.order-form__summary {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
}

.order-form__submit {
  border-radius: 3px;
  border: none;
  padding: 6px 0;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  color: #ffffff;
  width: 100%;
}

.order-form__submit--buy {
  background-color: var(--accent-green);
}

.order-form__submit--sell {
  background-color: var(--accent-red);
}

.order-form__hint {
  font-size: 11px;
}
</style>
