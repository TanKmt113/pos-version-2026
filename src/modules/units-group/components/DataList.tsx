'use client'

import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useUnitsGroup } from "../hooks"
import useDeleteUnitGrp from "../hooks/useDeleteUnitGrp"
import { toast } from "sonner"
import { DataTable } from "@/components/ui/DataTable"
import { Badge } from "@/components/ui/Badge"
import { formatDate } from "@/shared/utils/useFormatDate"

interface DataListUnitsGrpProps {
  searchTerm?: string,
  statusFilter ?: string
}

export default function DataListUnitsGrp({
  searchTerm = "",
  statusFilter = "all"
}: DataListUnitsGrpProps) {
  const router = useRouter()
  const [selectedRows, setSelectedRows] = useState([])
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [itemToDelete, setItemToDelete] = useState(null)
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
    }, 500)
    return () => clearTimeout(timer)
  }, [searchTerm])
  const { data, loading, error, refetch, setPage, currentPage } = useUnitsGroup({ pageSize: 20, searchTerm: debouncedSearchTerm, isActive: statusFilter });
  // const { deleteUnitGrp, loading: deleting } = useDeleteUnitGrp();

  useEffect(() => {
    if (error) {
      toast.error(error)
    }
  }, [error])

  // Column
  const columns: any = [
     {
      key: "uomCode",
      header: "Mã đơn vị",
      width: "w-[150px]",
      accessor: (row : any) => row.uomCode,
    },
    {
      key: "uomName",
      header: "Tên đơn vị",
      accessor: (row  : any) => row.uomName,
    },
    {
      key: "isActive",
      header: "Trạng thái",
      width: "w-[120px]",
      render: (row  : any) => (
        <Badge variant={row.isActive ? "success" : "secondary"}>
          {row.isActive ? "Hoạt động" : "Không hoạt động"}
        </Badge>
      ),
    },
    {
      key: "createdAt",
      header: "Ngày tạo",
      width: "w-[150px]",
      render: (row  : any) => (
        <span className="text-muted-foreground">
          {formatDate(row.createdAt)}
        </span>
      ),
    },
    {
      key: "creator",
      header: "Người tạo",
      width: "w-[150px]",
      accessor: (row  : any) => row.creator,
    },
  ]
  return (
    <>
      <DataTable
        data={[]}
        columns={columns}
        loading={loading}
        emptyMessage="Không có nhóm đơn vị tính nào"
        selectable
        selectedRows={selectedRows}
        onSelectionChange={setSelectedRows}
        getRowKey={(row) => row}

      >

      </DataTable>
    </>
  )
}