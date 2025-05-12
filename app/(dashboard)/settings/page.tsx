"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import { StockSearch } from "@/components/stock-search"
import { useWatchlist } from "@/hooks/use-watchlist"
import { useAlerts } from "@/hooks/use-alerts"
import { motion } from "framer-motion"
import { useUser } from "@clerk/nextjs"

export default function SettingsPage() {
  const { user } = useUser()

  return (
    <motion.div
      className="container py-6 space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings (Comming Soon)</h1>
        <p className="text-muted-foreground">
          Manage your watchlist and alert preferences, {user?.firstName || "Trader"}
        </p>
      </div>

      <Tabs defaultValue="watchlist">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="watchlist">Watchlist</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>
        <TabsContent value="watchlist">
          <WatchlistSettings />
        </TabsContent>
        <TabsContent value="alerts">
          <AlertSettings />
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}

function WatchlistSettings() {
  const { watchlist, addToWatchlist, removeFromWatchlist } = useWatchlist()
  const [selectedStock, setSelectedStock] = useState<string | null>(null)

  const handleAddStock = () => {
    if (selectedStock && !watchlist.includes(selectedStock)) {
      addToWatchlist(selectedStock)
      setSelectedStock(null)
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card>
        <CardHeader>
          <CardTitle>Watchlist</CardTitle>
          <CardDescription>Add or remove stocks from your watchlist</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <StockSearch onSelect={setSelectedStock} />
            </div>
            <Button
              onClick={handleAddStock}
              disabled={!selectedStock || watchlist.includes(selectedStock)}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Add to Watchlist
            </Button>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">Your Watchlist</h3>
            {watchlist.length === 0 ? (
              <p className="text-muted-foreground text-sm">Your watchlist is empty. Add stocks to track them.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {watchlist.map((symbol) => (
                  <Badge key={symbol} variant="outline" className="py-1 px-3">
                    {symbol}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 ml-2 p-0"
                      onClick={() => removeFromWatchlist(symbol)}
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove {symbol}</span>
                    </Button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function AlertSettings() {
  const { alerts, updateAlert, toggleAlert } = useAlerts()

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card>
        <CardHeader>
          <CardTitle>Alert Settings</CardTitle>
          <CardDescription>Configure alerts for technical indicators</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="rsi-alert" className="text-base">
                  RSI Alerts
                </Label>
                <p className="text-sm text-muted-foreground">Get notified when RSI crosses thresholds</p>
              </div>
              <Switch
                id="rsi-alert"
                checked={alerts.rsi.enabled}
                onCheckedChange={(checked) => toggleAlert("rsi", checked)}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="rsi-overbought" className="text-sm">
                  Overbought (RSI &gt; {alerts.rsi.overbought})
                </Label>
                <span className="text-sm text-muted-foreground">{alerts.rsi.overbought}</span>
              </div>
              <Slider
                id="rsi-overbought"
                disabled={!alerts.rsi.enabled}
                min={60}
                max={90}
                step={1}
                value={[alerts.rsi.overbought]}
                onValueChange={(value) => updateAlert("rsi", { overbought: value[0] })}
                className="[&>span]:bg-primary"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="rsi-oversold" className="text-sm">
                  Oversold (RSI &lt; {alerts.rsi.oversold})
                </Label>
                <span className="text-sm text-muted-foreground">{alerts.rsi.oversold}</span>
              </div>
              <Slider
                id="rsi-oversold"
                disabled={!alerts.rsi.enabled}
                min={10}
                max={40}
                step={1}
                value={[alerts.rsi.oversold]}
                onValueChange={(value) => updateAlert("rsi", { oversold: value[0] })}
                className="[&>span]:bg-primary"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="macd-alert" className="text-base">
                  MACD Alerts
                </Label>
                <p className="text-sm text-muted-foreground">Get notified on MACD crossovers</p>
              </div>
              <Switch
                id="macd-alert"
                checked={alerts.macd.enabled}
                onCheckedChange={(checked) => toggleAlert("macd", checked)}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="price-alert" className="text-base">
                  Price Alerts
                </Label>
                <p className="text-sm text-muted-foreground">Get notified on significant price changes</p>
              </div>
              <Switch
                id="price-alert"
                checked={alerts.price.enabled}
                onCheckedChange={(checked) => toggleAlert("price", checked)}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="price-change" className="text-sm">
                  Price change threshold ({alerts.price.changePercent}%)
                </Label>
                <span className="text-sm text-muted-foreground">{alerts.price.changePercent}%</span>
              </div>
              <Slider
                id="price-change"
                disabled={!alerts.price.enabled}
                min={1}
                max={10}
                step={0.5}
                value={[alerts.price.changePercent]}
                onValueChange={(value) => updateAlert("price", { changePercent: value[0] })}
                className="[&>span]:bg-primary"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

