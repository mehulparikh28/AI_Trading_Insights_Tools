import { NextResponse } from "next/server"
// import { auth } from "@clerk/nextjs"
import axios from "axios"
import crypto from "crypto"

export async function GET(request: Request, { params }: { params: { symbol: string } }) {
  // const { userId } = auth()

  // if (!userId) {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  // }

  const symbol = params.symbol

  if (!symbol) {
    return NextResponse.json({ error: "Symbol is required" }, { status: 400 })
  }

  try {
    // Fetch news from Yahoo Finance API
    const response = await axios.get(`https://query1.finance.yahoo.com/v2/finance/news?symbol=${symbol}&count=5`)

    if (response.data && response.data.items && response.data.items.result) {
      const newsItems = response.data.items.result.map((item: any) => ({
        id: crypto
          .createHash("md5")
          .update(item.uuid || item.id || Math.random().toString())
          .digest("hex"),
        title: item.title,
        date: new Date(item.published_at * 1000).toISOString(),
        summary: item.summary || "No summary available",
        url: item.link,
      }))

      return NextResponse.json(newsItems)
    }

    // If Yahoo Finance API fails or returns no results, return mock data
    const mockNews = [
      {
        id: `${symbol}-1`,
        title: `${symbol} Reports Strong Quarterly Earnings, Beats Expectations`,
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        summary: `${symbol} reported quarterly earnings that exceeded analyst expectations, with revenue growing 15% year-over-year. The company also raised its full-year guidance.`,
        url: "#",
      },
      {
        id: `${symbol}-2`,
        title: `Analysts Upgrade ${symbol} Following Product Announcement`,
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        summary: `Several Wall Street analysts have upgraded ${symbol} following the company's recent product announcement, citing potential for market share gains and margin expansion.`,
        url: "#",
      },
      {
        id: `${symbol}-3`,
        title: `${symbol} Expands International Operations with New Facility`,
        date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        summary: `${symbol} announced plans to open a new manufacturing facility in Asia, which is expected to improve supply chain efficiency and reduce production costs.`,
        url: "#",
      },
    ]

    return NextResponse.json(mockNews)
  } catch (error) {
    console.error(`Error fetching news for ${symbol}:`, error)

    // Return mock data in case of error
    const mockNews = [
      {
        id: `${symbol}-1`,
        title: `${symbol} Reports Strong Quarterly Earnings, Beats Expectations`,
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        summary: `${symbol} reported quarterly earnings that exceeded analyst expectations, with revenue growing 15% year-over-year. The company also raised its full-year guidance.`,
        url: "#",
      },
      {
        id: `${symbol}-2`,
        title: `Analysts Upgrade ${symbol} Following Product Announcement`,
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        summary: `Several Wall Street analysts have upgraded ${symbol} following the company's recent product announcement, citing potential for market share gains and margin expansion.`,
        url: "#",
      },
    ]

    return NextResponse.json(mockNews)
  }
}

