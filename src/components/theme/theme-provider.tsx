"use client"

import { createContext, useContext, useState, useEffect, useMemo, ReactNode } from "react"
import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from "next-themes"
import defaultConfig from "./config"

// Định nghĩa Interface cho Context
interface ThemeContextType {
  layout: string
  setLayout: (layout: string) => void
  direction: "ltr" | "rtl"
  setDirection: (direction: "ltr" | "rtl") => void
  config: typeof defaultConfig
}

// Khởi tạo context với kiểu dữ liệu đã định nghĩa
const ThemeContext = createContext<ThemeContextType>({
  layout: defaultConfig.defaultLayout,
  setLayout: () => {},
  direction: defaultConfig.defaultDirection as "ltr" | "rtl",
  setDirection: () => {},
  config: defaultConfig,
})

// Hook để sử dụng context
export const useThemeContext = () => useContext(ThemeContext)

// Kết hợp hook của next-themes và context tùy chỉnh
export const useTheme = () => {
  const nextTheme = useNextTheme()
  const themeContext = useThemeContext()

  return {
    ...nextTheme,
    ...themeContext,
  }
}

interface ThemeProviderProps {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  // States với kiểu dữ liệu rõ ràng
  const [layout, setLayout] = useState<string>(defaultConfig.defaultLayout)
  const [direction, setDirection] = useState<"ltr" | "rtl">(
    defaultConfig.defaultDirection as "ltr" | "rtl"
  )
  const [mounted, setMounted] = useState<boolean>(false)

  // Ngăn chặn hydration mismatch (SSR vs CSR)
  useEffect(() => {
    setMounted(true)

    try {
      const savedLayout = localStorage.getItem("layout")
      const savedDirection = localStorage.getItem("direction") as "ltr" | "rtl" | null

      if (savedLayout && defaultConfig.availableLayouts.includes(savedLayout)) {
        setLayout(savedLayout)
      }

      if (savedDirection && defaultConfig.availableDirections.includes(savedDirection)) {
        setDirection(savedDirection)
      }
    } catch (error) {
      console.error("Error loading theme preferences:", error)
    }
  }, [])

  // Các hàm xử lý thay đổi
  const handleLayoutChange = (newLayout: string) => {
    if (newLayout !== layout) {
      setLayout(newLayout)
    }
  }

  const handleDirectionChange = (newDirection: "ltr" | "rtl") => {
    if (newDirection !== direction) {
      setDirection(newDirection)
    }
  }

  // Lưu tùy chọn vào localStorage và áp dụng cho thẻ HTML
  useEffect(() => {
    if (mounted) {
      try {
        localStorage.setItem("layout", layout)
        localStorage.setItem("direction", direction)

        // Áp dụng thuộc tính dir cho thẻ html
        document.documentElement.dir = direction
      } catch (error) {
        console.error("Error saving theme preferences:", error)
      }
    }
  }, [layout, direction, mounted])

  // Memoize giá trị context để tối ưu hiệu năng
  const contextValue = useMemo<ThemeContextType>(
    () => ({
      layout,
      setLayout: handleLayoutChange,
      direction,
      setDirection: handleDirectionChange,
      config: defaultConfig,
    }),
    [layout, direction],
  )

  // Nếu chưa mount, render rỗng để tránh lỗi không khớp HTML giữa Server và Client
  if (!mounted) {
    return null
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      <NextThemesProvider
        attribute="class"
        defaultTheme={defaultConfig.themeOptions.defaultTheme}
        enableSystem={defaultConfig.themeOptions.enableSystem}
        disableTransitionOnChange={defaultConfig.themeOptions.disableTransitionOnChange}
      >
        {children}
      </NextThemesProvider>
    </ThemeContext.Provider>
  )
}