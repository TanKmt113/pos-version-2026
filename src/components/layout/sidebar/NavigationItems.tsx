"use client"

import navItems from "@/components/layout/navItems"
import { cn } from "@/shared/utils/utils" 
import Link from "next/link"
import { usePathname } from "next/navigation"

interface NavigationItemsProps {
  onClick?: () => void
  isCollapsed?: boolean
  mobile?: boolean
  direction?: "ltr" | "rtl"
}

export function NavigationItems({ 
  onClick, 
  isCollapsed = false, 
  mobile = false, 
  direction = "ltr" 
}: NavigationItemsProps) {
  const pathname = usePathname()

  // Hàm kiểm tra trạng thái active với type safety cho path
  const isActive = (path: string): boolean => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  return (
    <nav className="grid gap-1.5">
      {navItems.map((item) => {
        const active = isActive(item.href)

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "group relative flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all duration-200 ease-in-out",
              "hover:bg-primary/10 hover:text-primary hover:shadow-[inset_0_0_0_1px] hover:shadow-primary/20 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
              active
                ? "bg-primary/10 text-primary shadow-[inset_0_0_0_1px] shadow-primary/20"
                : "text-muted-foreground",
              direction === "rtl" && "flex-row-reverse",
              isCollapsed && !mobile && "justify-center px-2",
              mobile && "text-base py-3",
            )}
            onClick={onClick}
          >
            {/* Active Indicator Bar */}
            {active && !isCollapsed && !mobile && (
              <span className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full" />
            )}

            {/* Icon Wrapper */}
            <span
              className={cn(
                "relative flex items-center justify-center transition-transform duration-200",
                active && "text-primary",
                !active && "group-hover:scale-105",
              )}
            >
              <item.icon
                className={cn(
                  "h-5 w-5 transition-all",
                  "text-primary", // Bạn có thể gộp active ? "text-primary" : "text-primary" thành một
                  !active && "group-hover:text-primary",
                )}
              />
            </span>

            {/* Item Name */}
            {(!isCollapsed || mobile) && (
              <span className={cn(
                "truncate transition-colors", 
                active ? "font-medium" : "font-normal"
              )}>
                {item.name}
              </span>
            )}
          </Link>
        )
      })}
    </nav>
  )
}