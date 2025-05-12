"use client"

import { useState, useEffect } from "react"
import { useUser } from "@clerk/nextjs"

export function useWatchlist() {
  const [watchlist, setWatchlist] = useState<string[]>([])
  const { user, isLoaded } = useUser()
  const userId = user?.id

  // Load watchlist from localStorage on component mount
  useEffect(() => {
    if (!isLoaded || !userId) return

    const storageKey = `watchlist-${userId}`
    const savedWatchlist = localStorage.getItem(storageKey)

    if (savedWatchlist) {
      try {
        setWatchlist(JSON.parse(savedWatchlist))
      } catch (error) {
        console.error("Failed to parse watchlist from localStorage:", error)
        setWatchlist([])
      }
    }
  }, [userId, isLoaded])

  // Save watchlist to localStorage whenever it changes
  useEffect(() => {
    if (!isLoaded || !userId) return

    const storageKey = `watchlist-${userId}`
    localStorage.setItem(storageKey, JSON.stringify(watchlist))
  }, [watchlist, userId, isLoaded])

  const addToWatchlist = (symbol: string) => {
    if (!watchlist.includes(symbol)) {
      setWatchlist([...watchlist, symbol])
    }
  }

  const removeFromWatchlist = (symbol: string) => {
    setWatchlist(watchlist.filter((item) => item !== symbol))
  }

  return { watchlist, addToWatchlist, removeFromWatchlist }
}

