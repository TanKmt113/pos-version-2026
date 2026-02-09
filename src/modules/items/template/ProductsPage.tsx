"use client";
/**
 * Units Page Component
 * Màn hình quản lý sản phẩm
 */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { DataTableHeader } from "@/components/ui/DataTableHeader";
import { DataTableFilters } from "@/components/ui/DataTableFilters";
import DataListUnits from "../components/DataList";
import { Download, Plus, Upload } from "lucide-react";
import Link from "next/link";

export default function ProductsList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Page Header */}
      <DataTableHeader
        title="Quản lý sản phẩm"
        description="Quản lý danh sách sản phẩm trong hệ thống"
        actions={
          <>
            <Button variant="outline" size="sm">
              <Upload className="mr-2 h-4 w-4" />
              Import
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Link href="/products/units/create">
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Thêm sản phẩm
              </Button>
            </Link>
          </>
        }
      />

      {/* Filters */}
      <DataTableFilters
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        config={{
          searchPlaceholder: "Tìm kiếm theo mã, tên sản phẩm...",
          customFilters: (
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="active">Còn tồn</SelectItem>
                <SelectItem value="inactive">Hết hàng</SelectItem>
              </SelectContent>
            </Select>
          ),
        }}
      />

      {/* Data List */}
      <DataListUnits searchTerm={searchTerm} statusFilter={statusFilter} />
    </div>
  );
}
