"use client";

import { HeaderTabs } from "@/components/client/Header";
import { SlideRightClient } from "@/components/client/SlideRight";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/Card";
import { Search, Plus, Trash2, Edit, ShoppingCart, Filter } from "lucide-react";
import Image from "next/image";

const products = [
  {
    id: 1,
    code: "MK01009",
    name: "Súng tiểu liên",
    quantity: 2,
    unit: "Cái",
    price: 200000000,
    image:
      "http://t1.gstatic.com/images?q=tbn:ANd9GcQOt8jh7Qz16k4Q6DMP6CnhrCqj94xetn2p_oLq-VCJ42NWGpZzpHSH8yhHJ1qEsA",
  },
  {
    id: 2,
    code: "MK01010",
    name: "Máy tính xách tay",
    quantity: 5,
    unit: "Cái",
    price: 25000000,
    image:
      "http://t1.gstatic.com/images?q=tbn:ANd9GcQOt8jh7Qz16k4Q6DMP6CnhrCqj94xetn2p_oLq-VCJ42NWGpZzpHSH8yhHJ1qEsA",
  },
  {
    id: 3,
    code: "MK01011",
    name: "Điện thoại thông minh",
    quantity: 10,
    unit: "Cái",
    price: 15000000,
    image:
      "http://t1.gstatic.com/images?q=tbn:ANd9GcQOt8jh7Qz16k4Q6DMP6CnhrCqj94xetn2p_oLq-VCJ42NWGpZzpHSH8yhHJ1qEsA",
  },
];

export default function InvoicePage() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const totalAmount = products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <HeaderTabs>
        <div className="relative">
          <Input
            type="text"
            placeholder="Tìm kiếm sản phẩm (Tên, Mã, Barcode...)"
            className="h-9 pl-10 bg-white/90 backdrop-blur-sm border-white/20 focus:border-white/40 transition-all"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        </div>
      </HeaderTabs>

      <div className="flex flex-1 gap-4 p-4">
        {/* Main Content - Product List */}
        <div className="flex-1 space-y-4">
          {/* Action Bar */}
          <Card className="shadow-sm border-none">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Button
                    size="sm"
                    className="gap-2 bg-primary hover:bg-primary/90"
                  >
                    <Plus className="h-4 w-4" />
                    Thêm sản phẩm
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="gap-2 hover:bg-gray-50"
                  >
                    <Filter className="h-4 w-4" />
                    Lọc
                  </Button>
                </div>
                <Badge variant="secondary" className="px-4 py-2 text-sm">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {products.length} sản phẩm
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Product Table */}
          <Card className="shadow-md border-none overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b">
              <CardTitle className="text-lg">Danh sách sản phẩm</CardTitle>
              <CardDescription>
                Quản lý các sản phẩm trong hóa đơn
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50/50 hover:bg-gray-50/50">
                      <TableHead className="font-semibold w-16">STT</TableHead>
                      <TableHead className="font-semibold">Mã HH</TableHead>
                      <TableHead className="font-semibold w-24">Ảnh</TableHead>
                      <TableHead className="font-semibold">Tên hàng hóa</TableHead>
                      <TableHead className="font-semibold text-center w-24">
                        SL
                      </TableHead>
                      <TableHead className="font-semibold w-20">ĐVT</TableHead>
                      <TableHead className="font-semibold text-right">
                        Đơn giá
                      </TableHead>
                      <TableHead className="font-semibold text-right">
                        Thành tiền
                      </TableHead>
                      <TableHead className="font-semibold text-center w-24">
                        Thao tác
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product, index) => (
                      <TableRow
                        key={product.id}
                        className="hover:bg-primary/5 transition-colors"
                      >
                        <TableCell className="font-medium text-gray-500">
                          {index + 1}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="font-mono text-xs">
                            {product.code}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="relative w-14 h-14 rounded-lg overflow-hidden border shadow-sm bg-white">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          {product.name}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-center">
                            <Input
                              type="number"
                              value={product.quantity}
                              className="w-16 h-8 text-center"
                              min="1"
                            />
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-600">
                          {product.unit}
                        </TableCell>
                        <TableCell className="text-right font-medium text-gray-700">
                          {formatCurrency(product.price)}
                        </TableCell>
                        <TableCell className="text-right font-semibold text-primary">
                          {formatCurrency(product.price * product.quantity)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-center gap-1">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 hover:bg-red-50 hover:text-red-600"
                            >
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

        {/* Right Sidebar - Invoice Summary */}
        <SlideRightClient className="w-[380px]" />
      </div>
    </div>
  );
}
