export interface Stock {
  symbol: string
  name: string
  price: number
  priceChange: number
  rsi: number
  macd: number
  sma50: number
  sma200: number
}

export interface HistoricalDataPoint {
  date: string
  price: number
}

export interface IndicatorDataPoint {
  date: string
  rsi: number
  macd: number
  sma50: number
  sma200: number
}

export interface StockDetails extends Stock {
  historicalData: HistoricalDataPoint[]
  indicatorData: IndicatorDataPoint[]
}

