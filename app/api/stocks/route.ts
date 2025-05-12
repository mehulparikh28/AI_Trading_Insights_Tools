import { NextResponse } from "next/server"
// import { useAuth } from "@clerk/nextjs"
const { calculateIndicators } = require("@/backend/utils/calculateIndicator.js")

export async function GET() {
  // const { userId } = useAuth()

  // if (!userId) {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  // }

  try {
    // Default stocks to analyze if user doesn't have a watchlist
    const defaultStocks = ["JIOFIN.NS", "ZOMATO.NS", "RELIANCE.NS", "TCS.NS", "WIPRO.NS"]

    // Get user's watchlist from localStorage (this would be from a database in production)
    // For now, we'll use the default stocks
    const stocksToAnalyze = defaultStocks

    const stocksData = []

    for (const symbol of stocksToAnalyze) {
      const data = await calculateIndicators(symbol)
      if (data) {
        stocksData.push({
          symbol: data.symbol,
          name: data.name,
          price: data.price,
          priceChange: data.priceChange,
          rsi: data.rsi,
          macd: data.macd,
          sma50: data.sma50,
          sma200: data.sma200,
        })
      }
    }

    return NextResponse.json(stocksData)
  } catch (error) {
    console.error("Error fetching stocks:", error)
    return NextResponse.json({ error: "Failed to fetch stocks" }, { status: 500 })
  }
}

