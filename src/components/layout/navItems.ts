import { 
  Home, 
  Wallet, 
  PieChart, 
  Receipt, 
  Settings, 
  ShoppingCart,
  Package,
  Users,
  BarChart3,
  FileText,
  TrendingUp,
  type LucideIcon 
} from "lucide-react"

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
  badge?: string | number
} & (
  | { href: string; children?: never }
  | { href?: never; children: NavChildItem[] }
)

const navItems: NavItem[] = [
  { 
    name: "Dashboard", 
    href: "/dashboard", 
    icon: Home 
  },
  { 
    name: "Bán hàng", 
    icon: ShoppingCart,
    children: [
      { name: "Hóa đơn", href: "/invoice", icon: FileText },
      { name: "Đổi trả", href: "/return-goods", icon: Receipt },
      { name: "Trao đổi", href: "/exchange", icon: TrendingUp },
    ]
  },
  { 
    name: "Mua hàng", 
    href: "/purchase", 
    icon: Package 
  },
  { 
    name: "Khách hàng", 
    href: "/customer", 
    icon: Users 
  },
  { 
    name: "Sản phẩm", 
    icon: Package,
    children: [
      { name: "Danh sách SP", href: "/products/list" },
      { name: "Danh mục", href: "/products/categories" },
      { name: "Kho hàng", href: "/products/inventory" },
    ]
  },
  { 
    name: "Báo cáo", 
    href: "/reports", 
    icon: BarChart3 
  },
  { 
    name: "Mẫu in", 
    href: "/template-invoice", 
    icon: FileText 
  },
  { 
    name: "Thiết lập", 
    icon: Settings,
    children: [
      { name: "Cài đặt chung", href: "/settings/general", icon: Settings },
      { name: "Tài khoản", href: "/settings/account", icon: Users },
      { name: "Thanh toán", href: "/settings/payment", icon: Wallet },
    ]
  },
]

export default navItems
export type { NavItem, NavChildItem }
