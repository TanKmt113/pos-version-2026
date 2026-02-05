"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/Input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Search } from "lucide-react";
import { IProduct } from "@/modules/items/types";

type Props = {
  products: IProduct[];
  columns: Record<string, boolean>;
};

export default function ProductsList({ products, columns }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return products;
    return products.filter(
      (p) => p.itemName.toLowerCase().includes(q) || p.itemCode.toLowerCase().includes(q),
    );
  }, [products, searchQuery]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const pageData = filtered.slice((page - 1) * pageSize, page * pageSize);

  function toggleExpand(id: string) {
    setExpandedId((prev) => (prev === id ? null : id));
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle>Danh sách sản phẩm</CardTitle>
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Tìm kiếm theo mã, tên sản phẩm" className="pl-8" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                {columns.code && <TableHead className="w-36">Mã Sản phẩm</TableHead>}
                {columns.name && <TableHead>Tên sản phẩm</TableHead>}
                {columns.unit && <TableHead className="w-24">Đơn vị tính</TableHead>}
                {columns.line && <TableHead>Dòng sản phẩm</TableHead>}
                {columns.group1 && <TableHead>Nhóm sản phẩm 1</TableHead>}
                {columns.group2 && <TableHead>Nhóm sản phẩm 2</TableHead>}
                {columns.status && <TableHead className="w-40">Trạng thái</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {pageData.map((p) => {
                const colsCount = Object.values(columns).filter(Boolean).length;
                return [
                  <TableRow key={p.id} className="cursor-pointer" onClick={() => toggleExpand(p.id)}>
                    {columns.code && <TableCell className="font-mono">{p.itemCode}</TableCell>}
                    {columns.name && <TableCell>{p.itemName}</TableCell>}
                    {columns.unit && <TableCell>{p.itemType ?? "-"}</TableCell>}
                    {columns.line && <TableCell>{p.foreignName ?? "-"}</TableCell>}
                    {columns.group1 && <TableCell>{p.creator ?? "-"}</TableCell>}
                    {columns.group2 && <TableCell>{p.createdAt ?? "-"}</TableCell>}
                    {columns.status && <TableCell className="text-center">{p.isActive ? "Hoạt động" : "Không hoạt động"}</TableCell>}
                  </TableRow>,
                  expandedId === p.id ? (
                    <TableRow key={`${p.id}-detail`}>
                      <TableCell colSpan={colsCount} className="bg-gray-50">
                        <div className="p-4">
                          <div className="text-sm font-medium">Chi tiết sản phẩm</div>
                          <div className="text-sm text-muted-foreground mt-2">
                            Mã: {p.itemCode} — Tên: {p.itemName} — Dòng: {p.foreignName} — Giá bán: {p.salePrice}
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : null,
                ];
              })}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-muted-foreground">Hiển thị {pageData.length} trên {total} kết quả</div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 border rounded" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>Prev</button>
            <div className="px-3 py-1">{page} / {totalPages}</div>
            <button className="px-3 py-1 border rounded" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>Next</button>
            <select value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }} className="ml-2 border rounded px-2 py-1">
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
