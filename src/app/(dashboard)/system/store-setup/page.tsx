"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Separator } from "@/components/ui/Separator";
import { Save, Store, MapPin, Phone, Mail, Globe } from "lucide-react";

export default function StoreSetupPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Thiết lập cửa hàng</h1>
          <p className="text-muted-foreground mt-1">Cấu hình thông tin cửa hàng của bạn</p>
        </div>
        <Button className="gap-2">
          <Save className="h-4 w-4" />
          Lưu thay đổi
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Thông tin cửa hàng</CardTitle>
            <CardDescription>Cập nhật thông tin chính của cửa hàng</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="storeName">Tên cửa hàng *</Label>
                <Input id="storeName" placeholder="VD: POS Store" defaultValue="POS Store" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="storeCode">Mã cửa hàng</Label>
                <Input id="storeCode" placeholder="STORE-01" defaultValue="STORE-01" />
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Địa chỉ
                </Label>
                <Input id="address" placeholder="Nhập địa chỉ cửa hàng" defaultValue="123 Đường ABC, Quận 1, TP.HCM" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Số điện thoại
                  </Label>
                  <Input id="phone" placeholder="0901234567" defaultValue="0901234567" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email
                  </Label>
                  <Input id="email" type="email" placeholder="store@example.com" defaultValue="store@pos.com" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="website" className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Website
                </Label>
                <Input id="website" placeholder="https://yourstore.com" />
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="taxCode">Mã số thuế</Label>
                <Input id="taxCode" placeholder="0123456789" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessType">Loại hình kinh doanh</Label>
                <select className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm">
                  <option>Bán lẻ</option>
                  <option>Bán sỉ</option>
                  <option>Cả hai</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Logo cửa hàng</CardTitle>
            <CardDescription>Tải lên logo của bạn</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed rounded-lg p-8 text-center">
              <Store className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground mb-4">Kéo thả hoặc click để tải ảnh</p>
              <Button variant="outline" size="sm">Chọn file</Button>
            </div>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>• Định dạng: JPG, PNG</p>
              <p>• Kích thước tối đa: 2MB</p>
              <p>• Khuyến nghị: 500x500px</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
