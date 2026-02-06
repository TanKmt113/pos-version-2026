'use client'

import { BranchTable } from "@/components/branch/BranchTable"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select"
import { Download, Plus, Search, Upload } from "lucide-react"
import Link from "next/link"

export default function StoreSetupPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Quản lý chi nhánh</h1>
          <p className="text-muted-foreground">
            Quản lý danh sách cửa hàng, chi nhánh trong hệ thống
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Upload className="mr-2 h-4 w-4" />
            Import
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Link href="/system/store-setup/create">
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Thêm chi nhánh
            </Button>
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 rounded-lg border bg-card p-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm theo mã, tên chi nhánh, địa chỉ..."
            className="pl-9"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả trạng thái</SelectItem>
              <SelectItem value="active">Hoạt động</SelectItem>
              <SelectItem value="inactive">Ngừng hoạt động</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <BranchTable />

      {/* Pagination Info */}
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          Hiển thị <span className="font-medium">1-5</span> trong tổng số{" "}
          <span className="font-medium">5</span> chi nhánh
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            Trước
          </Button>
          <Button variant="outline" size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
            1
          </Button>
          <Button variant="outline" size="sm" disabled>
            Sau
          </Button>
        </div>
      </div>
    </div>
  )
}