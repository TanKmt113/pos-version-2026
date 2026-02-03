'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar"
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

// Fake data cho users
const fakeUsers = [
  {
    id: "1",
    name: "Nguyễn Văn An",
    email: "nguyenvanan@email.com",
    phone: "0901234567",
    role: "Admin",
    status: "active",
    avatar: "",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Trần Thị Bình",
    email: "tranthib@email.com",
    phone: "0912345678",
    role: "Nhân viên bán hàng",
    status: "active",
    avatar: "",
    createdAt: "2024-02-20",
  },
  {
    id: "3",
    name: "Lê Văn Cường",
    email: "levancuong@email.com",
    phone: "0923456789",
    role: "Quản lý kho",
    status: "inactive",
    avatar: "",
    createdAt: "2024-03-10",
  },
  {
    id: "4",
    name: "Phạm Thị Dung",
    email: "phamthidung@email.com",
    phone: "0934567890",
    role: "Kế toán",
    status: "active",
    avatar: "",
    createdAt: "2024-04-05",
  },
  {
    id: "5",
    name: "Hoàng Văn Em",
    email: "hoangvanem@email.com",
    phone: "0945678901",
    role: "Nhân viên bán hàng",
    status: "pending",
    avatar: "",
    createdAt: "2024-05-12",
  },
  {
    id: "6",
    name: "Võ Thị Phương",
    email: "vothiphuong@email.com",
    phone: "0956789012",
    role: "Nhân viên bán hàng",
    status: "active",
    avatar: "",
    createdAt: "2024-06-18",
  },
  {
    id: "7",
    name: "Đặng Văn Giang",
    email: "dangvangiang@email.com",
    phone: "0967890123",
    role: "Admin",
    status: "active",
    avatar: "",
    createdAt: "2024-07-22",
  },
  {
    id: "8",
    name: "Bùi Thị Hạnh",
    email: "buithihanh@email.com",
    phone: "0978901234",
    role: "Quản lý kho",
    status: "inactive",
    avatar: "",
    createdAt: "2024-08-30",
  },
]

// Helper function lấy initials từ tên
function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

// Helper function lấy màu badge theo status
function getStatusBadge(status: string) {
  switch (status) {
    case "active":
      return <Badge variant="default" className="bg-green-500 hover:bg-green-600">Hoạt động</Badge>
    case "inactive":
      return <Badge variant="secondary">Ngừng hoạt động</Badge>
    case "pending":
      return <Badge variant="outline" className="border-yellow-500 text-yellow-600">Chờ duyệt</Badge>
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

export function UserTable() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox />
            </TableHead>
            <TableHead className="w-[250px]">Người dùng</TableHead>
            <TableHead>Số điện thoại</TableHead>
            <TableHead>Vai trò</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Ngày tạo</TableHead>
            <TableHead className="w-[80px] text-right">Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fakeUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-primary/10 text-primary text-sm">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-medium">{user.name}</span>
                    <span className="text-sm text-muted-foreground">{user.email}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>
                <Badge variant="outline">{user.role}</Badge>
              </TableCell>
              <TableCell>{getStatusBadge(user.status)}</TableCell>
              <TableCell className="text-muted-foreground">
                {new Date(user.createdAt).toLocaleDateString("vi-VN")}
              </TableCell>
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
                      Xóa người dùng
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