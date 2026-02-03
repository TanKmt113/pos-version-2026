"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/Dialog";
import { Label } from "@/components/ui/Label";
import { Switch } from "@/components/ui/Switch";
import { Search, Plus, Edit, Trash2, CreditCard, Wallet, Building, Smartphone } from "lucide-react";

const mockMethods = [
  { id: 1, name: "Tiền mặt", icon: Wallet, type: "Mặc định", status: true, description: "Thanh toán bằng tiền mặt" },
  { id: 2, name: "Chuyển khoản", icon: Building, type: "Ngân hàng", status: true, description: "Chuyển khoản ngân hàng" },
  { id: 3, name: "Thẻ tín dụng", icon: CreditCard, type: "Thẻ", status: true, description: "Thanh toán bằng thẻ tín dụng/ghi nợ" },
  { id: 4, name: "Ví điện tử", icon: Smartphone, type: "Điện tử", status: true, description: "MoMo, ZaloPay, VNPay..." },
  { id: 5, name: "COD", icon: Wallet, type: "Khác", status: false, description: "Thanh toán khi nhận hàng" },
];

export default function PaymentMethodsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Phương thức thanh toán</h1>
          <p className="text-muted-foreground mt-1">Quản lý các hình thức thanh toán trong hệ thống</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Thêm phương thức
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Thêm phương thức thanh toán</DialogTitle>
              <DialogDescription>Cấu hình phương thức thanh toán mới</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Tên phương thức *</Label>
                <Input id="name" placeholder="VD: Ví MoMo" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Loại</Label>
                <select className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm">
                  <option>Mặc định</option>
                  <option>Ngân hàng</option>
                  <option>Thẻ</option>
                  <option>Điện tử</option>
                  <option>Khác</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="desc">Mô tả</Label>
                <Input id="desc" placeholder="Mô tả ngắn gọn" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="active">Kích hoạt ngay</Label>
                <Switch id="active" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Hủy</Button>
              <Button onClick={() => setIsDialogOpen(false)}>Thêm</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Tổng phương thức</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockMethods.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Đang kích hoạt</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{mockMethods.filter(m => m.status).length}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle>Danh sách phương thức</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Tìm kiếm..." className="pl-8" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-12">#</TableHead>
                  <TableHead>Phương thức</TableHead>
                  <TableHead>Loại</TableHead>
                  <TableHead>Mô tả</TableHead>
                  <TableHead className="text-center">Trạng thái</TableHead>
                  <TableHead className="text-center">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockMethods.map((method, index) => {
                  const Icon = method.icon;
                  return (
                    <TableRow key={method.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <Icon className="h-4 w-4 text-primary" />
                          </div>
                          {method.name}
                        </div>
                      </TableCell>
                      <TableCell><Badge variant="outline">{method.type}</Badge></TableCell>
                      <TableCell className="text-muted-foreground text-sm">{method.description}</TableCell>
                      <TableCell className="text-center">
                        <Switch checked={method.status} />
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Button size="icon" variant="ghost" className="h-8 w-8">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
