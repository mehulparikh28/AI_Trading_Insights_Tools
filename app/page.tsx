"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, BarChart2, Brain, TrendingUp } from "lucide-react"
import { FeatureCard } from "@/components/feature-card"
import { motion } from "framer-motion"
import Image from "next/image"

export default function Home() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-4 py-24 text-center  bg-background">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
       <div className="flex flex-col items-center">
       <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            AI-Powered Stock Trading <span className="text-primary">Insights</span>
          </h1>
          <p className="max-w-2xl mt-6 text-xl text-muted-foreground self-center">
            Make smarter investment decisions with our advanced AI analysis and real-time technical indicators.
          </p>
       </div>
          <div className="mt-10 mb-10">
            <Link href="/sign-in">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="relative w-full max-w-5xl mx-auto aspect-video bg-gray-800/30 rounded-lg overflow-hidden  ">
          <Image
            src="/dasboard.jpg"
            alt="Ai-powered-Trading-insights platform dashboard"
            width={1200}
            height={600}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
          </div>
        </motion.div>
      </section>
  
      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-3xl font-bold text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Powerful Features
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-10"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.div variants={item}>
              <FeatureCard
                icon={<TrendingUp className="h-10 w-10 text-primary" />}
                title="Real-time Stock Data"
                description="Access up-to-the-minute stock prices and technical indicators to stay ahead of market movements."
              />
            </motion.div>
            <motion.div variants={item}>
              <FeatureCard
                icon={<BarChart2 className="h-10 w-10 text-primary" />}
                title="Technical Analysis"
                description="Track RSI, MACD, SMA50, SMA200 and other key indicators to identify potential trading opportunities."
              />
            </motion.div>
            <motion.div variants={item}>
              <FeatureCard
                icon={<Brain className="h-10 w-10 text-primary" />}
                title="AI-driven Insights"
                description="Leverage Google Gemini's powerful analysis to get actionable buy, sell, or hold recommendations."
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-background">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-6">Ready to transform your trading strategy?</h2>
          <p className="text-lg mb-10 text-muted-foreground">
            Join thousands of traders who are already using our platform to make data-driven decisions.
          </p>
          <Link href="/sign-in">
            <Button size="lg">Create Your Account</Button>
          </Link>
        </motion.div>
      </section>
    </div>
  )
}

