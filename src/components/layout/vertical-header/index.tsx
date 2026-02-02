"use client"

import { useState } from "react"
import { PanelLeft, Menu } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { ThemeConfig } from "@/components/theme/theme-config"
import { useThemeContext } from "@/components/theme/theme-provider"
import { SearchDialog } from "./SearchDialog"
import { NotificationsMenu } from "./NotificationsMenu"
import { ProfileMenu } from "./ProfileMenu"
import { ThemeToggle } from "./ThemeToggle"
import { AuthButtons } from "./AuthButtons"

/* =======================
 * Types
 * ======================= */

export interface SearchResult {
  id: number
  title: string
  type: string
  href: string
}

export interface Notification {
  id: number
  title: string
  description: string
  time: string
  unread: boolean
}

interface VerticalHeaderProps {
  toggleSidebar: () => void
  setMobileOpen: (open: boolean) => void
  notifications?: Notification[]
}

/* =======================
 * Mock functions
 * ======================= */

const getSearchResults = (query: string): SearchResult[] => {
  const results: SearchResult[] = [
    { id: 1, title: "Checking Account", type: "Wallet", href: "/wallets/1" },
    { id: 2, title: "Savings Goal: Vacation", type: "Goal", href: "/goals/2" },
    { id: 3, title: "Monthly Budget", type: "Budget", href: "/budget" },
    { id: 4, title: "Electricity Bill", type: "Bill", href: "/bills/pay" },
    { id: 5, title: "Income Report", type: "Report", href: "/reports" },
  ]

  if (!query) return []

  return results.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  )
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

export function VerticalHeader({
  toggleSidebar,
  setMobileOpen,
  notifications = defaultNotifications,
}: VerticalHeaderProps) {
  const { direction } = useThemeContext()

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true)
  const [searchOpen, setSearchOpen] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState<string>("")

  const searchResults = getSearchResults(searchQuery)

  const handleLogout = (): void => {
    setIsLoggedIn(false)
    window.location.href = "/auth/login"
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-card backdrop-blur supports-[backdrop-filter]:bg-card">
      <div className="container flex h-16 items-center justify-between px-3 sm:px-4 md:px-6 max-w-full">
        <div className="flex items-center gap-2">
          {/* Sidebar Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="mr-2 hidden md:flex"
          >
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>

          {/* Mobile Menu */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-foreground"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>

          {/* Search */}
          <SearchDialog
            searchOpen={searchOpen}
            setSearchOpen={setSearchOpen}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            searchResults={searchResults}
          />
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <ThemeConfig />

          {isLoggedIn ? (
            <>
              <NotificationsMenu notifications={notifications} />
              <ProfileMenu handleLogout={handleLogout} />
            </>
          ) : (
            <AuthButtons />
          )}
        </div>
      </div>
    </header>
  )
}
