<template>
  <header class="app-header">
    <div class="app-header__container">
      <div class="app-header__left">
        <button class="app-header__icon app-header__icon--home" type="button" aria-label="Binance home" />
        <div class="app-header__logo">
          <div class="app-header__logo-mark" />
          <span class="app-header__logo-text">Binance</span>
        </div>
        <nav class="app-header__nav" aria-label="Binance products">
          <button class="app-header__nav-item app-header__nav-item--active" type="button">
            Futures
          </button>
          <button class="app-header__nav-item" type="button">
            Options
          </button>
          <button class="app-header__nav-item" type="button">
            Trading Bots
          </button>
          <button class="app-header__nav-item" type="button">
            Copy Trading
          </button>
          <button class="app-header__nav-item" type="button">
            Smart Money
          </button>
          <button class="app-header__nav-item app-header__nav-item--with-chevron" type="button">
            <span>Campaigns</span>
            <span class="app-header__chevron" />
          </button>
          <button class="app-header__nav-item app-header__nav-item--with-chevron" type="button">
            <span>Data</span>
            <span class="app-header__chevron" />
          </button>
          <button class="app-header__nav-item app-header__nav-item--with-chevron" type="button">
            <span>More</span>
            <span class="app-header__chevron" />
          </button>
        </nav>
      </div>
      <div class="app-header__right">
        <div class="app-header__auth">
          <button class="app-header__login" type="button">
            Log In
          </button>
          <button class="app-header__signup" type="button">
            Sign Up
          </button>
        </div>
        <div class="app-header__icon-group">
          <button class="app-header__icon" type="button" aria-label="Announcements" />
          <button class="app-header__icon" type="button" aria-label="Help center" />
          <button class="app-header__icon" type="button" aria-label="Apps menu" />
          <button class="app-header__icon" type="button" aria-label="Theme" />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
</script>

<style scoped>
.app-header {
  background-color: var(--bg-elevated);
  border-bottom: 1px solid var(--border-subtle);
  position: sticky;
  top: 0;
  z-index: 100;
}

.app-header__container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  padding: 0 16px;
}

@media (min-width: 1200px) {
  .app-header__container {
    padding: 0 24px;
  }
}

.app-header__left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.app-header__right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.app-header__icon {
  width: 24px;
  height: 24px;
  border-radius: 0;
  border: none;
  background-color: transparent;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
  cursor: pointer;
}

.app-header__icon--home {
  border-radius: 8px;
  border-color: transparent;
  background: linear-gradient(135deg, #f0b90b, #fcd535);
  width: 32px;
  height: 32px;
}

.app-header__logo {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-left: 4px;
}

.app-header__logo-mark {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  background: linear-gradient(135deg, #f0b90b, #fcd535);
}

.app-header__logo-text {
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.app-header__nav {
  display: flex;
  align-items: center;
  gap: 18px;
  margin-left: 28px;
  font-size: 14px;
}

.app-header__nav-item {
  position: relative;
  padding: 4px 0;
  border: none;
  background: none;
  color: var(--text-secondary);
  font: inherit;
  cursor: pointer;
  transition: color 0.2s;
}

.app-header__nav-item:hover {
  color: var(--text-primary);
}

.app-header__nav-item--active {
  color: var(--text-primary);
}

.app-header__nav-item--active::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -20px;
  height: 2px;
  background-color: #fcd535;
}

.app-header__nav-item--with-chevron {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.app-header__chevron {
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 5px solid var(--text-secondary);
}

.app-header__auth {
  display: flex;
  align-items: center;
  gap: 8px;
}

.app-header__login,
.app-header__signup {
  padding: 6px 16px;
  border-radius: 4px;
  border: 1px solid var(--border-subtle);
  background-color: transparent;
  color: var(--text-primary);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.app-header__login:hover {
  border-color: var(--text-secondary);
}

.app-header__signup {
  border-color: #fcd535;
  background-color: #fcd535;
  color: #1e2329;
}

.app-header__signup:hover {
  background-color: #f0b90b;
  border-color: #f0b90b;
}

.app-header__icon-group {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
