"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { StockChart } from "@/components/stock-chart"
import { AIAnalysisPanel } from "@/components/ai-analysis-panel"
import { StockIndicators } from "@/components/stock-indicators"
import { StockNews } from "@/components/stock-news"
import { fetchStockDetails } from "@/lib/api"
import type { StockDetails } from "@/types/stock"
import { motion } from "framer-motion"

export default function StockDetailPage() {
  const params = useParams()
  const symbol = params.symbol as string
  const [stockDetails, setStockDetails] = useState<StockDetails | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const getStockDetails = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const data = await fetchStockDetails(symbol)
        setStockDetails(data)
      } catch (err) {
        setError("Failed to load stock details. Please try again.")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    getStockDetails()
  }, [symbol])

  return (
    <motion.div
      className="container py-6 space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to Dashboard</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {isLoading ? "Loading..." : stockDetails?.name || symbol}
          </h1>
          {!isLoading && stockDetails && (
            <p className="text-muted-foreground">
              ${stockDetails.price.toFixed(2)}
              <span
                className={stockDetails.priceChange >= 0 ? "text-green-500" : "text-red-500"}
                style={{ marginLeft: "8px" }}
              >
                {stockDetails.priceChange >= 0 ? "+" : ""}
                {stockDetails.priceChange.toFixed(2)}%
              </span>
            </p>
          )}
        </div>
      </div>

      {error ? (
        <Card>
          <CardContent className="py-10">
            <div className="text-center text-destructive">{error}</div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Price Chart</CardTitle>
                <CardDescription>Historical price data</CardDescription>
              </CardHeader>
              <CardContent>
                <StockChart symbol={symbol} isLoading={isLoading} data={stockDetails?.historicalData || []} />
              </CardContent>
            </Card>

            <Tabs defaultValue="indicators">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="indicators">Technical Indicators</TabsTrigger>
                <TabsTrigger value="news">Latest News</TabsTrigger>
              </TabsList>
              <TabsContent value="indicators">
                <Card>
                  <CardHeader>
                    <CardTitle>Technical Indicators</CardTitle>
                    <CardDescription>Historical data for key technical indicators</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <StockIndicators isLoading={isLoading} data={stockDetails?.indicatorData || []} />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="news">
                <Card>
                  <CardHeader>
                    <CardTitle>Latest News</CardTitle>
                    <CardDescription>Recent news articles about {stockDetails?.name || symbol}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <StockNews symbol={symbol} />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <AIAnalysisPanel stockSymbol={symbol} />
          </motion.div>
        </div>
      )}
    </motion.div>
  )
}

