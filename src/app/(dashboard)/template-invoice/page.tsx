"use client";

import { useState } from "react";
import { InvoicePreview } from "@/shared/ui/invoicePreview";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Separator } from "@/components/ui/Separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Plus, Save, Eye, Code, FileText, Download, Printer } from "lucide-react";

export default function InvoicePage() {
  const [template, setTemplate] = useState("");

  const EditorClient = dynamic(() => import("@/shared/ui/editorClient"), {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-full">
        <div className="text-center space-y-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-sm text-muted-foreground">Đang tải editor...</p>
        </div>
      </div>
    ),
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight">Mẫu hóa đơn</h1>
            <Badge variant="secondary" className="hidden sm:inline-flex">
              <FileText className="h-3 w-3 mr-1" />
              Template Editor
            </Badge>
          </div>
          <p className="text-muted-foreground mt-1">
            Tạo và quản lý các mẫu in hóa đơn của bạn
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Xuất
          </Button>
          <Button variant="outline" size="sm">
            <Printer className="h-4 w-4 mr-2" />
            In thử
          </Button>
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Thêm mới
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[calc(100vh-16rem)]">
        {/* Left Column: Editor */}
        <Card className="shadow-md border-none overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  Trình soạn thảo
                </CardTitle>
                <CardDescription className="mt-1">
                  Chỉnh sửa nội dung mẫu hóa đơn
                </CardDescription>
              </div>
              <Button size="sm" variant="outline" className="gap-2">
                <Save className="h-4 w-4" />
                Lưu
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0 h-[calc(100vh-20rem)]">
            <div className="h-full bg-gray-50/50">
              <EditorClient onChange={setTemplate} value={template} />
            </div>
          </CardContent>
        </Card>

        {/* Right Column: Preview */}
        <Card className="shadow-md border-none overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-500/5 to-blue-500/10 border-b">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Xem trước
                </CardTitle>
                <CardDescription className="mt-1">
                  Kết quả hiển thị của mẫu
                </CardDescription>
              </div>
              <Badge variant="outline" className="gap-1">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                Live Preview
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0 h-[calc(100vh-20rem)]">
            <div className="h-full overflow-auto bg-white">
              <InvoicePreview htmlContent={template} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Info Section */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3 text-sm">
            <div className="rounded-full bg-primary/10 p-2">
              <FileText className="h-4 w-4 text-primary" />
            </div>
            <div className="space-y-1">
              <p className="font-medium">💡 Hướng dẫn sử dụng</p>
              <ul className="text-muted-foreground space-y-1 text-xs">
                <li>• Sử dụng trình soạn thảo bên trái để tạo nội dung mẫu hóa đơn</li>
                <li>• Xem kết quả ngay lập tức ở bên phải (Live Preview)</li>
                <li>• Nhấn "Lưu" để lưu mẫu, "In thử" để kiểm tra trước khi sử dụng</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
