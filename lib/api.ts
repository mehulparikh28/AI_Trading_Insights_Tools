// This file contains API functions that connect to your backend

import type { Stock, StockDetails } from "@/types/stock"
import type { AIAnalysis } from "@/types/ai-analysis"
import type { NewsItem } from "@/types/news"

// Function to fetch stocks
export async function fetchStocks(): Promise<Stock[]> {
  try {
    const response = await fetch("/api/stocks", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    console.log(response.json);
    if (!response.ok) {

      throw new Error("Failed to fetch stocks")
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching stocks:", error)
    throw error
  }
}

// Function to search stocks
export async function searchStocks(query: string): Promise<{ symbol: string; name: string }[]> {
  try {
    const response = await fetch(`/api/stocks/search?q=${encodeURIComponent(query)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error("Failed to search stocks")
    }

    return await response.json()
  } catch (error) {
    console.error("Error searching stocks:", error)
    throw error
  }
}

// Function to fetch AI analysis
export async function fetchAIAnalysis(symbol: string): Promise<AIAnalysis> {
  try {
    const response = await fetch(`/api/analysis/${encodeURIComponent(symbol)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch AI analysis")
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching AI analysis:", error)
    throw error
  }
}

// Function to fetch stock details
export async function fetchStockDetails(symbol: string): Promise<StockDetails> {
  try {
    const response = await fetch(`/api/stocks/${encodeURIComponent(symbol)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch stock details")
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching stock details:", error)
    throw error
  }
}

// Function to fetch stock news
export async function fetchStockNews(symbol: string): Promise<NewsItem[]> {
  try {
    const response = await fetch(`/api/news/${encodeURIComponent(symbol)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch stock news")
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching stock news:", error)
    throw error
  }
}

