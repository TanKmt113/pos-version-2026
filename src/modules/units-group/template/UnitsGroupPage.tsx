'use client'

import { Button } from "@/components/ui/Button"
import { DataTableFilters } from "@/components/ui/DataTableFilters"
import { DataTableHeader } from "@/components/ui/DataTableHeader"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select"
import { Download, Plus, Upload } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import DataListUnitsGrp from "../components/DataList"

export default function UnitsGroupPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  return (
    <div className="flex flex-col gap-6 p-6">
      <DataTableHeader title="Quản lý nhóm đơn vị tính"
        description="Quản lý danh sách đơn vị tính trong hệ thống"
        actions={
          <>
             <Button variant="outline" size="sm">
              <Upload  className="mr-2 h-4 w-4" />
              Import
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Link href="/products/unit-group/create">
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Thêm nhóm đơn vị tính
              </Button>
            </Link>
          </>
      }>

      </DataTableHeader>
      {/* Filters */}
      <DataTableFilters
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        config={{
          searchPlaceholder: 'Tìm kiếm theo mã, tên đơn vị tính...',
          customFilters: (
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="active">Hoạt động</SelectItem>
                <SelectItem value="inactive">Ngừng hoạt động</SelectItem>
              </SelectContent>
            </Select>
          ),
        }}
      />
      {/* Data List */}
      {/* <DataListUnitsGrp searchTerm={searchTerm} statusFilter={statusFilter}></DataListUnitsGrp> */}
    </div>
  )
}