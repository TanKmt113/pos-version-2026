# 📐 Hướng dẫn sử dụng Layout System

## 🎯 Tổng quan

Dự án đã có sẵn một **Layout System hoàn chỉnh** cho Admin Dashboard với:
- ✅ **Header** (Vertical/Horizontal)
- ✅ **Sidebar** (Desktop/Mobile, Collapsible)
- ✅ **Content Area** (Main content)
- ✅ **Footer** (Thông tin, social links)
- ✅ **Theme System** (Light/Dark mode)
- ✅ **Responsive Design** (Mobile-first)

---

## 📁 Cấu trúc Layout

```
src/
├── app/
│   └── (dashboard)/
│       └── layout.tsx          # Layout wrapper cho dashboard
│
└── components/
    └── layout/
        ├── index.tsx           # Main Layout Component
        ├── navItems.ts         # Cấu hình Menu Navigation
        ├── footer.tsx          # Footer Component
        ├── sidebar/
        │   ├── index.tsx       # Sidebar Controller
        │   ├── DesktopSidebar.tsx
        │   ├── MobileSidebar.tsx
        │   ├── NavigationItems.tsx
        │   └── UserProfile.tsx
        ├── vertical-header/
        │   └── index.tsx       # Header cho Vertical Layout
        └── horizontal-header/
            └── index.tsx       # Header cho Horizontal Layout
```

---

## 🚀 Cách sử dụng

### 1. Áp dụng Layout cho route mới

Layout **TỰ ĐỘNG** áp dụng cho tất cả các page trong thư mục `(dashboard)/`:

```tsx
// src/app/(dashboard)/your-page/page.tsx
export default function YourPage() {
  return (
    <div>
      <h1>Nội dung trang của bạn</h1>
      {/* Header, Sidebar, Footer tự động render */}
    </div>
  );
}
```

### 2. Tùy chỉnh Menu Navigation

Chỉnh sửa file `src/components/layout/navItems.ts`:

```typescript
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
      { name: "Đổi trả", href: "/return-goods" },
    ]
  },
];
```

**Cấu trúc NavItem:**
- `name`: Tên hiển thị
- `icon`: Icon từ `lucide-react`
- `href`: Link đích (menu đơn)
- `children`: Menu con (submenu)
- `badge`: Hiển thị badge số (optional)

### 3. Layout Options

#### Option A: Vertical Layout (Sidebar bên trái)
```
┌─────────────────────────────────┐
│         Header                  │
├──────┬──────────────────────────┤
│      │                          │
│ Side │     Content Area         │
│ bar  │                          │
│      │                          │
├──────┴──────────────────────────┤
│         Footer                  │
└─────────────────────────────────┘
```

#### Option B: Horizontal Layout (Menu ngang)
```
┌─────────────────────────────────┐
│     Header + Horizontal Menu    │
├─────────────────────────────────┤
│                                 │
│        Content Area             │
│                                 │
├─────────────────────────────────┤
│         Footer                  │
└─────────────────────────────────┘
```

Thay đổi layout trong Theme Settings (ThemeConfig component).

### 4. Tùy chỉnh Header

Chỉnh sửa `src/components/layout/vertical-header/index.tsx`:

```tsx
export function VerticalHeader({ toggleSidebar, setMobileOpen }: Props) {
  return (
    <header className="sticky top-0 z-30 border-b bg-card/80 backdrop-blur-sm">
      {/* Header content */}
    </header>
  );
}
```

### 5. Tùy chỉnh Footer

Chỉnh sửa `src/components/layout/footer.tsx`:

```tsx
export function Footer() {
  return (
    <footer className="border-t bg-card">
      {/* Footer content */}
    </footer>
  );
}
```

---

## 🎨 Tính năng có sẵn

### ✅ Sidebar Features
- **Collapsible**: Thu gọn/mở rộng sidebar
- **Responsive**: Tự động chuyển sang mobile sidebar
- **Active State**: Highlight menu đang active
- **Submenu**: Hỗ trợ menu con với animation
- **Tooltip**: Hiển thị tooltip khi sidebar thu gọn
- **User Profile**: Thông tin user ở cuối sidebar

### ✅ Header Features
- **Search**: Tìm kiếm nhanh
- **Notifications**: Thông báo
- **Profile Menu**: Dropdown menu user
- **Theme Toggle**: Chuyển dark/light mode
- **Mobile Menu**: Hamburger menu trên mobile

### ✅ Responsive Breakpoints
- **Mobile**: < 768px (Sidebar ẩn, hiện menu icon)
- **Tablet**: 768px - 1024px (Sidebar thu gọn)
- **Desktop**: > 1024px (Sidebar mở rộng)

---

## 🔧 Tùy chỉnh nâng cao

### 1. Thêm route không dùng Layout

Tạo folder mới **NGOÀI** `(dashboard)`:

```
src/app/
├── (dashboard)/          # Có Layout
│   └── ...
└── (standalone)/         # Không có Layout
    └── special-page/
        └── page.tsx
```

### 2. Custom Layout cho route cụ thể

```tsx
// src/app/(dashboard)/special/layout.tsx
export default function SpecialLayout({ children }) {
  return (
    <div className="custom-layout">
      <CustomHeader />
      {children}
      <CustomFooter />
    </div>
  );
}
```

### 3. Thêm Breadcrumb

```tsx
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export default function Page() {
  return (
    <>
      <Breadcrumb items={[
        { label: "Dashboard", href: "/dashboard" },
        { label: "Sản phẩm", href: "/products" },
        { label: "Chi tiết" }
      ]} />
      {/* Content */}
    </>
  );
}
```

---

## 🎯 Best Practices

### ✅ DO
- Sử dụng layout có sẵn cho tất cả trang admin
- Tùy chỉnh menu trong `navItems.ts`
- Sử dụng container class: `container mx-auto px-4`
- Giữ nguyên cấu trúc layout hiện tại

### ❌ DON'T
- Không tạo layout mới nếu không cần thiết
- Không hard-code header/footer trong từng page
- Không style trực tiếp layout component
- Không bỏ qua responsive design

---

## 📦 Components có sẵn

Layout đã tích hợp sẵn:
- `<Card>` - Wrapper cho content
- `<Button>` - Buttons với variants
- `<Badge>` - Labels và badges
- `<Avatar>` - User avatars
- `<Tooltip>` - Tooltips
- `<ScrollArea>` - Custom scrollbar
- `<Separator>` - Divider lines

---

## 🐛 Troubleshooting

### Sidebar không hiện trên mobile
```tsx
// Kiểm tra setMobileOpen trong Header
<Button onClick={() => setMobileOpen(true)}>
  <Menu />
</Button>
```

### Menu không active đúng
```tsx
// Đảm bảo href trong navItems khớp với pathname
{ name: "Dashboard", href: "/dashboard" } // ✅
{ name: "Dashboard", href: "/dashboard/" } // ❌ (trailing slash)
```

### Layout bị lỗi khi chuyển trang
```tsx
// Bọc Layout trong Suspense nếu cần
<Suspense fallback={<Loading />}>
  <Layout>{children}</Layout>
</Suspense>
```

---

## 🎓 Tham khảo

- **Theme System**: `src/components/theme/`
- **UI Components**: `src/components/ui/`
- **Utils**: `src/shared/utils/utils.ts`
- **Icons**: [Lucide Icons](https://lucide.dev/)

---

## 📝 Tóm tắt

1. **Layout tự động áp dụng** cho tất cả page trong `(dashboard)/`
2. **Chỉnh menu** trong `navItems.ts`
3. **Tùy chỉnh Header/Footer** trong `layout/` folder
4. **Responsive** tự động
5. **Theme** hỗ trợ Light/Dark mode

**Không cần code lại layout nhiều lần - chỉ tạo page content!** 🚀
