"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Brain, TrendingDown, TrendingUp, Minus } from "lucide-react"
import { cn } from "@/lib/utils"
import type { AIAnalysis } from "@/types/ai-analysis"
import { fetchAIAnalysis } from "@/lib/api"
import { motion } from "framer-motion"

interface AIAnalysisPanelProps {
  stockSymbol: string | null
}

export function AIAnalysisPanel({ stockSymbol }: AIAnalysisPanelProps) {
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!stockSymbol) {
      setAnalysis(null)
      return
    }

    const getAnalysis = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const data = await fetchAIAnalysis(stockSymbol)
        setAnalysis(data)
      } catch (err) {
        setError("Failed to load AI analysis. Please try again.")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    getAnalysis()
  }, [stockSymbol])

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          AI Analysis
        </CardTitle>
        {/* <CardDescription>Powered by Google Gemini</CardDescription> */}
      </CardHeader>
      <CardContent>
        {!stockSymbol ? (
          <div className="text-center py-8 text-muted-foreground">Select a stock to view AI analysis</div>
        ) : isLoading ? (
          <AIAnalysisSkeleton />
        ) : error ? (
          <div className="text-destructive p-4 text-center">{error}</div>
        ) : analysis ? (
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="flex flex-col items-center justify-center p-4 border rounded-lg"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-sm text-muted-foreground mb-2">Recommendation</div>
              <RecommendationBadge recommendation={analysis.recommendation} />
            </motion.div>

            <div>
              <h4 className="text-sm font-medium mb-2">Reasoning</h4>
              <p className="text-sm text-muted-foreground">{analysis.reasoning}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 border rounded-lg">
                <div className="text-xs text-muted-foreground mb-1">Potential Reward</div>
                <div className="text-lg font-semibold text-green-500">+{analysis.potentialReward}%</div>
              </div>
              <div className="p-3 border rounded-lg">
                <div className="text-xs text-muted-foreground mb-1">Potential Risk</div>
                <div className="text-lg font-semibold text-red-500">-{analysis.potentialRisk}%</div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Key Factors</h4>
              <ul className="text-sm space-y-1">
                {analysis.keyFactors.map((factor, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <span className="mr-2">•</span>
                    <span className="text-muted-foreground">{factor}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        ) : null}
      </CardContent>
    </Card>
  )
}

function RecommendationBadge({ recommendation }: { recommendation: string }) {
  let icon
  let className

  switch (recommendation.toLowerCase()) {
    case "buy":
      icon = <TrendingUp className="h-4 w-4 mr-1" />
      className = "bg-green-500 hover:bg-green-600"
      break
    case "sell":
      icon = <TrendingDown className="h-4 w-4 mr-1" />
      className = "bg-red-500 hover:bg-red-600"
      break
    default:
      icon = <Minus className="h-4 w-4 mr-1" />
      className = "bg-gray-500 hover:bg-gray-600"
  }

  return (
    <Badge className={cn("text-white px-3 py-1 text-base", className)}>
      {icon}
      {recommendation}
    </Badge>
  )
}

function AIAnalysisSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <Skeleton className="h-8 w-24" />
      </div>
      <Skeleton className="h-20 w-full" />
      <div className="grid grid-cols-2 gap-4">
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-16 w-full" />
      </div>
      <Skeleton className="h-32 w-full" />
    </div>
  )
}

