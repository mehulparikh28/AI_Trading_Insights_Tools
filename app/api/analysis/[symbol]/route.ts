import { NextResponse } from "next/server"
// import { useAuth } from "@clerk/nextjs"
const { analyzeStock } = require("@/backend/utils/analyse.js")

export async function GET(request: Request, { params }: { params: { symbol: string } }) {
  // const { userId } = useAuth()

  // if (!userId) {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  // }

  const symbol = params.symbol

  if (!symbol) {
    return NextResponse.json({ error: "Symbol is required" }, { status: 400 })
  }

  try {
    const analysis = await analyzeStock(symbol)

    if (!analysis) {
      return NextResponse.json({ error: "Failed to analyze stock" }, { status: 404 })
    }

    return NextResponse.json({
      recommendation: analysis.recommendation,
      reasoning: analysis.reasoning,
      potentialReward: analysis.potentialReward,
      potentialRisk: analysis.potentialRisk,
      keyFactors: analysis.keyFactors,
    })
  } catch (error) {
    console.error(`Error analyzing stock ${symbol}:`, error)
    return NextResponse.json({ error: "Failed to analyze stock" }, { status: 500 })
  }
}

