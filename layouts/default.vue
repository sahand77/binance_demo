<template>
  <div class="page-shell">
    <AppHeader />
    <main class="page-shell__body">
      <slot />
    </main>
  </div>
</template>

<script setup>
</script>

<style scoped>
.page-shell {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.page-shell__body {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 8px 16px 16px;
  overflow: hidden;
}

@media (min-width: 1200px) {
  .page-shell__body {
    padding: 12px 4px 4px;
  }
}
</style>
