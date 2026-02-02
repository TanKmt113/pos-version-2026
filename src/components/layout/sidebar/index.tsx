"use client"

import { useState, useEffect } from "react"
import { useThemeContext } from "@/components/theme/theme-provider"
import { MobileSidebar } from "./MobileSidebar"
import { DesktopSidebar } from "./DesktopSidebar"

/* =======================
 * Types
 * ======================= */

interface SidebarProps {
  isCollapsed?: boolean
  setIsCollapsed?: React.Dispatch<React.SetStateAction<boolean>>
  isMobileOpen: boolean
  setIsMobileOpen: React.Dispatch<React.SetStateAction<boolean>>
  isHorizontalLayout?: boolean
}

/* =======================
 * Component
 * ======================= */

export function Sidebar({
  isCollapsed: propIsCollapsed = false,
  setIsCollapsed,
  isMobileOpen,
  setIsMobileOpen,
  isHorizontalLayout = false,
}: SidebarProps) {
  const { direction } = useThemeContext()

  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [internalIsCollapsed, setInternalIsCollapsed] =
    useState<boolean>(propIsCollapsed)

  /**
   * Controlled / Uncontrolled logic
   */
  const isCollapsed = setIsCollapsed
    ? propIsCollapsed
    : internalIsCollapsed

  const updateIsCollapsed =
    setIsCollapsed ?? setInternalIsCollapsed

  /**
   * Screen resize handler
   */
  useEffect(() => {
    const checkScreenSize = (): void => {
      const width = window.innerWidth
      const isMobileView = width < 768

      setIsMobile(isMobileView)

      if (isMobileView && !isMobileOpen) {
        updateIsCollapsed(true)
      }
      // Tablet
      else if (width >= 768 && width <= 1024) {
        updateIsCollapsed(true)
      }
      // Desktop
      else if (width > 1024) {
        updateIsCollapsed(false)
      }
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)

    return () => window.removeEventListener("resize", checkScreenSize)
  }, [updateIsCollapsed, isMobileOpen])

  /**
   * Mobile / Horizontal layout
   */
  if (isMobile || isHorizontalLayout) {
    return (
      <MobileSidebar
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        direction={direction}
      />
    )
  }

  /**
   * Desktop layout
   */
  return (
    <DesktopSidebar
      isCollapsed={isCollapsed}
      direction={direction}
    />
  )
}
