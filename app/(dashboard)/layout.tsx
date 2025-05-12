"use client"
import type React from "react"
import { useAuth } from "@clerk/nextjs"
import { redirect } from "next/navigation"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { userId } = useAuth()

  if (!userId) {
    redirect("/sign-in")
  }

  return <>{children}</>
}

