const axios = require("axios")

let requestCount = 0
let lastResetTime = Date.now()
const requestLimit = 500

async function getStockData(symbol) {
  const now = Date.now()
  if (now - lastResetTime >= 3600000) {
    // Reset every hour
    requestCount = 0
    lastResetTime = now
  }

  if (requestCount >= requestLimit) {
    const timeToWait = 3600000 - (now - lastResetTime) // Time until reset
    console.log(`Rate limit reached. Waiting for ${timeToWait / 1000} seconds...`)
    await new Promise((resolve) => setTimeout(resolve, timeToWait))
    requestCount = 0 // Reset after waiting
    lastResetTime = Date.now()
  }

  const today = new Date()
  const endDate = Math.floor(today.getTime() / 1000)
  // analysis how much day u want
  const startDate = endDate - 86400 * 300 // 300 days of data

  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?period1=${startDate}&period2=${endDate}&interval=1d&events=history`

  try {
    const response = await axios.get(url)
    requestCount++

    if (response.data.chart.result && response.data.chart.result[0].indicators.quote[0].close) {
      const prices = response.data.chart.result[0].indicators.quote[0].close
      const dates = response.data.chart.result[0].timestamp.map(
        (timestamp) => new Date(timestamp * 1000).toISOString().split("T")[0],
      )

      // Get additional data for the stock details
      const meta = response.data.chart.result[0].meta
      const regularMarketPrice = meta.regularMarketPrice
      const previousClose = meta.previousClose
      const priceChange = ((regularMarketPrice - previousClose) / previousClose) * 100

      return {
        symbol,
        prices,
        dates,
        name: meta.shortName || symbol,
        price: regularMarketPrice,
        priceChange: priceChange,
      }
    } else {
      console.error(`Error fetching data for ${symbol}: No data available`)
      return null
    }
  } catch (error) {
    console.error(`Error fetching data for ${symbol}:`, error.message)
    return null
  }
}

module.exports = { getStockData }

