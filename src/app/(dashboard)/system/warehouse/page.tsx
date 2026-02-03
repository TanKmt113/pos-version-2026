"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/Dialog";
import { Label } from "@/components/ui/Label";
import { Search, Plus, Edit, Trash2, Warehouse, Layers, CreditCard } from "lucide-react";

const mockWarehouses = [
  { id: 1, code: "KHO-01", name: "Kho trung tâm", address: "123 Đường ABC, Q1", manager: "Nguyễn Văn A", status: "Hoạt động" },
  { id: 2, code: "KHO-02", name: "Kho chi nhánh 1", address: "456 Đường XYZ, Q2", manager: "Trần Thị B", status: "Hoạt động" },
];

const mockGroups = [
  { id: 1, name: "Hàng điện tử", warehouses: 2, products: 150 },
  { id: 2, name: "Thực phẩm", warehouses: 3, products: 280 },
];

export default function WarehousePage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quản lý kho hàng</h1>
          <p className="text-muted-foreground mt-1">Kho hàng, nhóm kho và tài khoản liên quan</p>
        </div>
      </div>

      <Tabs defaultValue="warehouse" className="space-y-4">
        <TabsList>
          <TabsTrigger value="warehouse" className="gap-2">
            <Warehouse className="h-4 w-4" />
            Kho hàng
          </TabsTrigger>
          <TabsTrigger value="group" className="gap-2">
            <Layers className="h-4 w-4" />
            Nhóm kho
          </TabsTrigger>
          <TabsTrigger value="account" className="gap-2">
            <CreditCard className="h-4 w-4" />
            Tài khoản
          </TabsTrigger>
        </TabsList>

        <TabsContent value="warehouse" className="space-y-4">
          <div className="flex justify-end">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Thêm kho
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Thêm kho hàng</DialogTitle>
                  <DialogDescription>Nhập thông tin kho hàng mới</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Mã kho *</Label>
                      <Input placeholder="KHO-XX" />
                    </div>
                    <div className="space-y-2">
                      <Label>Tên kho *</Label>
                      <Input placeholder="Kho trung tâm" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Địa chỉ</Label>
                    <Input placeholder="Nhập địa chỉ kho" />
                  </div>
                  <div className="space-y-2">
                    <Label>Quản lý</Label>
                    <Input placeholder="Tên người quản lý" />
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
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead>#</TableHead>
                    <TableHead>Mã kho</TableHead>
                    <TableHead>Tên kho</TableHead>
                    <TableHead>Địa chỉ</TableHead>
                    <TableHead>Quản lý</TableHead>
                    <TableHead className="text-center">Trạng thái</TableHead>
                    <TableHead className="text-center">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockWarehouses.map((item, i) => (
                    <TableRow key={item.id}>
                      <TableCell>{i + 1}</TableCell>
                      <TableCell><Badge variant="outline">{item.code}</Badge></TableCell>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.address}</TableCell>
                      <TableCell>{item.manager}</TableCell>
                      <TableCell className="text-center">
                        <Badge className="bg-green-500">{item.status}</Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex justify-center gap-1">
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
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="group" className="space-y-4">
          <div className="flex justify-end">
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Thêm nhóm
            </Button>
          </div>
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead>#</TableHead>
                    <TableHead>Tên nhóm</TableHead>
                    <TableHead className="text-center">Số kho</TableHead>
                    <TableHead className="text-center">Số sản phẩm</TableHead>
                    <TableHead className="text-center">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockGroups.map((item, i) => (
                    <TableRow key={item.id}>
                      <TableCell>{i + 1}</TableCell>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell className="text-center"><Badge variant="outline">{item.warehouses}</Badge></TableCell>
                      <TableCell className="text-center"><Badge variant="outline">{item.products}</Badge></TableCell>
                      <TableCell className="text-center">
                        <div className="flex justify-center gap-1">
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
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account">
          <Card>
            <CardContent className="pt-6 text-center py-12">
              <CreditCard className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Quản lý tài khoản liên quan đến kho hàng</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
