'use client'

import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select"
import { Textarea } from "@/components/ui/Textarea"
import { User } from "@/modules/user/types"
import { ArrowLeft, Loader2, Save } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

type Props = {
  initialData?: Partial<User>
  mode?: 'create' | 'edit'
  onSubmit: (data: Partial<User>) => Promise<void>
}

export function UserForm({ initialData, mode = 'create', onSubmit }: Props) {
  const router = useRouter()
  const [form, setForm] = useState<Partial<User>>({
    name: "",
    email: "",
    phone: "",
    role: "",
    status: "active",
    address: "",
    note: "",
    ...initialData
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const isEdit = mode === "edit"

  function validateForm() {
    const newErrors: Record<string, string> = {}

    if (!form.name?.trim()) {
      newErrors.name = "Vui lòng nhập họ tên"
    }

    if (!form.email?.trim()) {
      newErrors.email = "Vui lòng nhập email"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Email không hợp lệ"
    }

    if (!form.phone?.trim()) {
      newErrors.phone = "Vui lòng nhập số điện thoại"
    } else if (!/^(0[0-9]{9,10})$/.test(form.phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ"
    }

    if (!form.role) {
      newErrors.role = "Vui lòng chọn vai trò"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)
    try {
      await onSubmit(form)
      router.push('/system/users')
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setLoading(false)
    }
  }

  function handleChange(field: keyof User, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Page Header */}
      <div className="flex items-center gap-4">
        <Link href="/system/users">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {isEdit ? 'Chỉnh sửa người dùng' : 'Thêm người dùng mới'}
          </h1>
          <p className="text-muted-foreground">
            {isEdit ? 'Cập nhật thông tin người dùng' : 'Điền thông tin để tạo người dùng mới'}
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="rounded-lg border bg-card p-6">
          <h2 className="mb-4 text-lg font-semibold">Thông tin cơ bản</h2>

          <div className="grid gap-6 sm:grid-cols-2">
            {/* Họ tên */}
            <div className="space-y-2">
              <Label htmlFor="name">
                Họ và tên <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                placeholder="Nhập họ và tên"
                value={form.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className={errors.name ? 'border-destructive' : ''}
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">
                Email <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="example@email.com"
                value={form.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className={errors.email ? 'border-destructive' : ''}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>

            {/* Số điện thoại */}
            <div className="space-y-2">
              <Label htmlFor="phone">
                Số điện thoại <span className="text-destructive">*</span>
              </Label>
              <Input
                id="phone"
                placeholder="0901234567"
                value={form.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className={errors.phone ? 'border-destructive' : ''}
              />
              {errors.phone && (
                <p className="text-sm text-destructive">{errors.phone}</p>
              )}
            </div>

            {/* Vai trò */}
            <div className="space-y-2">
              <Label htmlFor="role">
                Vai trò <span className="text-destructive">*</span>
              </Label>
              <Select
                value={form.role}
                onValueChange={(value) => handleChange('role', value)}
              >
                <SelectTrigger className={errors.role ? 'border-destructive' : ''}>
                  <SelectValue placeholder="Chọn vai trò" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="sales">Nhân viên bán hàng</SelectItem>
                  <SelectItem value="warehouse">Quản lý kho</SelectItem>
                  <SelectItem value="accountant">Kế toán</SelectItem>
                </SelectContent>
              </Select>
              {errors.role && (
                <p className="text-sm text-destructive">{errors.role}</p>
              )}
            </div>

            {/* Trạng thái */}
            <div className="space-y-2">
              <Label htmlFor="status">Trạng thái</Label>
              <Select
                value={form.status}
                onValueChange={(value) => handleChange('status', value as User['status'])}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Hoạt động</SelectItem>
                  <SelectItem value="inactive">Ngừng hoạt động</SelectItem>
                  <SelectItem value="pending">Chờ duyệt</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Địa chỉ */}
            <div className="space-y-2">
              <Label htmlFor="address">Địa chỉ</Label>
              <Input
                id="address"
                placeholder="Nhập địa chỉ"
                value={form.address}
                onChange={(e) => handleChange('address', e.target.value)}
              />
            </div>
          </div>

          {/* Ghi chú - full width */}
          <div className="mt-6 space-y-2">
            <Label htmlFor="note">Ghi chú</Label>
            <Textarea
              id="note"
              placeholder="Nhập ghi chú (nếu có)"
              value={form.note}
              onChange={(e) => handleChange('note', e.target.value)}
              rows={4}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3">
          <Link href="/system/users">
            <Button type="button" variant="outline">
              Hủy bỏ
            </Button>
          </Link>
          <Button type="submit" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Đang xử lý...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                {isEdit ? 'Cập nhật' : 'Tạo mới'}
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}