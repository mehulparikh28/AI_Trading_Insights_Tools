"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { IndicatorDataPoint } from "@/types/stock"
import {
  Chart,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartGrid,
  ChartLine,
  ChartXAxis,
  ChartYAxis,
} from "@/components/ui/chart"

interface StockIndicatorsProps {
  isLoading: boolean
  data: IndicatorDataPoint[]
}

export function StockIndicators({ isLoading, data }: StockIndicatorsProps) {
  if (isLoading) {
    return <Skeleton className="h-[300px] w-full" />
  }

  if (!data || data.length === 0) {
    return (
      <div className="h-[300px] flex items-center justify-center text-muted-foreground">
        No indicator data available
      </div>
    )
  }

  return (
    <Tabs defaultValue="rsi">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="rsi">RSI</TabsTrigger>
        <TabsTrigger value="macd">MACD</TabsTrigger>
        <TabsTrigger value="sma50">SMA 50</TabsTrigger>
        <TabsTrigger value="sma200">SMA 200</TabsTrigger>
      </TabsList>

      <TabsContent value="rsi" className="h-[300px]">
        <IndicatorChart
          data={data}
          indicator="rsi"
          color="hsl(var(--primary))"
          thresholds={[
            { value: 30, label: "Oversold", color: "rgba(34, 197, 94, 0.2)" },
            { value: 70, label: "Overbought", color: "rgba(239, 68, 68, 0.2)" },
          ]}
        />
      </TabsContent>

      <TabsContent value="macd" className="h-[300px]">
        <IndicatorChart data={data} indicator="macd" color="hsl(var(--primary))" />
      </TabsContent>

      <TabsContent value="sma50" className="h-[300px]">
        <IndicatorChart data={data} indicator="sma50" color="hsl(var(--primary))" />
      </TabsContent>

      <TabsContent value="sma200" className="h-[300px]">
        <IndicatorChart data={data} indicator="sma200" color="hsl(var(--primary))" />
      </TabsContent>
    </Tabs>
  )
}

interface IndicatorChartProps {
  data: IndicatorDataPoint[]
  indicator: keyof Omit<IndicatorDataPoint, "date">
  color: string
  thresholds?: Array<{
    value: number
    label: string
    color: string
  }>
}

function IndicatorChart({ data, indicator, color, thresholds }: IndicatorChartProps) {
  return (
    <ChartContainer>
      <Chart>
        <ChartGrid />
        {thresholds?.map((threshold, index) => (
          <rect key={index} x="0%" y={`${100 - threshold.value}%`} width="100%" height="100%" fill={threshold.color} />
        ))}
        <ChartLine
          data={data}
          x={(d) => new Date(d.date)}
          y={(d) => d[indicator]}
          strokeWidth={2}
          className={`stroke-[${color}]`}
        />
        <ChartXAxis />
        <ChartYAxis />
        <ChartTooltip>
          <ChartTooltipContent className="bg-background border shadow-md">
            {({ dataPoint }) => (
              <div className="p-2">
                <div className="text-sm font-medium">{new Date(dataPoint.date).toLocaleDateString()}</div>
                <div className="text-sm text-muted-foreground">
                  {indicator.toUpperCase()}: {dataPoint[indicator].toFixed(2)}
                </div>
              </div>
            )}
          </ChartTooltipContent>
        </ChartTooltip>
      </Chart>
    </ChartContainer>
  )
}

