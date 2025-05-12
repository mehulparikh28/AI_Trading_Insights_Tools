"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { ExternalLink } from "lucide-react"
import { fetchStockNews } from "@/lib/api"
import type { NewsItem } from "@/types/news"

interface StockNewsProps {
  symbol: string
}

export function StockNews({ symbol }: StockNewsProps) {
  const [news, setNews] = useState<NewsItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const getNews = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const data = await fetchStockNews(symbol)
        setNews(data)
      } catch (err) {
        setError("Failed to load news. Please try again.")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    getNews()
  }, [symbol])

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
      </div>
    )
  }

  if (error) {
    return <div className="text-red-500 p-4 text-center">{error}</div>
  }

  if (news.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">No recent news found for {symbol}</div>
  }

  return (
    <div className="space-y-4">
      {news.map((item) => (
        <Card key={item.id}>
          <CardHeader className="p-4">
            <CardTitle className="text-base">{item.title}</CardTitle>
            <CardDescription>{new Date(item.date).toLocaleDateString()}</CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="text-sm text-muted-foreground line-clamp-2">{item.summary}</p>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs flex items-center text-primary hover:underline"
            >
              Read more <ExternalLink className="ml-1 h-3 w-3" />
            </a>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

