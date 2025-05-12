"use client"

import { SignUp } from "@clerk/nextjs"
import { motion } from "framer-motion"

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center min-h-screen py-12 bg-muted/30">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-md w-full px-4"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Create Your Account</h1>
          <p className="text-muted-foreground mt-2">Sign up to start using AI-powered stock trading insights</p>
        </div>
        <div className="bg-card border border-border rounded-lg shadow-lg overflow-hidden">
          <SignUp
            appearance={{
              elements: {
                rootBox: "mx-auto",
                card: "shadow-none border-0",
                formButtonPrimary: "bg-primary hover:bg-primary/90 text-primary-foreground",
              },
            }}
          />
        </div>
      </motion.div>
    </div>
  )
}

