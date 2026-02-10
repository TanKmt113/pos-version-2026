"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import { Switch } from "@/components/ui/Switch";
import { Textarea } from "@/components/ui/Textarea";
import { useItemById } from "../hooks/useDetailItem"; // Import useItemById
import { useSaveItem } from "../hooks/useSaveItem"; // Import useSaveItem

import { Button } from "@/components/ui/Button";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ItemDetail } from "../types"; // Import ItemDetail for type safety

export interface ItemsFormProps {
  itemId?: string; // Optional itemId for edit mode
  mode: "create" | "edit";
}

export function ItemsForm({ itemId, mode }: ItemsFormProps) {
  const router = useRouter();
  const { save, loading: saving } = useSaveItem();
  const {
    data: itemData,
    loading: fetching,
    error: fetchError,
  } = useItemById(itemId || null); // Fetch data if itemId is provided

  const loading = saving || fetching; // Combined loading state

  const [formData, setFormData] = useState<ItemDetail>({
    id: itemId || "",  
    itemCode: "",
    itemName: "",
    foreignName: "",
    itemType: "",
    unitOfMeasureGroupId: "",
    itemGroupId: "",
    itemCodePrefixId: "",
    freeText: "",
    manageBatchNumber: false,
    manageSerialNumber: false,
    priceManagementType: "",
    isSellable: true,
    isPurchasable: true,
    isOrderable: true,
    isExchangeable: true,
    hasWarranty: false,
    salePrice: 0,
    purchasePrice: 0,
    origin: "",
    manufacturer: "",
    manufactureYear: new Date().getFullYear(),
    isActive: true,
    createdAt: "",
    creator: "",
    updateDate: "",
    updator: "",
    barcodes: [],
    itemUoms: [],
    documents: [],
    unitOfMeasureGroupName: "",
    itemCodePrefixCode: "",
    itemCodePrefixName: "",
  });

  // Populate form data when itemData is fetched (for edit mode)
  useEffect(() => {
    if (mode === "edit" && itemData) {
      setFormData((prevData) => ({
        ...prevData,
        ...itemData,
        // Ensure priceManagementType is a string for RadioGroup
        priceManagementType: String(itemData.priceManagementType),
      }));
    }
  }, [itemData, mode]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSwitchChange = (id: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [id]: checked }));
  };

  const handleRadioChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const dataToSave = {
      ...formData,
      priceManagementType: Number(formData.priceManagementType),
    };

    const result = await save(itemId || null, dataToSave as any);
    if (result) {
      toast.success(
        mode === "create" ? "Tạo sản phẩm thành công" : "Cập nhật thành công",
      );
      router.push("/products/items");
    } else {
      toast.error(
        mode === "create" ? "Tạo sản phẩm thất bại" : "Cập nhật thất bại",
      );
    }
  };

  const handleCancel = () => {
    router.push("/products/items");
  };

  if (fetching) {
    return (
      <div className="flex min-h-[300px] items-center justify-center p-6">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
        <h3 className="text-lg font-semibold text-destructive">
          Lỗi tải dữ liệu
        </h3>
        <p className="text-sm text-muted-foreground">{fetchError}</p>
        <Button onClick={() => window.location.reload()} className="mt-4">
          Thử lại
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/products/items">
            <Button type="button" variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              {mode === "create" ? "Thêm sản phẩm" : "Chỉnh sửa sản phẩm"}
            </h1>
            <p className="text-muted-foreground">
              {mode === "create"
                ? "Tạo sản phẩm mới trong hệ thống"
                : "Cập nhật thông tin sản phẩm"}
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

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin cơ bản</CardTitle>
              <CardDescription>
                Thông tin nhận diện và phân loại sản phẩm.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="itemCode">Mã sản phẩm</Label>
                <Input
                  id="itemCode"
                  placeholder="Mã tự động nếu bỏ trống"
                  value={formData.itemCode}
                  onChange={handleInputChange}
                  disabled={loading || mode === "edit"}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="itemName">
                  Tên sản phẩm <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="itemName"
                  placeholder="Nhập tên sản phẩm"
                  value={formData.itemName}
                  onChange={handleInputChange}
                  disabled={loading}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="foreignName">Tên nước ngoài</Label>
                <Input
                  id="foreignName"
                  value={formData.foreignName}
                  onChange={handleInputChange}
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="itemGroupId">Nhóm sản phẩm</Label>
                <Input
                  id="itemGroupId"
                  placeholder="Chọn nhóm sản phẩm"
                  value={formData.itemGroupId}
                  onChange={handleInputChange}
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="unitOfMeasureGroupId">Nhóm đơn vị tính</Label>
                <Input
                  id="unitOfMeasureGroupId"
                  placeholder="Chọn nhóm ĐVT"
                  value={formData.unitOfMeasureGroupId}
                  onChange={handleInputChange}
                  disabled={loading}
                />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Giá sản phẩm</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="purchasePrice">Giá mua</Label>
                <Input
                  id="purchasePrice"
                  type="number"
                  value={formData.purchasePrice}
                  onChange={handleInputChange}
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="salePrice">Giá bán</Label>
                <Input
                  id="salePrice"
                  type="number"
                  value={formData.salePrice}
                  onChange={handleInputChange}
                  disabled={loading}
                />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Thông tin bổ sung</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="origin">Xuất xứ</Label>
                <Input
                  id="origin"
                  value={formData.origin}
                  onChange={handleInputChange}
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="manufacturer">Nhà sản xuất</Label>
                <Input
                  id="manufacturer"
                  value={formData.manufacturer}
                  onChange={handleInputChange}
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="manufactureYear">Năm sản xuất</Label>
                <Input
                  id="manufactureYear"
                  type="number"
                  value={formData.manufactureYear}
                  onChange={handleInputChange}
                  disabled={loading}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="freeText">Mô tả</Label>
                <Textarea
                  id="freeText"
                  placeholder="Mô tả chi tiết về sản phẩm"
                  value={formData.freeText}
                  onChange={handleInputChange}
                  disabled={loading}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6 lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Trạng thái</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Label htmlFor="isActive" className="cursor-pointer">
                  Kinh doanh
                </Label>
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(c) => handleSwitchChange("isActive", c)}
                  disabled={loading}
                />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Thuộc tính</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { id: "isSellable", label: "Được bán" },
                { id: "isPurchasable", label: "Được mua" },
                { id: "isOrderable", label: "Hàng đặt" },
                { id: "isExchangeable", label: "Được đổi trả" },
                { id: "hasWarranty", label: "Có bảo hành" },
              ].map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between"
                >
                  <Label htmlFor={item.id} className="cursor-pointer">
                    {item.label}
                  </Label>
                  <Switch
                    id={item.id}
                    checked={
                      formData[item.id as keyof typeof formData] as boolean
                    }
                    onCheckedChange={(c) => handleSwitchChange(item.id, c)}
                    disabled={loading}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Quản lý</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="manageSerialNumber" className="cursor-pointer">
                  Quản lý Serial
                </Label>
                <Switch
                  id="manageSerialNumber"
                  checked={formData.manageSerialNumber}
                  onCheckedChange={(c) =>
                    handleSwitchChange("manageSerialNumber", c)
                  }
                  disabled={loading}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="manageBatchNumber" className="cursor-pointer">
                  Quản lý theo lô
                </Label>
                <Switch
                  id="manageBatchNumber"
                  checked={formData.manageBatchNumber}
                  onCheckedChange={(c) =>
                    handleSwitchChange("manageBatchNumber", c)
                  }
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <Label>Quản lý giá vốn</Label>
                {/* <RadioGroup
                  defaultValue={String(formData.priceManagementType)}
                  onValueChange={(v) =>
                    setFormData((p) => ({ ...p, priceManagementType: Number(v) }))
                  }
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="0" id="pmt-0" />
                    <Label htmlFor="pmt-0">Giá TB di động</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1" id="pmt-1" />
                    <Label htmlFor="pmt-1">Giá đích danh</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="2" id="pmt-2" />
                    <Label htmlFor="pmt-2">Nhập trước, Xuất trước</Label>
                  </div>
                </RadioGroup> */}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
}
