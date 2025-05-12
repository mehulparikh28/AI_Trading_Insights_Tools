"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { BarChart2, Settings, Home } from "lucide-react"
import { cn } from "@/lib/utils"
import { ModeToggle } from "@/components/mode-toggle"
import { UserButton, useAuth } from "@clerk/nextjs"
import { motion } from "framer-motion"

export function Navbar() {
  const pathname = usePathname()
  const { isSignedIn } = useAuth()

  // Don't show navbar on auth pages
  if (pathname === "/sign-in" || pathname === "/sign-up") {
    return null
  }

  const navItems = [
    {
      name: "Home",
      href: "/",
      icon: <Home className="h-4 w-4 mr-2" />,
      showAlways: true,
    },
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <BarChart2 className="h-4 w-4 mr-2" />,
      showAlways: false,
    },
    {
      name: "Settings",
      href: "/settings",
      icon: <Settings className="h-4 w-4 mr-2" />,
      showAlways: false,
    },
  ]

  // Filter nav items based on authentication status
  const filteredNavItems = navItems.filter((item) => item.showAlways || isSignedIn)

  return (
    <motion.header
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl">
              <span className="text-primary">AI</span>Stock
            </span>
          </Link>
        </div>
        <nav className="flex items-center space-x-2 ml-auto">
          {filteredNavItems.map((item) => (
            <Button
              key={item.href}
              variant={pathname === item.href ? "default" : "ghost"}
              className={cn(
                "text-sm",
                pathname === item.href && "bg-primary text-primary-foreground hover:bg-primary/90",
              )}
              asChild
            >
              <Link href={item.href}>
                {item.icon}
                {item.name}
              </Link>
            </Button>
          ))}

          <ModeToggle />

          {isSignedIn ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <Button variant="outline" asChild>
              <Link href="/sign-in">Sign In</Link>
            </Button>
          )}
        </nav>
      </div>
    </motion.header>
  )
}

