const TechnicalIndicators = require("technicalindicators")
const { getStockData } = require("./data.js")

async function calculateIndicators(symbol) {
  const data = await getStockData(symbol)
  if (!data || !data.prices || data.prices.length < 200) {
    // Ensure enough data for 200-day SMA
    console.error(`Insufficient data for ${symbol}.`)
    return null
  }

  const prices = data.prices.filter((price) => price !== null)

  const rsi = TechnicalIndicators.RSI.calculate({ values: prices, period: 14 })
  const macdResult = TechnicalIndicators.MACD.calculate({
    values: prices,
    fastPeriod: 12,
    slowPeriod: 26,
    signalPeriod: 9,
    SimpleMAOscillator: false,
    SimpleMASignal: false,
  })
  const sma50 = TechnicalIndicators.SMA.calculate({ values: prices, period: 50 })
  const sma200 = TechnicalIndicators.SMA.calculate({ values: prices, period: 200 })

  if (rsi.length === 0 || macdResult.length === 0 || sma50.length === 0 || sma200.length === 0) {
    console.error(`No valid indicator values for ${symbol}.`)
    return null
  }

  const latestRsi = rsi[rsi.length - 1]
  const latestMacd = macdResult[macdResult.length - 1]
  const latestSma50 = sma50[sma50.length - 1]
  const latestSma200 = sma200[sma200.length - 1]

  // Generate historical data for charts
  const historicalData = data.dates.slice(-30).map((date, index) => {
    const dataIndex = data.prices.length - 30 + index
    return {
      date,
      price: data.prices[dataIndex] || 0,
    }
  })

  // Generate indicator data for charts
  const indicatorData = []
  const startIndex = Math.max(0, data.dates.length - 30)
  for (let i = 0; i < 30 && startIndex + i < data.dates.length; i++) {
    const dateIndex = startIndex + i
    const rsiIndex = Math.max(0, rsi.length - 30 + i)
    const macdIndex = Math.max(0, macdResult.length - 30 + i)
    const sma50Index = Math.max(0, sma50.length - 30 + i)
    const sma200Index = Math.max(0, sma200.length - 30 + i)

    indicatorData.push({
      date: data.dates[dateIndex],
      rsi: rsi[rsiIndex] || 0,
      macd: macdResult[macdIndex]?.MACD || 0,
      sma50: sma50[sma50Index] || 0,
      sma200: sma200[sma200Index] || 0,
    })
  }

  return {
    symbol: data.symbol,
    name: data.name,
    price: data.price,
    priceChange: data.priceChange,
    rsi: latestRsi,
    macd: latestMacd.MACD,
    macdSignal: latestMacd.signal,
    macdHistogram: latestMacd.histogram,
    sma50: latestSma50,
    sma200: latestSma200,
    historicalData,
    indicatorData,
  }
}

module.exports = { calculateIndicators }

