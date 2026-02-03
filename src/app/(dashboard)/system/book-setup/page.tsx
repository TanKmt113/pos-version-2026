"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Switch } from "@/components/ui/Switch";
import { Separator } from "@/components/ui/Separator";
import { Save, BookOpen } from "lucide-react";

export default function BookSetupPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Thiết lập Sổ</h1>
          <p className="text-muted-foreground mt-1">Cấu hình sổ kế toán và chứng từ</p>
        </div>
        <Button className="gap-2">
          <Save className="h-4 w-4" />
          Lưu cấu hình
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Cấu hình Sổ quỹ
            </CardTitle>
            <CardDescription>Thiết lập sổ quỹ tiền mặt</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Tự động tạo phiếu thu/chi</Label>
                <p className="text-sm text-muted-foreground">Tạo phiếu khi có giao dịch</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Cho phép số dư âm</Label>
                <p className="text-sm text-muted-foreground">Quỹ có thể âm tạm thời</p>
              </div>
              <Switch />
            </div>
            <Separator />
            <div className="space-y-2">
              <Label htmlFor="prefix">Tiền tố phiếu thu</Label>
              <Input id="prefix" placeholder="PT" defaultValue="PT" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="prefix-chi">Tiền tố phiếu chi</Label>
              <Input id="prefix-chi" placeholder="PC" defaultValue="PC" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cấu hình Sổ bán hàng</CardTitle>
            <CardDescription>Thiết lập hóa đơn bán hàng</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>In tự động sau khi lưu</Label>
                <p className="text-sm text-muted-foreground">Tự động in hóa đơn</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Yêu cầu chọn khách hàng</Label>
                <p className="text-sm text-muted-foreground">Bắt buộc nhập KH</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="space-y-2">
              <Label htmlFor="invoice-prefix">Tiền tố hóa đơn</Label>
              <Input id="invoice-prefix" placeholder="HD" defaultValue="HD" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="start-number">Số bắt đầu</Label>
              <Input id="start-number" type="number" placeholder="1" defaultValue="1" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cấu hình Sổ mua hàng</CardTitle>
            <CardDescription>Thiết lập đơn mua hàng</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Tự động cập nhật tồn kho</Label>
                <p className="text-sm text-muted-foreground">Cập nhật kho khi nhập</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Kiểm tra trùng mã NCC</Label>
                <p className="text-sm text-muted-foreground">Cảnh báo mã trùng</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="space-y-2">
              <Label htmlFor="po-prefix">Tiền tố đơn mua</Label>
              <Input id="po-prefix" placeholder="PO" defaultValue="PO" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cấu hình Sổ kho</CardTitle>
            <CardDescription>Thiết lập quản lý kho</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Cảnh báo hết hàng</Label>
                <p className="text-sm text-muted-foreground">Thông báo khi tồn thấp</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Cho phép tồn kho âm</Label>
                <p className="text-sm text-muted-foreground">Bán khi hết hàng</p>
              </div>
              <Switch />
            </div>
            <Separator />
            <div className="space-y-2">
              <Label htmlFor="min-stock">Mức tồn tối thiểu</Label>
              <Input id="min-stock" type="number" placeholder="10" defaultValue="10" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
