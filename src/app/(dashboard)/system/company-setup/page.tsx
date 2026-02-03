"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import { Separator } from "@/components/ui/Separator";
import { Save, Building2, MapPin, Phone, Mail, FileText } from "lucide-react";

export default function CompanySetupPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Thiết lập công ty</h1>
          <p className="text-muted-foreground mt-1">Cấu hình thông tin pháp lý của công ty</p>
        </div>
        <Button className="gap-2">
          <Save className="h-4 w-4" />
          Lưu thay đổi
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Thông tin công ty
          </CardTitle>
          <CardDescription>Thông tin pháp lý và giấy tờ đăng ký kinh doanh</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Tên công ty *</Label>
              <Input id="companyName" placeholder="CÔNG TY TNHH ABC" defaultValue="CÔNG TY TNHH POS SYSTEM" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="shortName">Tên viết tắt</Label>
              <Input id="shortName" placeholder="ABC Co., Ltd" defaultValue="POS System Co." />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="taxCode">Mã số thuế *</Label>
              <Input id="taxCode" placeholder="0123456789" defaultValue="0123456789" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="businessType">Loại hình doanh nghiệp</Label>
              <select className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm">
                <option>CÔNG TY TNHH</option>
                <option>CÔNG TY CỔ PHẦN</option>
                <option>DOANH NGHIỆP TƯ NHÂN</option>
                <option>HỢP TÁC XÃ</option>
              </select>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Địa chỉ đăng ký kinh doanh
              </Label>
              <Textarea id="address" placeholder="Nhập địa chỉ đầy đủ" rows={2} defaultValue="123 Đường ABC, Phường X, Quận Y, TP. Hồ Chí Minh" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Số điện thoại
                </Label>
                <Input id="phone" placeholder="(028) 1234 5678" defaultValue="(028) 1234 5678" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email
                </Label>
                <Input id="email" type="email" placeholder="info@company.com" defaultValue="info@poscompany.com" />
              </div>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="representative">Người đại diện pháp luật</Label>
              <Input id="representative" placeholder="Nguyễn Văn A" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="position">Chức vụ</Label>
              <Input id="position" placeholder="Giám đốc" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="businessLicense" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Số giấy phép kinh doanh
              </Label>
              <Input id="businessLicense" placeholder="0123456789" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="issueDate">Ngày cấp</Label>
              <Input id="issueDate" type="date" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="issuePlace">Nơi cấp</Label>
            <Input id="issuePlace" placeholder="Sở Kế hoạch và Đầu tư TP.HCM" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
