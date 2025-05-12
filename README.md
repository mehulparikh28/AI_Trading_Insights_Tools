# 📊 AI Trading Insights & Tools

An advanced AI-powered stock trading insights and analysis platform built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**, integrating financial data, technical indicators, AI-driven stock analysis, and real-time news.

---

## 🚀 Features

* 📈 **Interactive Stock Charts**
* 🔍 **Stock Search & Filtering**
* 🧠 **AI-Powered Stock Analysis**
* 📰 **Real-Time Stock News Aggregation**
* 📊 **Technical Indicators Calculation**
* 📝 **Customizable User Watchlists**
* ⚙️ **User Authentication & Settings Dashboard**
* 🌙 **Dark/Light Mode Toggle**

---

## 🗂️ Project Structure

```
mehulparikh28-ai_trading_insights_tools/
├── app/                 # Next.js app routes & layouts (app router)
├── backend/             # Node-based utilities for data and analysis
├── components/          # Reusable React components (UI & features)
├── hooks/               # Custom React hooks for stocks, alerts, etc.
├── lib/                 # API utilities, helper functions, type definitions
├── public/              # Static assets
├── styles/              # Global and custom CSS
├── tailwind.config.ts   # Tailwind CSS configuration
├── package.json         # Project dependencies & scripts
└── README.md            # 📖 You are here
```

---

## 🧑‍💻 Tech Stack

* **Next.js 14 (App Router)**
* **TypeScript**
* **Tailwind CSS**
* **Shadcn/UI Components**
* **Recharts (for stock charts)**
* **Framer Motion (animations)**
* **AI Analysis Utilities (Node.js backend)**

---

## 📦 Installation

```bash
# Clone the repo
git clone https://github.com/mehulparikh28/ai_trading_insights_tools.git

# Move into project directory
cd ai_trading_insights_tools

# Install dependencies
pnpm install

# Run the development server
pnpm dev
```

---

## 🛠️ API Routes

| Route                     | Description                               |
| :------------------------ | :---------------------------------------- |
| `/api/stocks/`            | Fetch list of stocks                      |
| `/api/stocks/search/`     | Search stocks by symbol or name           |
| `/api/stocks/[symbol]/`   | Fetch specific stock details              |
| `/api/analysis/[symbol]/` | AI-driven analysis for a stock            |
| `/api/news/[symbol]/`     | Latest news articles for a specific stock |

---

## 📂 Key Components

* `StockChart` — Real-time and historical charts with indicators.
* `AIAnalysisPanel` — Display AI-generated insights.
* `StockSearch` — Symbol-based stock lookup.
* `StockIndicators` — RSI, SMA, EMA, etc.
* `StockNews` — Live news feed by stock symbol.
* `Watchlist` — Manage and monitor your favorite stocks.

---

## 🧠 AI/Analytics Utilities

Located in `/backend/utils/`:

* `data.js` — Fetch and preprocess stock data.
* `analyse.js` — AI/ML models for stock sentiment and trends.
* `calculateIndicator.js` — Technical indicator calculations.

---

## 🌐 Live Demo (Optional)

Link : [https://ai-trading-insight-tool.vercel.app/]