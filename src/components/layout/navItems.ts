import {
  type LucideIcon,
  LayoutDashboard,
  Settings,
  Package,
  Users,
  Truck,
  DollarSign,
  Tags,
  ShoppingCart,
  Wallet,
  BarChart3,
  UserCog,
  Shield,
  Store,
  Building2,
  CreditCard,
  FileText,
  Boxes,
  Layers,
  Ruler,
  UsersRound,
  Award,
  AlertTriangle,
  Contact,
  FolderTree,
  CircleDollarSign,
  ListOrdered,
  TrendingUp,
  Coins,
  Monitor,
  BadgePercent,
  Ticket,
  Receipt,
  PlusCircle,
  BookOpen,
  ClipboardList,
  PackageSearch,
  QrCode,
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
} & (
  | { href: string; children?: never }
  | { href?: never; children: NavChildItem[] }
)

const navItems: NavItem[] = [
  { name: "Tổng quan", href: "/", icon: LayoutDashboard },
  {
    name: 'Thiết lập hệ thống',
    icon: Settings,
    children: [
      {
        name: 'Danh mục người dùng',
        href: "/users",
        icon: UserCog,
      },
      {
        name: 'Vai trò người dùng',
        href: "/roles",
        icon: Shield,
      },
      {
        name: 'Thiết lập quầy hàng',
        href: "/counters",
        icon: Store,
      },
      {
        name: 'Thiết lập cửa hàng',
        href: "/stores",
        icon: Building2,
      },
      {
        name: 'Phương thức thanh toán',
        href: "/payment-methods",
        icon: CreditCard,
      },
      {
        name: 'Hóa đơn điện tử',
        href: "/e-invoices",
        icon: FileText,
      },
      {
        name: 'Thiết lập chung hệ thống',
        href: "/general-settings",
        icon: Settings,
      },
      {
        name: 'Danh mục hàng hóa',
        href: "/product-categories",
        icon: Boxes,
      },
    ]
  },
  {
    name: 'Quản lý hàng hóa',
    icon: Package,
    children: [
      {
        name: 'Quản lý hàng hóa',
        href: "/products/list",
        icon: Package,
      },
      {
        name: 'Nhóm hàng hóa',
        href: "/products/groups",
        icon: Layers,
      },
      {
        name: 'Đơn vị tính',
        href: "/products/units",
        icon: Ruler,
      },
      {
        name: 'Nhóm đơn vị tính',
        href: "/products/unit-groups",
        icon: FolderTree,
      },
    ]
  },
  {
    name: 'Quản lý khách hàng',
    icon: Users,
    children: [
      {
        name: 'Danh sách khách hàng',
        href: "/customers/list",
        icon: UsersRound,
      },
      {
        name: 'Tích điểm & hạng thẻ',
        href: "/customers/loyalty",
        icon: Award,
      },
      {
        name: 'Danh sách khách hàng cảnh báo',
        href: "/customers/warnings",
        icon: AlertTriangle,
      },
    ]
  },
  {
    name: 'Quản lý nhà cung cấp',
    icon: Truck,
    children: [
      {
        name: 'Danh sách nhà cung cấp',
        href: "/suppliers/list",
        icon: Contact,
      },
      {
        name: 'Nhóm nhà cung cấp',
        href: "/suppliers/groups",
        icon: FolderTree,
      },
    ]
  },
  {
    name: 'Bảng giá nguyên liệu',
    icon: DollarSign,
    children: [
      {
        name: 'Danh sách mã giá',
        href: "/pricing/codes",
        icon: CircleDollarSign,
      },
      {
        name: 'Danh sách bảng giá',
        href: "/pricing/price-lists",
        icon: ListOrdered,
      },
      {
        name: 'Tỷ giá',
        href: "/pricing/exchange-rates",
        icon: TrendingUp,
      },
      {
        name: 'Đầu chờ tích hợp với bảng giá hiển thị giá vàng/bạc',
        href: "/pricing/gold-silver-display",
        icon: Monitor,
      },
    ]
  },
  {
    name: 'Quy tắc giá mua, giá bán',
    icon: Tags,
    children: [
      {
        name: 'Chính sách giá bán',
        href: "/price-rules/selling",
        icon: Coins,
      },
      {
        name: 'Chính sách giá mua, đổi',
        href: "/price-rules/buying",
        icon: TrendingUp,
      },
    ]
  },
  {
    name: 'Chính sách bán hàng',
    icon: ShoppingCart,
    children: [
      {
        name: 'Chương trình khuyến mại',
        href: "/sales-policy/promotions",
        icon: BadgePercent,
      },
      {
        name: 'Voucher/Coupon',
        href: "/sales-policy/vouchers",
        icon: Ticket,
      },
      {
        name: 'Danh mục phiếu thu/phiếu chi',
        href: "/sales-policy/receipt-categories",
        icon: Receipt,
      },
      {
        name: 'Tạo phiếu thu/chi độc lập',
        href: "/sales-policy/create-receipt",
        icon: PlusCircle,
      },
    ]
  },
  {
    name: 'Sổ quỹ',
    icon: Wallet,
    children: [
      {
        name: 'Danh mục phiếu thu/phiếu chi',
        href: "/cash-book/categories",
        icon: BookOpen,
      },
      {
        name: 'Tạo phiếu thu/chi độc lập',
        href: "/cash-book/create",
        icon: PlusCircle,
      },
    ]
  },
  {
    name: 'Báo cáo',
    icon: BarChart3,
    children: [
      {
        name: 'Báo cáo tồn kho quầy hàng',
        href: "/reports/inventory",
        icon: ClipboardList,
      },
      {
        name: 'Báo cáo thông tin Serial/Lô',
        href: "/reports/serial-batch",
        icon: QrCode,
      },
    ]
  },
]

export default navItems
export type { NavItem, NavChildItem }
