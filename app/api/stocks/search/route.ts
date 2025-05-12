import { NextResponse } from "next/server"
// import { useAuth } from "@clerk/nextjs"
import axios from "axios"

export async function GET(request: Request) {
  // const { userId } = useAuth()

  // if (!userId) {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  // }

  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q")

  if (!query || query.length < 2) {
    return NextResponse.json([])
  }

  try {
    // Use Yahoo Finance API to search for stocks
    const response = await axios.get(
      `https://query1.finance.yahoo.com/v1/finance/search?q=${query}&quotesCount=10&newsCount=0`,
    )

    if (response.data && response.data.quotes) {
      const results = response.data.quotes
        .filter((quote: any) => quote.symbol && quote.shortname)
        .map((quote: any) => ({
          symbol: quote.symbol,
          name: quote.shortname || quote.longname || quote.symbol,
        }))

      return NextResponse.json(results)
    }

    return NextResponse.json([])
  } catch (error) {
    console.error("Error searching stocks:", error)
    return NextResponse.json({ error: "Failed to search stocks" }, { status: 500 })
  }
}

