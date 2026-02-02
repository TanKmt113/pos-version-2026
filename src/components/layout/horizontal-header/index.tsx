"use client"

import { useState } from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Logo } from "@/components/logo"
import { ThemeConfig } from "@/components/theme/theme-config"
import { NavigationLinks } from "./NavigationLinks"
import { NotificationsMenu } from "./NotificationsMenu"
import { ProfileMenu } from "./ProfileMenu"
import { ThemeToggle } from "./ThemeToggle"
import { AuthButtons } from "./AuthButtons"

/* =======================
 * Types
 * ======================= */

export interface Notification {
  id: number
  title: string
  description: string
  time: string
  unread: boolean
}

interface HorizontalHeaderProps {
  toggleSidebar?: () => void
  setMobileOpen: (open: boolean) => void
  notifications?: Notification[]
}

/* =======================
 * Mock data
 * ======================= */

const defaultNotifications: Notification[] = [
  {
    id: 1,
    title: "Large Deposit Received",
    description: "You received a deposit of $2,750.00",
    time: "Today, 10:30 AM",
    unread: true,
  },
  {
    id: 2,
    title: "Monthly Budget Alert",
    description: "Your 'Dining Out' budget is at 85% of its limit",
    time: "Yesterday, 3:45 PM",
    unread: true,
  },
  {
    id: 3,
    title: "Bill Payment Reminder",
    description: "Electric bill payment is due in 3 days",
    time: "Apr 15, 2023",
    unread: false,
  },
]

/* =======================
 * Component
 * ======================= */

export function HorizontalHeader({
  toggleSidebar,
  setMobileOpen,
  notifications = defaultNotifications,
}: HorizontalHeaderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true)

  const handleLogout = (): void => {
    setIsLoggedIn(false)
    window.location.href = "/auth/login"
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-card backdrop-blur supports-[backdrop-filter]:bg-card">
      <div className="container flex h-16 items-center justify-between px-3 sm:px-4 md:px-6 max-w-full">
        <div className="flex items-center gap-2">
          {/* Logo */}
          <Logo showText={false} className="sm:hidden" />
          <Logo className="hidden sm:flex" />

          {/* Navigation */}
          <NavigationLinks />
        </div>

        <div className="flex items-center gap-3">
          {/* Theme */}
          <ThemeToggle />
          <ThemeConfig />

          {isLoggedIn ? (
            <>
              <NotificationsMenu notifications={notifications} />
              <ProfileMenu
                handleLogout={handleLogout}
                userName="John Doe"
                userEmail="john.doe@example.com"
              />
            </>
          ) : (
            <AuthButtons />
          )}

          {/* Mobile menu */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-foreground"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
