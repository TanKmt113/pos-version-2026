import { Home, Wallet, PieChart, Receipt, Settings } from "lucide-react"

const navItems = [
  { name: "Tổng quan", href: "/", icon: Home },
  { name: "Sổ quỹ", href: "/wallets", icon: Wallet },
  { name: "Giao dịch", href: "/bills", icon: Receipt },
  { name: "Báo cáo", href: "/budget", icon: PieChart },
  { name: "Thiết lập", href: "/settings", icon: Settings },
]

export default navItems
