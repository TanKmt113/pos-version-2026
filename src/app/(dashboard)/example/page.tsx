import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/Breadcrumb";
import { Home, Plus, Download, Filter } from "lucide-react";

/**
 * Example Page - Demo cách sử dụng Layout System
 * 
 * Page này tự động có:
 * - Header với search, notifications, profile
 * - Sidebar với navigation menu
 * - Footer với thông tin
 * - Theme system (Light/Dark)
 * - Responsive design
 */

export default function ExamplePage() {
  return (
    <div className="space-y-6">
      {/* Breadcrumb Navigation */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">
              <Home className="h-4 w-4" />
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Example Page</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Example Page</h1>
          <p className="text-muted-foreground mt-1">
            Trang demo cách sử dụng Layout System
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Lọc
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Xuất
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Thêm mới
          </Button>
        </div>
      </div>

      {/* Info Card */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            ✨ Layout System
            <Badge variant="secondary">Auto Applied</Badge>
          </CardTitle>
          <CardDescription>
            Trang này tự động sử dụng layout từ <code className="bg-muted px-2 py-1 rounded">app/(dashboard)/layout.tsx</code>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex items-start gap-2">
            <span className="font-semibold min-w-32">✅ Header:</span>
            <span>Tự động hiển thị với search, notifications, profile menu</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-semibold min-w-32">✅ Sidebar:</span>
            <span>Navigation menu từ <code className="bg-muted px-1 rounded">navItems.ts</code></span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-semibold min-w-32">✅ Footer:</span>
            <span>Tự động hiển thị ở cuối trang</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-semibold min-w-32">✅ Theme:</span>
            <span>Hỗ trợ Light/Dark mode tự động</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-semibold min-w-32">✅ Responsive:</span>
            <span>Tự động responsive trên mọi thiết bị</span>
          </div>
        </CardContent>
      </Card>

      {/* Demo Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Card Demo {i}</CardTitle>
              <CardDescription>
                Nội dung card mẫu
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Đây là nội dung của card {i}. Bạn chỉ cần focus vào việc xây dựng
                nội dung, layout đã được xử lý tự động.
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Code Example */}
      <Card>
        <CardHeader>
          <CardTitle>💻 Code Example</CardTitle>
          <CardDescription>
            Để tạo page mới với layout tự động
          </CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
{`// src/app/(dashboard)/your-page/page.tsx
export default function YourPage() {
  return (
    <div className="space-y-6">
      <h1>Your Page Title</h1>
      {/* Your content here */}
    </div>
  );
}

// Layout tự động áp dụng!
// ✅ Header
// ✅ Sidebar  
// ✅ Footer
// ✅ Theme
`}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}
