<template>
  <section class="card subheader-strip">
    <div class="subheader-strip__left">
      <div class="subheader-strip__favorite" role="button" tabindex="0" aria-label="Toggle favorite">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M11.087 3.049c.352-.79 1.474-.79 1.827 0l2.166 4.861a1 1 0 00.809.588l5.293.558c.86.091 1.207 1.158.564 1.738l-3.953 3.563a1 1 0 00-.31.95l1.105 5.207c.18.846-.728 1.506-1.478 1.073l-4.61-2.659a1 1 0 00-1 0l-4.61 2.66c-.75.432-1.657-.228-1.478-1.074l1.104-5.207a1 1 0 00-.308-.95L2.75 10.794c-.643-.58-.296-1.647.564-1.738l5.293-.558a1 1 0 00.809-.588l2.167-4.861z"
          />
        </svg>
      </div>

      <img
        class="subheader-strip__symbol-icon"
        :src="btcIcon"
        alt="BTC"
        referrerpolicy="strict-origin-when-cross-origin"
      />

      <div class="subheader-strip__market">
        <div class="subheader-strip__symbol-row">
          <span class="subheader-strip__symbol-name">BTCUSDT</span>
          <span class="subheader-strip__symbol-tag">Perp</span>
          <svg class="subheader-strip__chevron" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M16.37 8.75H7.63a.75.75 0 00-.569 1.238l4.37 5.098c.299.349.84.349 1.138 0l4.37-5.098a.75.75 0 00-.57-1.238z" />
          </svg>
        </div>
        <div class="subheader-strip__price-row">
          <span class="subheader-strip__last-price subheader-strip__last-price--down">94,071.6</span>
          <span class="subheader-strip__change">
            <span class="subheader-strip__change-amount">-1,182.69</span>
            <span class="subheader-strip__change-percent">-1.24%</span>
          </span>
        </div>
      </div>
    </div>

    <div class="subheader-strip__right">
      <div class="subheader-strip__item">
        <span class="subheader-strip__label">Mark</span>
        <span class="subheader-strip__value">94,094.5</span>
      </div>
      <div class="subheader-strip__item">
        <span class="subheader-strip__label">
          Index
          <svg class="subheader-strip__tiny-arrow" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M17.9 15.5a.9.9 0 01-1.8 0V9.174l-8.463 8.463a.9.9 0 01-1.274-1.274L14.826 7.9H8.5a.9.9 0 010-1.8H17a.9.9 0 01.9.9v8.5z" />
          </svg>
        </span>
        <span class="subheader-strip__value">94,136.3</span>
      </div>
      <div class="subheader-strip__item subheader-strip__item--wide">
        <span class="subheader-strip__label">Funding (8h) / Countdown</span>
        <span class="subheader-strip__value">
          <span class="subheader-strip__emphasis">0.00862%</span>
          <span class="subheader-strip__divider">/</span>
          <span>02:20:23</span>
        </span>
      </div>
      <div class="subheader-strip__item">
        <span class="subheader-strip__label">24h High</span>
        <span class="subheader-strip__value">95,980.1</span>
      </div>
      <div class="subheader-strip__item">
        <span class="subheader-strip__label">24h Low</span>
        <span class="subheader-strip__value">92,922.8</span>
      </div>
    </div>

  </section>
</template>

<script setup>
import btcIcon from '~/assets/img/btc.png'
</script>

<style scoped>
.subheader-strip {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 8px 10px;
  background-color: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: 4px;
  font-size: 12px;
}

.subheader-strip__left {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
}

.subheader-strip__favorite {
  width: 34px;
  height: 34px;
  border-radius: 10px;
  border: 1px solid rgba(255, 221, 67, 0.25);
  background: rgba(255, 221, 67, 0.05);
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: border-color 0.2s ease, background 0.2s ease;
}

.subheader-strip__favorite svg {
  width: 18px;
  height: 18px;
  color: #f0b90b;
  fill: currentColor;
}

.subheader-strip__favorite:focus-visible,
.subheader-strip__favorite:hover {
  border-color: #f0b90b;
  background: rgba(240, 185, 11, 0.15);
}

.subheader-strip__symbol-icon {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.subheader-strip__market {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.subheader-strip__symbol-row {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--text-primary, #f1f5f9);
  font-weight: 500;
}

.subheader-strip__symbol-name {
  font-size: 16px;
  letter-spacing: 0.02em;
}

.subheader-strip__symbol-tag {
  padding: 2px 8px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.08);
  color: var(--text-secondary, #a0a8b6);
  font-size: 11px;
  text-transform: uppercase;
}

.subheader-strip__chevron {
  width: 18px;
  height: 18px;
  fill: rgba(255, 255, 255, 0.5);
}

.subheader-strip__price-row {
  display: flex;
  align-items: baseline;
  gap: 12px;
}

.subheader-strip__last-price {
  font-size: 24px;
  font-weight: 600;
  letter-spacing: 0.01em;
}

.subheader-strip__last-price--down {
  color: var(--color-down, #f6465d);
}

.subheader-strip__change {
  display: flex;
  gap: 6px;
  font-size: 13px;
  color: var(--color-down, #f6465d);
}

.subheader-strip__right {
  display: flex;
  flex: 1;
  align-items: center;
  gap: 22px;
  min-width: 0;
}

.subheader-strip__item {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.subheader-strip__item--wide .subheader-strip__value {
  display: flex;
  align-items: center;
  gap: 6px;
}

.subheader-strip__label {
  color: var(--text-muted, #7c8596);
  text-transform: none;
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  letter-spacing: 0.01em;
}

.subheader-strip__value {
  color: var(--text-primary, #f1f5f9);
  white-space: nowrap;
  font-feature-settings: "tnum" 1, "lnum" 1;
}

.subheader-strip__emphasis {
  color: #f0b90b;
}

.subheader-strip__divider {
  color: rgba(255, 255, 255, 0.5);
}

.subheader-strip__tiny-arrow {
  width: 12px;
  height: 12px;
  fill: currentColor;
  opacity: 0.65;
}

.subheader-strip__more {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.06);
  background: transparent;
  display: grid;
  place-items: center;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.7);
}

.subheader-strip__more svg {
  width: 18px;
  height: 18px;
  fill: currentColor;
}

.subheader-strip__more:hover {
  color: #f1f5f9;
  border-color: rgba(255, 255, 255, 0.2);
}

@media (max-width: 1200px) {
  .subheader-strip {
    flex-wrap: wrap;
  }

  .subheader-strip__right {
    flex: 1 0 100%;
    flex-wrap: wrap;
    gap: 16px;
    padding-left: 58px;
  }

  .subheader-strip__more {
    margin-left: auto;
  }
}

@media (max-width: 768px) {
  .subheader-strip {
    flex-direction: column;
    align-items: flex-start;
    gap: 14px;
  }

  .subheader-strip__right {
    padding-left: 0;
  }
}
</style>
