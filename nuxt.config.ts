import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'BTCUSDT Perpetual Futures - Demo Clone',
      meta: [
        {
          name: 'description',
          content: 'Educational clone of the Binance BTCUSDT perpetual futures trading page built with Nuxt 3 and Vue.'
        }
      ]
    }
  }
})
