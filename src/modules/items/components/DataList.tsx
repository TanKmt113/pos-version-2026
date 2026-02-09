/**
 * Units DataList Component
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
import { IProduct } from "../types";
import { Badge } from "@/components/ui/Badge";
import { toast } from "sonner";
import { formatDate } from "@/shared/utils/useFormatDate";
import { useItems } from "../hooks";

interface DataListUnitsProps {
  searchTerm?: string;
  statusFilter?: string;
}

export default function DataListUnits({
  searchTerm = "",
  statusFilter = "all",
}: DataListUnitsProps) {
  const router = useRouter();
  const [selectedRows, setSelectedRows] = useState<IProduct[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<IProduct | null>(null);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Use hooks for data fetching and delete
  const { data, loading, error, refetch, setPage, currentPage } = useItems({
    pageSize: 20,
    searchTerm: debouncedSearchTerm,
    isActive: statusFilter,
  });

  // Show error toast if any
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  // Column definitions
  const columns: DataTableColumn<IProduct>[] = [
    {
      key: "itemCode",
      header: "Mã hàng",
      width: "w-[150px]",
    },
    {
      key: "itemName",
      header: "Tên hàng",
      width: "w-[200px]",
    },
    {
      key: "foreignName",
      header: "Tên nước ngoài",
      width: "w-[200px]",
    },
    {
      key: "itemType",
      header: "Loại hàng",
      width: "w-[120px]",
    },
    {
      key: "isActive",
      header: "Trạng thái",
      width: "w-[120px]",
    },
    {
      key: "isSellable",
      header: "Được bán",
      width: "w-[100px]",
    },
    {
      key: "isPurchasable",
      header: "Được mua",
      width: "w-[100px]",
    },
    {
      key: "salePrice",
      header: "Giá bán",
      width: "w-[120px]",
    },
    {
      key: "createdAt",
      header: "Ngày tạo",
      width: "w-[180px]",
    },
    {
      key: "creator",
      header: "Người tạo",
      width: "w-[150px]",
    },
  ];

  // Handle edit
  const handleEdit = (row: IProduct) => {
    router.push(`/products/units/${row.id}`);
  };

  // Handle delete
  const handleDelete = (row: IProduct) => {
    setItemToDelete(row);
    setDeleteDialogOpen(true);
  };

  const renderActions = (row: IProduct) => (
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
        emptyMessage="Không có sản phẩm nào"
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
    </>
  );
}
