# Backend Implementation for AI Stock Trading

This directory contains the backend code for the AI Stock Trading application. The backend is integrated with the Next.js frontend through API routes.

## Architecture

The backend consists of several key components:

1. **Data Fetching** (`data.js`): Fetches stock data from Yahoo Finance API
2. **Technical Indicators** (`calculateIndicator.js`): Calculates technical indicators like RSI, MACD, SMA50, SMA200
3. **AI Analysis** (`analyse.js`): Uses Google's Generative AI (Gemini) to analyze stocks based on technical indicators

## API Routes

The backend exposes the following API routes:

- `/api/stocks` - Get a list of stocks with technical indicators
- `/api/stocks/search` - Search for stocks by symbol or name
- `/api/stocks/[symbol]` - Get detailed information about a specific stock
- `/api/analysis/[symbol]` - Get AI-powered analysis for a specific stock
- `/api/news/[symbol]` - Get news articles related to a specific stock

## Environment Variables

The backend requires the following environment variables:

- `GOOGLE_GENERATIVE_AI_KEY` - API key for Google's Generative AI (Gemini)

## Dependencies

- `axios` - For making HTTP requests to Yahoo Finance API
- `technicalindicators` - For calculating technical indicators
- `@google/generative-ai` - For accessing Google's Generative AI (Gemini)

## Data Flow

1. User requests stock data from the frontend
2. API route handler receives the request
3. Backend fetches data from Yahoo Finance API
4. Technical indicators are calculated
5. (Optional) AI analysis is performed using Gemini
6. Results are returned to the frontend

## Authentication

All API routes are protected with Clerk authentication to ensure that only authenticated users can access the data.

