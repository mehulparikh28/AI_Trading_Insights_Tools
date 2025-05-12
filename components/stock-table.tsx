"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import type { Stock } from "@/types/stock"

interface StockTableProps {
  stocks: Stock[]
  isLoading: boolean
  onSelectStock: (symbol: string) => void
  selectedStock: string | null
}

export function StockTable({ stocks, isLoading, onSelectStock, selectedStock }: StockTableProps) {
  if (isLoading) {
    return <StockTableSkeleton />
  }

  return (
    <div className="overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Symbol</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">RSI</TableHead>
            <TableHead className="text-right">MACD</TableHead>
            <TableHead className="text-right">SMA50</TableHead>
            <TableHead className="text-right">SMA200</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stocks.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-6">
                No stocks found. Add stocks to your watchlist in settings.
              </TableCell>
            </TableRow>
          ) : (
            stocks.map((stock) => (
              <TableRow
                key={stock.symbol}
                className={cn("cursor-pointer hover:bg-muted/50", selectedStock === stock.symbol && "bg-muted")}
                onClick={() => onSelectStock(stock.symbol)}
              >
                <TableCell className="font-medium">{stock.symbol}</TableCell>
                <TableCell>{stock.name}</TableCell>
                <TableCell className="text-right">
                  ${stock.price.toFixed(2)}
                  <span className={cn("ml-2 text-xs", stock.priceChange > 0 ? "text-green-500" : "text-red-500")}>
                    {stock.priceChange > 0 ? "+" : ""}
                    {/* {stock.priceChange.toFixed(2)}% */}
                  </span>
                </TableCell>
                <TableCell
                  className={cn("text-right", stock.rsi > 70 ? "text-red-500" : stock.rsi < 30 ? "text-green-500" : "")}
                >
                  {stock.rsi.toFixed(2)}
                </TableCell>
                <TableCell className={cn("text-right", stock.macd > 0 ? "text-green-500" : "text-red-500")}>
                  {stock.macd.toFixed(2)}
                </TableCell>
                <TableCell className="text-right">{stock.sma50.toFixed(2)}</TableCell>
                <TableCell className="text-right">{stock.sma200.toFixed(2)}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

function StockTableSkeleton() {
  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-8 w-[100%]" />
      </div>
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="flex items-center space-x-4">
            <Skeleton className="h-12 w-[100%]" />
          </div>
        ))}
    </div>
  )
}

