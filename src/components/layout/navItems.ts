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
  Store,
  Building2,
  Layers,
  UserCog,
  Warehouse,
  Tag,
  Ruler,
  ShoppingBag,
  UserCircle,
  Truck,
  PackageOpen,
  DollarSign,
  Ticket,
  BookOpen,
  CreditCard,
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
    name: "Thiết lập hệ thống",
    icon: Settings,
    children: [
      { name: "Danh mục hạch toán", href: "/system/accounting-category" },
      { name: "Danh mục nguời dùng", href: "/system/users" },
      { name: "Vai trò người dùng", href: "/system/user-roles" },
      { name: "Kho hàng/Nhóm kho/Tài khoản", href: "/system/warehouse" },
      { name: "Thiết lập cửa hàng", href: "/system/store-setup" },
      { name: "Thiết lập công ty", href: "/system/company-setup" },
      { name: "Phương thức thanh toán", href: "/system/payment-methods" },
      { name: "Thiết lập Sổ", href: "/system/book-setup" },
      { name: "Thiết lập chương hệ thống", href: "/system/system-config" },
    ]
  },
  {
    name: "Quản lý hàng hóa",
    icon: Package,
    children: [
      { name: "Danh mục hàng hóa", href: "/products/list" },
      { name: "Nhóm hàng hóa", href: "/products/groups" },
      { name: "Đơn vị tính", href: "/products/units" },
      { name: "Nhóm đơn vị tính", href: "/products/unit-group" },
    ]
  },
  {
    name: "Quản lý khách hàng",
    icon: Users,
    children: [
      { name: "Danh sách khách hàng", href: "/customer" },
      { name: "Tạo đơn hàng bán", href: "/customer/create-order" },
      { name: "Danh sách đơn hàng bán", href: "/customer/orders" },
      { name: "Danh sách hóa đơn", href: "/customer/invoices" },
    ]
  },
  {
    name: "Quản lý nhà cung cấp",
    icon: Truck,
    children: [
      { name: "Danh sách nhà cung cấp", href: "/supplier/list" },
      { name: "Nhóm nhà cung cấp", href: "/supplier/groups" },
      { name: "Danh sách đơn hàng mua", href: "/supplier/purchase-orders" },
      { name: "Danh sách hóa đơn nhập", href: "/supplier/import-invoices" },
      { name: "Trả hàng", href: "/supplier/returns" },
    ]
  },
  {
    name: "Quản lý gói nguyên liệu",
    icon: PackageOpen,
    children: [
      { name: "Danh sách gói nguyên liệu", href: "/materials/packages" },
      { name: "Danh sách hóa đơn nguyên liệu", href: "/materials/invoices" },
      { name: "Tạo gói", href: "/materials/create-package" },
      { name: "Báo cáo chi phí sản xuất", href: "/materials/production-cost-report" },
    ]
  },
  {
    name: "Quy tắc giá",
    icon: DollarSign,
    children: [
      { name: "Danh sách giá mua, đơn", href: "/pricing/purchase-list" },
      { name: "Chính sách giá mua, đơn", href: "/pricing/purchase-policy" },
      { name: "Chính sách giá bán hàng", href: "/pricing/sales-policy" },
      { name: "Chương trình khuyến mãi", href: "/pricing/promotions" },
      { name: "Voucher/Coupon", href: "/pricing/vouchers" },
    ]
  },
  {
    name: "Sổ quỹ",
    icon: BookOpen,
    children: [
      { name: "Danh mục phiếu thu/chi", href: "/cashbook/categories" },
      { name: "Tạo phiếu thu chi/Ví tiền", href: "/cashbook/create" },
      { name: "Báo cáo tồn quỹ", href: "/cashbook/balance-report" },
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
]

export default navItems
export type { NavItem, NavChildItem }
