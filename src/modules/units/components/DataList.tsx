/**
 * Units DataList Component
 * Ví dụ sử dụng Generic DataTable cho Units
 */

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DataTable } from '@/components/ui/DataTable';
import { DataTableActions, createDefaultActions } from '@/components/ui/DataTableActions';
import type { DataTableColumn } from '@/shared/types/dataTable';
import { UnitOfMeasures } from '../types';
import { uomService } from '../services/unitsService';
import { PagedResult } from '@/shared/types/api';
import { Badge } from '@/components/ui/Badge';
import { toast } from 'sonner';
import { useMemo } from 'react';

interface DataListUnitsProps {
  searchTerm?: string;
  statusFilter?: string;
}

export default function DataListUnits({ searchTerm = '', statusFilter = 'all' }: DataListUnitsProps) {
  const router = useRouter();
  const [data, setData] = useState<PagedResult<UnitOfMeasures> | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState<UnitOfMeasures[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;

  // Load data
  const loadData = async (page: number) => {
    setLoading(true);
    try {
      const result = await uomService.getAll(page, pageSize);
      setData(result);
    } catch (error) {
      toast.error('Không thể tải dữ liệu');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(currentPage);
  }, [currentPage]);

  // Apply filters
  const filteredData = useMemo(() => {
    if (!data?.items) return [];
    
    return data.items.filter((unit) => {
      const matchSearch =
        unit.uomCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        unit.uomName.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchStatus =
        statusFilter === 'all' ||
        (statusFilter === 'active' && unit.isActive) ||
        (statusFilter === 'inactive' && !unit.isActive);
      
      return matchSearch && matchStatus;
    });
  }, [data?.items, searchTerm, statusFilter]);

  // Column definitions
  const columns: DataTableColumn<UnitOfMeasures>[] = [
    {
      key: 'uomCode',
      header: 'Mã đơn vị',
      width: 'w-[150px]',
      accessor: (row) => row.uomCode,
    },
    {
      key: 'uomName',
      header: 'Tên đơn vị',
      accessor: (row) => row.uomName,
    },
    {
      key: 'isActive',
      header: 'Trạng thái',
      width: 'w-[120px]',
      render: (row) => (
        <Badge variant={row.isActive ? 'success' : 'secondary'}>
          {row.isActive ? 'Hoạt động' : 'Không hoạt động'}
        </Badge>
      ),
    },
    {
      key: 'createdAt',
      header: 'Ngày tạo',
      width: 'w-[150px]',
      render: (row) => (
        <span className="text-muted-foreground">
          {new Date(row.createdAt).toLocaleDateString('vi-VN')}
        </span>
      ),
    },
    {
      key: 'creator',
      header: 'Người tạo',
      width: 'w-[150px]',
      accessor: (row) => row.creator,
    },
  ];

  // Handle edit
  const handleEdit = (row: UnitOfMeasures) => {
    router.push(`/products/units/${row.id}`);
  };

  // Handle delete
  const handleDelete = async (row: UnitOfMeasures) => {
    if (confirm('Bạn có chắc chắn muốn xóa?')) {
      try {
        await uomService.delete(row.id);
        toast.success('Xóa thành công');
        loadData(currentPage);
        router.refresh();
      } catch (error) {
        toast.error('Không thể xóa');
      }
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
    <DataTable
      data={filteredData}
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
      onRowClick={(row) => console.log('Row clicked:', row)}
    />
  );
}
