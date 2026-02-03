"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { Separator } from "../ui/Separator";
import { Input } from "../ui/Input";
import {
  CreditCard,
  Wallet,
  Receipt,
  User,
  Calendar,
  Tag,
  DollarSign,
  Save,
  Printer,
} from "lucide-react";

interface SlideRightClientProps {
  className?: string;
}

export const SlideRightClient = ({ className = "" }: SlideRightClientProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  // Sample data
  const subtotal = 575000000;
  const discount = 0;
  const tax = subtotal * 0.1;
  const total = subtotal - discount + tax;

  return (
    <Card className={`shadow-lg border-none ${className}`}>
      <CardHeader className="bg-gradient-to-r from-primary to-primary/90 text-white">
        <CardTitle className="flex items-center gap-2">
          <Receipt className="h-5 w-5" />
          Thông tin hóa đơn
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Customer Info */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <User className="h-4 w-4" />
            Thông tin khách hàng
          </div>
          <div className="space-y-2">
            <Input
              placeholder="Tên khách hàng"
              className="h-9 bg-gray-50 border-gray-200"
            />
            <Input
              placeholder="Số điện thoại"
              className="h-9 bg-gray-50 border-gray-200"
            />
          </div>
        </div>

        <Separator />

        {/* Invoice Details */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <Calendar className="h-4 w-4" />
            Chi tiết
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Mã hóa đơn:</span>
              <Badge variant="outline" className="font-mono">
                HD{Date.now().toString().slice(-6)}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Ngày tạo:</span>
              <span className="font-medium">
                {new Date().toLocaleDateString("vi-VN")}
              </span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Price Summary */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <DollarSign className="h-4 w-4" />
            Tổng thanh toán
          </div>
          
          <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Tạm tính:</span>
              <span className="font-medium">{formatCurrency(subtotal)}</span>
            </div>
            
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Giảm giá:</span>
                <Tag className="h-3 w-3 text-green-600" />
              </div>
              <span className="font-medium text-green-600">
                -{formatCurrency(discount)}
              </span>
            </div>
            
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Thuế VAT (10%):</span>
              <span className="font-medium">{formatCurrency(tax)}</span>
            </div>
            
            <Separator />
            
            <div className="flex justify-between items-center">
              <span className="text-base font-bold text-gray-800">
                Tổng cộng:
              </span>
              <span className="text-2xl font-bold text-primary">
                {formatCurrency(total)}
              </span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Payment Method */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <CreditCard className="h-4 w-4" />
            Phương thức thanh toán
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              className="h-20 flex-col gap-2 hover:bg-primary hover:text-white transition-all"
            >
              <Wallet className="h-5 w-5" />
              <span className="text-xs">Tiền mặt</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col gap-2 hover:bg-primary hover:text-white transition-all"
            >
              <CreditCard className="h-5 w-5" />
              <span className="text-xs">Chuyển khoản</span>
            </Button>
          </div>
        </div>

        <Separator />

        {/* Action Buttons */}
        <div className="space-y-2">
          <Button className="w-full h-11 bg-green-600 hover:bg-green-700 gap-2">
            <Save className="h-4 w-4" />
            Lưu hóa đơn
          </Button>
          <Button
            variant="outline"
            className="w-full h-11 gap-2 hover:bg-gray-50"
          >
            <Printer className="h-4 w-4" />
            In hóa đơn
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
