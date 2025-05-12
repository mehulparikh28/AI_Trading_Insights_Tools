const { calculateIndicators } = require("./calculateIndicator.js")
const { GoogleGenerativeAI } = require("@google/generative-ai")
require('dotenv').config()
async function analyzeStock(symbol) {
  const indicators = await calculateIndicators(symbol)

  if (!indicators) {
    return null
  }

  const genAI = new GoogleGenerativeAI(process.env.GoogleGenerativeAI)
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })

  const prompt = `
    Stock: ${indicators.symbol} (${indicators.name})
    Current Price: $${indicators.price.toFixed(2)} (${indicators.priceChange > 0 ? "+" : ""}${indicators.priceChange.toFixed(2)}%)
    Technical Indicators:
    - RSI: ${indicators.rsi.toFixed(2)}
    - MACD: ${indicators.macd.toFixed(2)}
    - MACD Signal: ${indicators.macdSignal.toFixed(2)}
    - MACD Histogram: ${indicators.macdHistogram.toFixed(2)}
    - 50-day SMA: ${indicators.sma50.toFixed(2)}
    - 200-day SMA: ${indicators.sma200.toFixed(2)}

    Based on these technical indicators, provide a concise investment recommendation (Buy, Sell, or Hold) with reasoning.
    Include potential reward percentage and potential risk percentage.
    List 4 key factors influencing your recommendation.
    Format your response as follows:
    Recommendation: [Buy/Sell/Hold]
    Reasoning: [Your analysis]
    Potential Reward: [percentage]
    Potential Risk: [percentage]
    Key Factors:
    - Factor 1:
    - Factor 2:
    - Factor 3:
    - Factor 4:
    `

  try {
    const result = await model.generateContent(prompt)
    const responseText = result.response.text()

    // Parse the response to extract structured data
    const recommendation = responseText.match(/Recommendation: (Buy|Sell|Hold)/i)?.[1] || "Hold"
    const reasoning = responseText.match(/Reasoning: (.*?)(?=Potential Reward:|$)/s)?.[1]?.trim() || 
                     responseText.match(/\*\*Reasoning:\*\*(.*?)(?=Potential Reward:|$)/s)?.[1]?.trim()
    // if (!reasoning) {
    //   console.log("Failed to extract reasoning from response:", responseText)
    //   return null
    // }
    const potentialReward = Number.parseFloat(responseText.match(/Potential Reward: (\d+\.?\d*)/i)?.[1]) || Number.parseFloat(responseText.match(/(?:\*\*)?Potential Reward:(?:\*\*)? (\d+\.?\d*)/i)?.[1]) || 0 
    const potentialRisk = Number.parseFloat(responseText.match(/Potential Risk: (\d+\.?\d*)/i)?.[1]) || Number.parseFloat(responseText.match(/(?:\*\*)?Potential Risk:(?:\*\*)? (\d+\.?\d*)/i)?.[1]) ||  0

    // Extract key factors
    const keyFactorsMatch = responseText.match(/Key Factors:(.*?)(?=$)/s)
    let keyFactors = []

    if (keyFactorsMatch && keyFactorsMatch[1]) {
      keyFactors = keyFactorsMatch[1]
        .split("-")
        .map((factor) => factor.trim())
        .filter((factor) => factor.length > 0 && factor.includes("Factor"))
        .map(factor => {
          // Remove bullet points and clean up markdown
          return factor
            .replace(/^[•\s]*/, '') // Remove leading bullets and spaces
            .replace(/\*\*/g, '') // Remove markdown bold
            .replace(/\*/g, '') // Remove markdown italic
        })
        .slice(0, 5)
    }

    if (keyFactors.length === 0) {
      keyFactors = ["Insufficient data for detailed analysis"]
    }

    return {
      symbol: indicators.symbol,
      name: indicators.name,
      price: indicators.price,
      priceChange: indicators.priceChange,
      rsi: indicators.rsi,
      macd: indicators.macd,
      sma50: indicators.sma50,
      sma200: indicators.sma200,
      recommendation,
      reasoning,
      potentialReward,
      potentialRisk,
      keyFactors,
      historicalData: indicators.historicalData,
      indicatorData: indicators.indicatorData,
    }
  } catch (error) {
    console.error(`Gemini API error for ${indicators.symbol}:`, error)
    return {
      symbol: indicators.symbol,
      name: indicators.name,
      price: indicators.price,
      priceChange: indicators.priceChange,
      rsi: indicators.rsi,
      macd: indicators.macd,
      sma50: indicators.sma50,
      sma200: indicators.sma200,
      recommendation: "Hold",
      reasoning: "Error in AI analysis. Please try again later.",
      potentialReward: 0,
      potentialRisk: 0,
      keyFactors: [
        "AI analysis error",
        "Technical indicators may still be valid",
        "Consider manual analysis",
        "Try again later",
      ],
      historicalData: indicators.historicalData,
      indicatorData: indicators.indicatorData,
    }
  }
}

async function runAnalysis(stocks) {
  const results = []
  for (const symbol of stocks) {
    const result = await analyzeStock(symbol)
    if (result) {
      results.push(result)
    }
  }
  return results
}

module.exports = { analyzeStock, runAnalysis }

