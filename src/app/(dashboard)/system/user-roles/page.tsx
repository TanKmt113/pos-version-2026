"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/Dialog";
import { Label } from "@/components/ui/Label";
import { Checkbox } from "@/components/ui/Checkbox";
import { Search, Plus, Edit, Trash2, Shield, Users } from "lucide-react";

const mockRoles = [
  { id: 1, name: "Quản trị viên", code: "ADMIN", users: 2, permissions: ["Toàn quyền hệ thống"], status: "active" },
  { id: 2, name: "Kế toán", code: "ACCOUNTANT", users: 5, permissions: ["Quản lý hóa đơn", "Xem báo cáo"], status: "active" },
  { id: 3, name: "Nhân viên bán hàng", code: "SALES", users: 12, permissions: ["Tạo hóa đơn", "Quản lý khách hàng"], status: "active" },
  { id: 4, name: "Thủ kho", code: "WAREHOUSE", users: 3, permissions: ["Quản lý kho", "Nhập xuất hàng"], status: "active" },
];

export default function UserRolesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Vai trò người dùng</h1>
          <p className="text-muted-foreground mt-1">Quản lý phân quyền và vai trò trong hệ thống</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Thêm vai trò
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Thêm vai trò mới</DialogTitle>
              <DialogDescription>Tạo vai trò và phân quyền cho người dùng</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Tên vai trò *</Label>
                  <Input id="name" placeholder="VD: Nhân viên kho" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="code">Mã vai trò *</Label>
                  <Input id="code" placeholder="VD: WAREHOUSE" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Phân quyền</Label>
                <div className="grid grid-cols-2 gap-2 border rounded-md p-4">
                  {["Quản lý hàng hóa", "Quản lý kho", "Tạo hóa đơn", "Xem báo cáo", "Quản lý khách hàng", "Cài đặt hệ thống"].map((perm) => (
                    <div key={perm} className="flex items-center space-x-2">
                      <Checkbox id={perm} />
                      <label htmlFor={perm} className="text-sm">{perm}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Hủy</Button>
              <Button onClick={() => setIsDialogOpen(false)}>Tạo vai trò</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Tổng vai trò</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockRoles.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Tổng người dùng</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockRoles.reduce((sum, r) => sum + r.users, 0)}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle>Danh sách vai trò</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Tìm kiếm vai trò..." className="pl-8" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-12">#</TableHead>
                  <TableHead>Tên vai trò</TableHead>
                  <TableHead>Mã</TableHead>
                  <TableHead className="text-center">Số người dùng</TableHead>
                  <TableHead>Quyền hạn</TableHead>
                  <TableHead className="text-center">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockRoles.map((role, index) => (
                  <TableRow key={role.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell className="font-medium flex items-center gap-2">
                      <Shield className="h-4 w-4 text-primary" />
                      {role.name}
                    </TableCell>
                    <TableCell><Badge variant="outline">{role.code}</Badge></TableCell>
                    <TableCell className="text-center">
                      <Badge className="gap-1">
                        <Users className="h-3 w-3" />
                        {role.users}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {role.permissions.map((p, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">{p}</Badge>
                        ))}
                      </div>
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
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
