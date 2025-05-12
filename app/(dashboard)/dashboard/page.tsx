"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"
import { StockTable } from "@/components/stock-table"
import { AIAnalysisPanel } from "@/components/ai-analysis-panel"
import { StockSearch } from "@/components/stock-search"
import { useStocks } from "@/hooks/use-stocks"
import { motion } from "framer-motion"
import { useUser } from "@clerk/nextjs"

export default function Dashboard() {
  const [selectedStock, setSelectedStock] = useState<string | null>(null)
  const { stocks, isLoading, error, refreshData } = useStocks()
  const { user } = useUser()

  return (
    <motion.div
      className="container py-6 space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome, {user?.firstName || "Trader"}</h1>
          <p className="text-muted-foreground">Monitor your stocks and get AI-powered insights</p>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <StockSearch onSelect={setSelectedStock} />
          <Button variant="outline" size="icon" onClick={refreshData} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            <span className="sr-only">Refresh data</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Stock Performance</CardTitle>
              <CardDescription>Technical indicators and current prices</CardDescription>
            </CardHeader>
            <CardContent>
              {error ? (
                <div className="text-destructive p-4 text-center">Error loading stock data. Please try again.</div>
              ) : (
                <StockTable
                  stocks={stocks}
                  isLoading={isLoading}
                  onSelectStock={setSelectedStock}
                  selectedStock={selectedStock}
                />
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <AIAnalysisPanel stockSymbol={selectedStock} />
        </motion.div>
      </div>
    </motion.div>
  )
}

