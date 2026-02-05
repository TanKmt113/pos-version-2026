'use client'

import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { Checkbox } from "@/components/ui/Checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table"
import { Edit, Eye, MoreHorizontal, Trash2 } from "lucide-react"

// Fake data cho chi nhánh
const fakeBranches = [
  {
    id: "1",
    code: "CN001",
    name: "Chi nhánh Quận 1",
    address: "123 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP.HCM",
    phone: "028 1234 5678",
    timezone: "Asia/Ho_Chi_Minh (GMT+7)",
    status: "active",
  },
  {
    id: "2",
    code: "CN002",
    name: "Chi nhánh Quận 7",
    address: "456 Nguyễn Văn Linh, Phường Tân Phong, Quận 7, TP.HCM",
    phone: "028 2345 6789",
    timezone: "Asia/Ho_Chi_Minh (GMT+7)",
    status: "active",
  },
  {
    id: "3",
    code: "CN003",
    name: "Chi nhánh Hà Nội",
    address: "789 Phố Huế, Quận Hai Bà Trưng, Hà Nội",
    phone: "024 3456 7890",
    timezone: "Asia/Ho_Chi_Minh (GMT+7)",
    status: "inactive",
  },
  {
    id: "4",
    code: "CN004",
    name: "Chi nhánh Đà Nẵng",
    address: "321 Trần Phú, Quận Hải Châu, Đà Nẵng",
    phone: "0236 4567 890",
    timezone: "Asia/Ho_Chi_Minh (GMT+7)",
    status: "active",
  },
  {
    id: "5",
    code: "CN005",
    name: "Chi nhánh Cần Thơ",
    address: "654 Đường 30/4, Quận Ninh Kiều, Cần Thơ",
    phone: "0292 5678 901",
    timezone: "Asia/Ho_Chi_Minh (GMT+7)",
    status: "active",
  },
]

// Helper function lấy màu badge theo status
function getStatusBadge(status: string) {
  switch (status) {
    case "active":
      return <Badge variant="default" className="bg-green-500 hover:bg-green-600">Hoạt động</Badge>
    case "inactive":
      return <Badge variant="secondary">Ngừng hoạt động</Badge>
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

export function BranchTable() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox />
            </TableHead>
            <TableHead className="w-[140px]">Mã chi nhánh</TableHead>
            <TableHead className="w-[200px]">Tên chi nhánh</TableHead>
            <TableHead>Địa chỉ</TableHead>
            <TableHead className="w-[140px]">Điện thoại</TableHead>
            <TableHead className="w-[200px]">Múi giờ</TableHead>
            <TableHead className="w-[200px]">Trạng thái</TableHead>
            <TableHead className="w-[100px] text-right">Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fakeBranches.map((branch) => (
            <TableRow key={branch.id}>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>
                <span className="font-mono font-medium text-primary">{branch.code}</span>
              </TableCell>
              <TableCell>
                <span className="font-medium">{branch.name}</span>
              </TableCell>
              <TableCell>
                <span className="text-muted-foreground">{branch.address}</span>
              </TableCell>
              <TableCell>{branch.phone}</TableCell>
              <TableCell>
                <span className="text-sm text-muted-foreground">{branch.timezone}</span>
              </TableCell>
              <TableCell>{getStatusBadge(branch.status)}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Mở menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      Xem chi tiết
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Chỉnh sửa
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive focus:text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Xóa chi nhánh
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}