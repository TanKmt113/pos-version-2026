"use client"

import navItems from "@/components/layout/navItems"
import { cn } from "@/shared/utils/utils"
import { ChevronDown } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

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
  const [openMenus, setOpenMenus] = useState<string[]>([])

  // Hàm kiểm tra trạng thái active với type safety cho path
  const isActive = (path: string): boolean => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  // Kiểm tra xem menu con có item active không
  const hasActiveChild = (children?: { href: string }[]): boolean => {
    if (!children) return false
    return children.some(child => isActive(child.href))
  }

  // Toggle menu con
  const toggleMenu = (name: string) => {
    setOpenMenus(prev =>
      prev.includes(name)
        ? prev.filter(item => item !== name)
        : [...prev, name]
    )
  }

  const isMenuOpen = (name: string) => openMenus.includes(name)

  return (
    <nav className="grid gap-1.5">
      {navItems.map((item) => {
        const hasChildren = 'children' in item && item.children && item.children.length > 0
        const active = 'href' in item && item.href ? isActive(item.href) : hasActiveChild(item.children)
        const isOpen = isMenuOpen(item.name)

        // Menu có children
        if (hasChildren) {
          return (
            <div key={item.name}>
              {/* Parent menu button */}
              <button
                type="button"
                onClick={() => toggleMenu(item.name)}
                className={cn(
                  "group relative flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all duration-200 ease-in-out",
                  "hover:bg-primary/10 hover:text-primary hover:shadow-[inset_0_0_0_1px] hover:shadow-primary/20 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                  active
                    ? "bg-primary/10 text-primary shadow-[inset_0_0_0_1px] shadow-primary/20"
                    : "text-muted-foreground",
                  direction === "rtl" && "flex-row-reverse",
                  isCollapsed && !mobile && "justify-center px-2",
                  mobile && "text-base py-3",
                )}
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
                      "text-primary",
                      !active && "group-hover:text-primary",
                    )}
                  />
                </span>

                {/* Item Name */}
                {(!isCollapsed || mobile) && (
                  <>
                    <span className={cn(
                      "flex-1 text-left transition-colors whitespace-normal break-words leading-tight",
                      active ? "font-medium" : "font-normal"
                    )}>
                      {item.name}
                    </span>

                    {/* Chevron icon */}
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 shrink-0 transition-transform duration-200",
                        isOpen && "rotate-180"
                      )}
                    />
                  </>
                )}
              </button>

              {/* Children menu */}
              {(!isCollapsed || mobile) && (
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-200 ease-in-out",
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  <div className="ml-4 mt-1 grid gap-1 border-l border-border pl-3">
                    {item.children?.map((child) => {
                      const childActive = isActive(child.href)
                      return (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={cn(
                            "group relative flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all duration-200 ease-in-out",
                            "hover:bg-primary/10 hover:text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                            childActive
                              ? "bg-primary/10 text-primary font-medium"
                              : "text-muted-foreground",
                            direction === "rtl" && "flex-row-reverse",
                            mobile && "text-base py-2.5",
                          )}
                          onClick={onClick}
                        >
                          {'icon' in child && child.icon && (
                            <child.icon className="h-4 w-4 shrink-0" />
                          )}
                          <span className="whitespace-normal break-words leading-tight">{child.name}</span>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          )
        }

        // Menu không có children (link thường)
        return (
          <Link
            key={'href' in item ? item.href : item.name}
            href={'href' in item && item.href ? item.href : '#'}
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
                  "text-primary",
                  !active && "group-hover:text-primary",
                )}
              />
            </span>

            {/* Item Name */}
            {(!isCollapsed || mobile) && (
              <span className={cn(
                "whitespace-normal break-words leading-tight transition-colors",
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