"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import type { HistoricalDataPoint } from "@/types/stock"
import {
  Chart,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendItem,
  ChartGrid,
  ChartLine,
  ChartXAxis,
  ChartYAxis,
  ChartArea,
} from "@/components/ui/chart"

interface StockChartProps {
  symbol: string
  isLoading: boolean
  data: HistoricalDataPoint[]
}

export function StockChart({ symbol, isLoading, data }: StockChartProps) {
  const [timeRange, setTimeRange] = useState<"1M" | "3M" | "6M" | "1Y" | "5Y">("3M")

  if (isLoading) {
    return <Skeleton className="h-[350px] w-full" />
  }

  if (!data || data.length === 0) {
    return (
      <div className="h-[350px] flex items-center justify-center text-muted-foreground">
        No historical data available
      </div>
    )
  }

  // Filter data based on selected time range
  const filteredData = filterDataByTimeRange(data, timeRange)

  return (
    <div className="space-y-4">
      <div className="flex justify-end space-x-2">
        {(["1M", "3M", "6M", "1Y", "5Y"] as const).map((range) => (
          <Button
            key={range}
            variant={timeRange === range ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeRange(range)}
            className={timeRange === range ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""}
          >
            {range}
          </Button>
        ))}
      </div>

      <div className="h-[350px]">
        <ChartContainer>
          <Chart>
            <ChartGrid />
            <ChartArea data={filteredData} x={(d) => new Date(d.date)} y={(d) => d.price} />
            <ChartLine
              data={filteredData}
              x={(d) => new Date(d.date)}
              y={(d) => d.price}
              strokeWidth={2}
              className="stroke-primary"
            />
            <ChartXAxis />
            <ChartYAxis />
            <ChartTooltip>
              <ChartTooltipContent className="bg-background border shadow-md">
                {({ dataPoint }) => (
                  <div className="p-2">
                    <div className="text-sm font-medium">{new Date(dataPoint.date).toLocaleDateString()}</div>
                    <div className="text-sm text-muted-foreground">${dataPoint.price.toFixed(2)}</div>
                  </div>
                )}
              </ChartTooltipContent>
            </ChartTooltip>
          </Chart>
          <ChartLegend>
            <ChartLegendItem className="text-primary" name={symbol} />
          </ChartLegend>
        </ChartContainer>
      </div>
    </div>
  )
}

function filterDataByTimeRange(data: HistoricalDataPoint[], range: "1M" | "3M" | "6M" | "1Y" | "5Y") {
  const now = new Date()
  const cutoffDate = new Date()

  switch (range) {
    case "1M":
      cutoffDate.setMonth(now.getMonth() - 1)
      break
    case "3M":
      cutoffDate.setMonth(now.getMonth() - 3)
      break
    case "6M":
      cutoffDate.setMonth(now.getMonth() - 6)
      break
    case "1Y":
      cutoffDate.setFullYear(now.getFullYear() - 1)
      break
    case "5Y":
      cutoffDate.setFullYear(now.getFullYear() - 5)
      break
  }

  return data.filter((point) => new Date(point.date) >= cutoffDate)
}

