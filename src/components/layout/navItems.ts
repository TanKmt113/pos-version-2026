import { Home, Wallet, PieChart, Receipt, Settings, type LucideIcon } from "lucide-react"

// Type cho menu item con
interface NavChildItem {
  name: string
  href: string
  icon?: LucideIcon
}

// Type cho menu item (có thể có children hoặc href)
type NavItem = {
  name: string
  icon: LucideIcon
} & (
  | { href: string; children?: never }
  | { href?: never; children: NavChildItem[] }
)

const navItems: NavItem[] = [
  { name: "Tổng quan", href: "/", icon: Home },
  { name: "Sổ quỹ", href: "/wallets", icon: Wallet },
  { name: "Giao dịch", href: "/bills", icon: Receipt },
  { name: "Báo cáo", href: "/budget", icon: PieChart },
  { name: "Thiết lập", href: "/settings", icon: Settings },
  // Ví dụ menu có children:
  // {
  //   name: "Thiết lập",
  //   icon: Settings,
  //   children: [
  //     { name: "Cài đặt chung", href: "/settings/general", icon: Settings },
  //     { name: "Tài khoản", href: "/settings/account" },
  //   ]
  // },
]

export default navItems
export type { NavItem, NavChildItem }
