/**
 * Units DataList Component
 * Ví dụ sử dụng Generic DataTable cho Units
 */

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/ui/DataTable";
import {
  DataTableActions,
  createDefaultActions,
} from "@/components/ui/DataTableActions";
import type { DataTableColumn } from "@/shared/types/dataTable";
import { UnitOfMeasures } from "../types";
import { Badge } from "@/components/ui/Badge";
import { DeleteConfirmDialog } from "@/components/ui/DeleteConfirmDialog";
import { toast } from "sonner";
import { formatDate } from "@/shared/utils/useFormatDate";
import { useUnits, useDeleteUnit } from "../hooks";

interface DataListUnitsProps {
  searchTerm?: string;
  statusFilter?: string;
}

export default function DataListUnits({
  searchTerm = "",
  statusFilter = "all",
}: DataListUnitsProps) {
  const router = useRouter();
  const [selectedRows, setSelectedRows] = useState<UnitOfMeasures[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<UnitOfMeasures | null>(null);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Use hooks for data fetching and delete
  const { data, loading, error, refetch, setPage, currentPage } = useUnits({
    pageSize: 20,
    searchTerm: debouncedSearchTerm,
    isActive: statusFilter,
  });

  const { deleteUnit, loading: deleting } = useDeleteUnit();

  // Show error toast if any
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  // Column definitions
  const columns: DataTableColumn<UnitOfMeasures>[] = [
    {
      key: "uomCode",
      header: "Mã đơn vị",
      width: "w-[150px]",
      accessor: (row) => row.uomCode,
    },
    {
      key: "uomName",
      header: "Tên đơn vị",
      accessor: (row) => row.uomName,
    },
    {
      key: "isActive",
      header: "Trạng thái",
      width: "w-[120px]",
      render: (row) => (
        <Badge variant={row.isActive ? "success" : "secondary"}>
          {row.isActive ? "Hoạt động" : "Không hoạt động"}
        </Badge>
      ),
    },
    {
      key: "createdAt",
      header: "Ngày tạo",
      width: "w-[150px]",
      render: (row) => (
        <span className="text-muted-foreground">
          {formatDate(row.createdAt)}
        </span>
      ),
    },
    {
      key: "creator",
      header: "Người tạo",
      width: "w-[150px]",
      accessor: (row) => row.creator,
    },
  ];

  // Handle edit
  const handleEdit = (row: UnitOfMeasures) => {
    router.push(`/products/units/${row.id}`);
  };

  // Handle delete
  const handleDelete = (row: UnitOfMeasures) => {
    setItemToDelete(row);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;

    const success = await deleteUnit(itemToDelete.id);
    if (success) {
      toast.success(`Đã xóa "${itemToDelete.uomName}" thành công`);
      setDeleteDialogOpen(false);
      setItemToDelete(null);
      refetch();
      router.refresh();
    }
  };

  // Render actions
  const renderActions = (row: UnitOfMeasures) => (
    <DataTableActions
      row={row}
      actions={createDefaultActions({
        onEdit: handleEdit,
        onDelete: handleDelete,
      })}
    />
  );

  return (
    <>
      <DataTable
        data={data?.items || []}
        columns={columns}
        loading={loading}
        emptyMessage="Không có đơn vị tính nào"
        selectable
        selectedRows={selectedRows}
        onSelectionChange={setSelectedRows}
        getRowKey={(row) => row.id}
        renderActions={renderActions}
        pagination={
          data
            ? {
                pageIndex: data.pageIndex,
                pageSize: data.pageSize,
                totalCount: data.totalCount,
                totalPages: data.totalPages,
                hasNextPage: data.hasNextPage,
                hasPreviousPage: data.hasPreviousPage,
                onPageChange: setPage,
              }
            : undefined
        }
        onRowClick={(row) => console.log("Row clicked:", row)}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        itemName={itemToDelete?.uomName || ""}
        entityType="đơn vị tính"
        onConfirm={confirmDelete}
        isDeleting={deleting}
      />
    </>
  );
}
