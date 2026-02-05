"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Plus } from "lucide-react";
import { Checkbox } from "@/components/ui/Checkbox";
import ProductsList from "./component";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { Label } from "@/components/ui/Label";
import { IProduct } from "@/modules/items/types";
import { useItems } from "@/modules/items/hooks/useItems";
const DUMMY_PRODUCTS: IProduct[] = [];

export default function ProductPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);

  // const { getItems, isLoading } = useItems();

  // getItems({ $top: 10 })
  
  const [selectedColumns, setSelectedColumns] = useState<
    Record<string, boolean>
  >({
    code: true,
    name: true,
    unit: true,
    line: true,
    group1: true,
    group2: true,
    status: true,
  });

  const [exportCount, setExportCount] = useState<number>(10);

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Danh mục hàng hóa
            </h1>
            <p className="text-muted-foreground mt-1">
              Quản lý danh mục hàng hóa trong hệ thống
            </p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <div className="flex items-center gap-2">
              <DialogTrigger asChild>
                <Button size="sm" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Thêm sản phẩm
                </Button>
              </DialogTrigger>

              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsFilterOpen(true)}
              >
                Filter
              </Button>

              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsExportOpen(true)}
              >
                Xuất Excel
              </Button>
            </div>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Thêm sản phẩm mới</DialogTitle>
                <DialogDescription>
                  Thêm sản phẩm vào danh mục
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="code">Mã sản phẩm</Label>
                    <Input id="code" placeholder="VD: HH00000199" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">Tên sản phẩm</Label>
                    <Input id="name" placeholder="VD: Vòng bạc 999" />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Hủy
                </Button>
                <Button onClick={() => setIsDialogOpen(false)}>Thêm</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* <ProductsList products={DUMMY_PRODUCTS || []} columns={selectedColumns} /> */}

        {/* Filter dialog for columns */}
        <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Chọn cột hiển thị</DialogTitle>
              <DialogDescription>
                Chọn các cột muốn hiển thị trong bảng
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-3 py-4">
              {Object.keys(selectedColumns).map((key) => (
                <label key={key} className="flex items-center gap-2">
                  <Checkbox
                    checked={selectedColumns[key]}
                    onCheckedChange={(v) =>
                      setSelectedColumns((s) => ({ ...s, [key]: !!v }))
                    }
                  />
                  <span className="capitalize">{key}</span>
                </label>
              ))}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsFilterOpen(false)}>
                Đóng
              </Button>
              <Button onClick={() => setIsFilterOpen(false)}>Áp dụng</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Export dialog */}
        <Dialog open={isExportOpen} onOpenChange={setIsExportOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Xuất Excel</DialogTitle>
              <DialogDescription>
                Nhập số lượng bản ghi muốn xuất
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Label htmlFor="count">Số bản ghi</Label>
              <Input
                id="count"
                type="number"
                value={exportCount}
                onChange={(e) => setExportCount(Number(e.target.value))}
                className="w-36 mt-2"
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsExportOpen(false)}>
                Hủy
              </Button>
              <Button
                onClick={() => {
                  setIsExportOpen(false);
                  alert(`Xuất ${exportCount} bản ghi (demo)`);
                }}
              >
                Xuất
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
