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
import { uomService } from "../services/unitsService";
import { PagedResult } from "@/shared/types/api";
import { Badge } from "@/components/ui/Badge";
import { DeleteConfirmDialog } from "@/components/ui/DeleteConfirmDialog";
import { toast } from "sonner";
import { formatDate } from "@/shared/utils/useFormatDate";

interface DataListUnitsProps {
  searchTerm?: string;
  statusFilter?: string;
}

export default function DataListUnits({
  searchTerm = "",
  statusFilter = "all",
}: DataListUnitsProps) {
  const router = useRouter();
  const [data, setData] = useState<PagedResult<UnitOfMeasures> | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState<UnitOfMeasures[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<UnitOfMeasures | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const pageSize = 20;

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      // Reset về trang 1 khi search
      if (searchTerm !== debouncedSearchTerm) {
        setCurrentPage(1);
      }
    }, 500); // 500ms delay

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Reset page khi filter thay đổi
  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter]);

  // Load data
  const loadData = async (page: number) => {
    setLoading(true);
    try {
      const result = await uomService.getAll(page, pageSize, {
        searchTerm: debouncedSearchTerm,
        isActive: statusFilter,
      });
      setData(result);
    } catch (error) {
      toast.error("Không thể tải dữ liệu");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(currentPage);
  }, [currentPage, debouncedSearchTerm, statusFilter]);

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

    setDeleting(true);
    try {
      await uomService.delete(itemToDelete.id);
      toast.success(`Đã xóa "${itemToDelete.uomName}" thành công`);
      setDeleteDialogOpen(false);
      setItemToDelete(null);
      loadData(currentPage);
      router.refresh();
    } catch (error: any) {
      let errorMessage = "Không thể xóa đơn vị tính";
      if (error?.error) {
        errorMessage = error.error;
      } else if (error?.message) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      }
      toast.error(errorMessage);
    } finally {
      setDeleting(false);
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
                onPageChange: setCurrentPage,
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
