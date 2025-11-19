# Binance BTCUSDT Perpetual Futures – Demo Clone

I’ve implemented the core parts of the assignment (layout, header, chart, order book, etc.) to demonstrate my skills with Nuxt/Vue, real-time data, and component architecture.
However, a full one‑to‑one clone of the Binance BTCUSDT Futures page is not realistically achievable within the scope of a test task. The original page is a large, production‑grade trading interface that has been built and refined by a full team over a long period of time.
For a test assignment, I focused on clean architecture, reusable components, and the key interactions to show how I would structure and implement such a project in a real environment. Extending it to a complete clone would require significantly more time, detailed product requirements, and backend integration work, which goes beyond what is reasonable for a take‑home test.

This project is a **front‑end clone of the Binance BTCUSDT USDT‑M perpetual futures trading page**

- Layouting a complex trading interface
- Integrating with the **Binance Futures public REST and WebSocket APIs**
- Using the **TradingView charting widget** inside a Nuxt 3 / Vue 3 app
- Managing real‑time data, state, and responsive UI

## Features

- **Symbol futures page**
  - Dynamic route: `/en/futures/[symbol]` (e.g. `/en/futures/BTCUSDT`).
  - Defaults to `BTCUSDT` when no symbol is provided.

- **Top favorites bar**
  - Quick links to common symbols (BTCUSDT, ETHUSDT, BNBUSDT, etc.).
  - Shows last price and 24h change for each favorite.

- **Market subheader strip**
  - Visual clone of the main futures header area for BTCUSDT.
  - Shows:
    - Symbol and contract type (Perp)
    - Last price, absolute and percentage change
    - Mark price, index price
    - 24h high / 24h low
    - Funding rate and countdown

- **TradingView price chart panel**
  - Embeds the official **TradingView widget** via `tv.js`.
  - Symbol is mapped to `BINANCE:[symbol]` (e.g. `BINANCE:BTCUSDT`).
  - Uses a dedicated container with autosize, dark theme, and common futures chart settings.

- **Real‑time order book**
  - Uses a composable `useOrderBook` written in TypeScript.
  - Combines:
    - **REST depth snapshot** from `https://fapi.binance.com/fapi/v1/depth`.
    - **WebSocket stream** from `wss://fstream.binance.com/stream?streams=<symbol>@depth`.
  - Applies Binance‑style logic:
    - Buffers events while snapshot is loading, then replays them consistently.
    - Maintains and sorts bids/asks, applies incremental updates, and enforces a level limit.
  - UI features:
    - Depth step selector (0.1, 1, 10, 100, 1000).
    - Aggregated depth rows with cumulative size and background bars.
    - Mid price and spread direction indicator.
    - Manual refresh button to reconnect the stream.

- **Recent trades panel**
  - Fetches latest trades from `https://fapi.binance.com/fapi/v1/trades` for the current symbol.
  - Displays:
    - Price (colored by buy/sell direction)
    - Amount
    - Time formatted as `HH:MM:SS`.
  - Supports manual refresh and loading/error states.

- **Order form**
  - Mimics the Binance futures order entry form.
  - Includes:
    - Side toggle (Buy / Sell) with color‑coded buttons.
    - Order type tabs (Limit, Market, Stop Limit; static in UI).
    - Price and quantity inputs.
    - Position size slider (0–100% in 25% steps).
    - Derived notional value (`price * quantity`).
  - **Read‑only**: submitting the form just shows an alert explaining that no real orders are sent.

- **Positions and account panels
  - Positions panel with tabs for Positions, Open Orders, Histories, Assets, etc.
  - Account / margin panel that shows margin ratio, maintenance margin and balance, and disabled actions (Transfer, Buy Crypto, Swap).

- **Ticker marquee**
  - Horizontal scrolling ticker with a set of major symbols.
  - Shows symbol, 24h change, and last price and links to each symbol’s futures page.

- **Responsive layout**
  - 3‑column layout (chart + positions, order book + trades, order form + account) on desktop.
  - Stacks into a single column for narrower screens.
  - Uses CSS grid and flexbox for resizing while keeping the trading layout recognizable.


## Tech Stack

- **Framework**: [Nuxt 3](https://nuxt.com/) (Vue 3, `<script setup>`, `useAsyncData`, `ClientOnly`)
- **Language**: TypeScript (for composables like `useOrderBook`), JavaScript in `.vue` SFCs
- **Charting**: TradingView widget via `tv.js` loaded on the client
- **APIs**:
  - Binance Futures REST:
    - `GET /fapi/v1/ticker/24hr` for 24h summary
    - `GET /fapi/v1/trades` for recent trades
    - `GET /fapi/v1/depth` for order book snapshot
  - Binance Futures WebSocket:
    - `wss://fstream.binance.com/stream?streams=<symbol>@depth` for real‑time order book updates
- **Styling**:
  - Custom CSS in `assets/css/main.css`
  - BEM‑style class names and CSS variables (e.g. `--bg-card`, `--text-primary`, `--accent-green`, etc.)


## Getting Started

### Prerequisites

- **Node.js**: v18+ recommended
- **npm**: comes with Node

### Install dependencies

```bash
npm install
```

### Run in development

```bash
npm run dev
```

This starts the Nuxt dev server (by default on `http://localhost:3000`).

Then open a symbol page, for example:

- `http://localhost:3000/en/futures/BTCUSDT`

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

### Generate static site (optional)

```bash
npm run generate
```

## Project Structure (high level)

- `app.vue` – Nuxt app shell using layouts & pages
- `nuxt.config.ts` – Nuxt configuration (title, meta, global CSS)
- `pages/en/futures/[symbol].vue` – main symbol futures page and layout
- `components/ChartPanel.vue` – TradingView chart container
- `components/OrderBook.vue` – order book UI bound to `useOrderBook`
- `components/RecentTrades.vue` – recent trades table
- `components/OrderForm.vue` –  order form
- `components/FavoritesBar.vue` – favorites symbols row
- `components/SubheaderStrip.vue` – top market stats strip
- `components/PositionsPanel.vue` – positions & history tab shell
- `components/MarginPanel.vue` – account / margin info
- `components/TickerMarquee.vue` – scrolling tickers at the bottom
- `composables/useOrderBook.ts` – order book state, REST + WebSocket integration


## How this was used as a pre‑hire task

The goal of this task was to reproduce the core **look & feel** of the Binance futures BTCUSDT page and to show:

- Ability to work with **Nuxt 3 / Vue 3** and modern composition APIs.
- Integration with **third‑party widgets** (TradingView) and **external APIs** (Binance Futures).
- Handling a real‑time **order book** using REST snapshots plus WebSocket updates.
