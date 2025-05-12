"use client"

import { useState, useEffect } from "react"
import { useUser } from "@clerk/nextjs"

interface RSIAlert {
  enabled: boolean
  overbought: number
  oversold: number
}

interface MACDAlert {
  enabled: boolean
}

interface PriceAlert {
  enabled: boolean
  changePercent: number
}

interface Alerts {
  rsi: RSIAlert
  macd: MACDAlert
  price: PriceAlert
}

export function useAlerts() {
  const [alerts, setAlerts] = useState<Alerts>({
    rsi: {
      enabled: false,
      overbought: 70,
      oversold: 30,
    },
    macd: {
      enabled: false,
    },
    price: {
      enabled: false,
      changePercent: 5,
    },
  })

  const { user, isLoaded } = useUser()
  const userId = user?.id

  // Load alerts from localStorage on component mount
  useEffect(() => {
    if (!isLoaded || !userId) return

    const storageKey = `alerts-${userId}`
    const savedAlerts = localStorage.getItem(storageKey)

    if (savedAlerts) {
      try {
        setAlerts(JSON.parse(savedAlerts))
      } catch (error) {
        console.error("Failed to parse alerts from localStorage:", error)
      }
    }
  }, [userId, isLoaded])

  // Save alerts to localStorage whenever they change
  useEffect(() => {
    if (!isLoaded || !userId) return

    const storageKey = `alerts-${userId}`
    localStorage.setItem(storageKey, JSON.stringify(alerts))
  }, [alerts, userId, isLoaded])

  const updateAlert = <T extends keyof Alerts>(type: T, settings: Partial<Alerts[T]>) => {
    setAlerts((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        ...settings,
      },
    }))
  }

  const toggleAlert = <T extends keyof Alerts>(type: T, enabled: boolean) => {
    setAlerts((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        enabled,
      },
    }))
  }

  return { alerts, updateAlert, toggleAlert }
}

