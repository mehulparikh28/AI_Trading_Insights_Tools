import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"
const { calculateIndicators } = require("@/backend/utils/calculateIndicator.js")

export async function GET(request: Request, { params }: { params: { symbol: string } }) {
  const { userId } = auth()

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const symbol = params.symbol

  if (!symbol) {
    return NextResponse.json({ error: "Symbol is required" }, { status: 400 })
  }

  try {
    const data = await calculateIndicators(symbol)

    if (!data) {
      return NextResponse.json({ error: "Stock data not found" }, { status: 404 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error(`Error fetching stock details for ${symbol}:`, error)
    return NextResponse.json({ error: "Failed to fetch stock details" }, { status: 500 })
  }
}

