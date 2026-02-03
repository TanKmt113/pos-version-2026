"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Switch } from "@/components/ui/Switch";
import { Separator } from "@/components/ui/Separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Save, Settings, Bell, Shield, Database, Palette } from "lucide-react";

export default function SystemConfigPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Thiết lập chương hệ thống</h1>
          <p className="text-muted-foreground mt-1">Cấu hình tổng thể hệ thống POS</p>
        </div>
        <Button className="gap-2">
          <Save className="h-4 w-4" />
          Lưu tất cả
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general" className="gap-2">
            <Settings className="h-4 w-4" />
            Chung
          </TabsTrigger>
          <TabsTrigger value="notification" className="gap-2">
            <Bell className="h-4 w-4" />
            Thông báo
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Shield className="h-4 w-4" />
            Bảo mật
          </TabsTrigger>
          <TabsTrigger value="backup" className="gap-2">
            <Database className="h-4 w-4" />
            Sao lưu
          </TabsTrigger>
          <TabsTrigger value="display" className="gap-2">
            <Palette className="h-4 w-4" />
            Giao diện
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cấu hình chung</CardTitle>
              <CardDescription>Thiết lập cơ bản của hệ thống</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Múi giờ</Label>
                  <select className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm">
                    <option>GMT+7 (Hanoi, Bangkok)</option>
                    <option>GMT+8 (Singapore)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Đơn vị tiền tệ</Label>
                  <select className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm">
                    <option>VND (₫)</option>
                    <option>USD ($)</option>
                  </select>
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Chế độ bảo trì</Label>
                  <p className="text-sm text-muted-foreground">Tạm ngừng hệ thống để bảo trì</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Cho phép đăng ký mới</Label>
                  <p className="text-sm text-muted-foreground">Người dùng mới có thể đăng ký</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notification" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cấu hình thông báo</CardTitle>
              <CardDescription>Quản lý thông báo và cảnh báo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Thông báo email</Label>
                  <p className="text-sm text-muted-foreground">Gửi thông báo qua email</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Thông báo đơn hàng mới</Label>
                  <p className="text-sm text-muted-foreground">Cảnh báo khi có đơn mới</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Thông báo hết hàng</Label>
                  <p className="text-sm text-muted-foreground">Cảnh báo tồn kho thấp</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="email">Email nhận thông báo</Label>
                <Input id="email" type="email" placeholder="admin@pos.com" defaultValue="admin@pos.com" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cấu hình bảo mật</CardTitle>
              <CardDescription>Thiết lập bảo mật hệ thống</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Xác thực 2 yếu tố (2FA)</Label>
                  <p className="text-sm text-muted-foreground">Bắt buộc OTP khi đăng nhập</p>
                </div>
                <Switch />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Tự động đăng xuất</Label>
                  <p className="text-sm text-muted-foreground">Đăng xuất khi không hoạt động</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="timeout">Thời gian chờ (phút)</Label>
                  <Input id="timeout" type="number" placeholder="30" defaultValue="30" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="attempts">Số lần đăng nhập sai</Label>
                  <Input id="attempts" type="number" placeholder="5" defaultValue="5" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backup" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sao lưu dữ liệu</CardTitle>
              <CardDescription>Cấu hình tự động backup</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Tự động sao lưu</Label>
                  <p className="text-sm text-muted-foreground">Backup tự động theo lịch</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="frequency">Tần suất</Label>
                <select className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm">
                  <option>Hàng ngày</option>
                  <option>Hàng tuần</option>
                  <option>Hàng tháng</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="retention">Thời gian lưu trữ (ngày)</Label>
                <Input id="retention" type="number" placeholder="30" defaultValue="30" />
              </div>
              <Separator />
              <div className="flex gap-2">
                <Button variant="outline">Sao lưu ngay</Button>
                <Button variant="outline">Khôi phục</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="display" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cấu hình giao diện</CardTitle>
              <CardDescription>Tùy chỉnh hiển thị</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Theme mặc định</Label>
                <select className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm">
                  <option>Light</option>
                  <option>Dark</option>
                  <option>System</option>
                </select>
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>Ngôn ngữ</Label>
                <select className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm">
                  <option>Tiếng Việt</option>
                  <option>English</option>
                </select>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Hiển thị logo công ty</Label>
                  <p className="text-sm text-muted-foreground">Logo trên header</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
