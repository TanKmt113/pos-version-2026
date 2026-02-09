/**
 * Units Form Component
 * Form tái sử dụng cho Create và Edit Units
 */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Switch } from "@/components/ui/Switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { IItemFormData } from "../types";
import { useCreateItem } from "../hooks";
import { toast } from "sonner";
import { formatDateTime } from "@/shared/utils/useFormatDate";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import Link from "next/link";

export interface UnitsFormProps {
  /** Initial data cho edit mode */
  initialData?: IItemFormData;
  /** Mode: create hoặc edit */
  mode: "create" | "edit";
}

export function ItemsForm({ initialData, mode }: UnitsFormProps) {
  const router = useRouter();
  const { create, loading: creating } = useCreateItem();
  // const { update, loading: updating } = useUpdateUnit();

  // const loading = creating || updating;
  const loading = creating;

  const [formData, setFormData] = useState({
    itemCode: initialData?.itemCode || "",
    itemName: initialData?.itemName || "",
    foreignName: initialData?.foreignName || "",
    itemType: initialData?.itemType || "",
    isActive: initialData?.isActive ?? true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleCancel = () => {
    router.push("/products/units");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/products/units">
            <Button type="button" variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              {mode === "create" ? "Thêm đơn vị tính" : "Chỉnh sửa đơn vị tính"}
            </h1>
            <p className="text-muted-foreground">
              {mode === "create"
                ? "Tạo đơn vị tính mới trong hệ thống"
                : "Cập nhật thông tin đơn vị tính"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={loading}
          >
            Hủy
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Đang lưu...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Lưu
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Form Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin cơ bản</CardTitle>
              <CardDescription>
                Nhập thông tin chi tiết về đơn vị tính
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Mã đơn vị */}
              <div className="space-y-2">
                <Label htmlFor="uomCode">
                  Mã đơn vị tính <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="itemCode"
                  placeholder="VD: KG, M, L..."
                  value={formData.itemCode}
                  onChange={(e) =>
                    setFormData({ ...formData, itemCode: e.target.value })
                  }
                  disabled={loading || mode === "edit"}
                  required
                />
                {mode === "edit" && (
                  <p className="text-sm text-muted-foreground">
                    Mã đơn vị không thể thay đổi
                  </p>
                )}
              </div>

              {/* Tên đơn vị */}
              <div className="space-y-2">
                <Label htmlFor="itemName">
                  Tên đơn vị tính <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="itemName"
                  placeholder="VD: Kilogram, Mét, Lít..."
                  value={formData.itemName}
                  onChange={(e) =>
                    setFormData({ ...formData, itemName: e.target.value })
                  }
                  disabled={loading}
                  required
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Trạng thái</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="isActive">Hoạt động</Label>
                  <p className="text-sm text-muted-foreground">
                    Cho phép sử dụng đơn vị tính này
                  </p>
                </div>
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, isActive: checked })
                  }
                  disabled={loading}
                />
              </div>
            </CardContent>
          </Card>

          {mode === "edit" && initialData && (
            <Card>
              <CardHeader>
                <CardTitle>Thông tin khác</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <>content</>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </form>
  );
}
