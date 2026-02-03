"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/Dialog";
import { Label } from "@/components/ui/Label";
import { Search, Plus, Edit, Trash2, Filter, FileText } from "lucide-react";

const mockData = [
  { id: 1, code: "TK131", name: "Phải thu khách hàng", type: "Tài sản", status: "Đang sử dụng" },
  { id: 2, code: "TK331", name: "Phải trả người bán", type: "Nợ phải trả", status: "Đang sử dụng" },
  { id: 3, code: "TK511", name: "Doanh thu bán hàng", type: "Doanh thu", status: "Đang sử dụng" },
  { id: 4, code: "TK632", name: "Giá vốn hàng bán", type: "Chi phí", status: "Đang sử dụng" },
  { id: 5, code: "TK111", name: "Tiền mặt", type: "Tài sản", status: "Đang sử dụng" },
];

export default function AccountingCategoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredData = mockData.filter(item =>
    item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Danh mục hạch toán</h1>
          <p className="text-muted-foreground mt-1">Quản lý tài khoản kế toán và danh mục hạch toán</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Thêm tài khoản
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Thêm tài khoản mới</DialogTitle>
              <DialogDescription>Nhập thông tin tài khoản kế toán</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="code">Mã tài khoản *</Label>
                <Input id="code" placeholder="VD: TK131" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Tên tài khoản *</Label>
                <Input id="name" placeholder="VD: Phải thu khách hàng" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Loại tài khoản</Label>
                <select className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm">
                  <option>Tài sản</option>
                  <option>Nợ phải trả</option>
                  <option>Vốn chủ sở hữu</option>
                  <option>Doanh thu</option>
                  <option>Chi phí</option>
                </select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Hủy</Button>
              <Button onClick={() => setIsDialogOpen(false)}>Thêm</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>Danh sách tài khoản</CardTitle>
              <CardDescription>Tổng số: {filteredData.length} tài khoản</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Tìm kiếm..." className="pl-8" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              </div>
              <Button variant="outline" size="sm"><Filter className="h-4 w-4" /></Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-12">#</TableHead>
                  <TableHead>Mã TK</TableHead>
                  <TableHead>Tên tài khoản</TableHead>
                  <TableHead>Loại</TableHead>
                  <TableHead className="text-center">Trạng thái</TableHead>
                  <TableHead className="text-center w-24">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell><Badge variant="outline" className="font-mono">{item.code}</Badge></TableCell>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell className="text-center">
                      <Badge className="bg-green-500">{item.status}</Badge>
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
