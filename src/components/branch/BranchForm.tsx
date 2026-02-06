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
import { Branch } from "@/modules/branch/branch.types"
import { ArrowLeft, Loader2, Save } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"


type Props = {
  initialData?: Partial<Branch>
  mode?: 'create' | 'edit'
  onSubmit: (data: Partial<Branch>) => Promise<void>
}

// Danh sách múi giờ phổ biến
const timezones = [
  { value: "Asia/Ho_Chi_Minh", label: "Việt Nam (GMT+7)" },
  { value: "Asia/Bangkok", label: "Thái Lan (GMT+7)" },
  { value: "Asia/Singapore", label: "Singapore (GMT+8)" },
  { value: "Asia/Tokyo", label: "Nhật Bản (GMT+9)" },
  { value: "Asia/Seoul", label: "Hàn Quốc (GMT+9)" },
  { value: "Asia/Shanghai", label: "Trung Quốc (GMT+8)" },
  { value: "America/New_York", label: "New York (GMT-5)" },
  { value: "America/Los_Angeles", label: "Los Angeles (GMT-8)" },
  { value: "Europe/London", label: "London (GMT+0)" },
  { value: "Europe/Paris", label: "Paris (GMT+1)" },
]

export function BranchForm({ initialData, mode = 'create', onSubmit }: Props) {
  const router = useRouter()
  const [form, setForm] = useState<Partial<Branch>>({
    code: "",
    name: "",
    address: "",
    phone: "",
    timezone: "Asia/Ho_Chi_Minh",
    status: "active",
    note: "",
    ...initialData
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const isEdit = mode === "edit"

  function validateForm() {
    const newErrors: Record<string, string> = {}

    if (!form.code?.trim()) {
      newErrors.code = "Vui lòng nhập mã chi nhánh"
    } else if (!/^[A-Za-z0-9_-]+$/.test(form.code)) {
      newErrors.code = "Mã chi nhánh chỉ được chứa chữ cái, số, dấu gạch ngang và gạch dưới"
    }

    if (!form.name?.trim()) {
      newErrors.name = "Vui lòng nhập tên chi nhánh"
    }

    if (!form.address?.trim()) {
      newErrors.address = "Vui lòng nhập địa chỉ"
    }

    if (!form.phone?.trim()) {
      newErrors.phone = "Vui lòng nhập số điện thoại"
    } else if (!/^[0-9\s-]+$/.test(form.phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ"
    }

    if (!form.timezone) {
      newErrors.timezone = "Vui lòng chọn múi giờ"
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
      router.push('/system/store-setup')
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setLoading(false)
    }
  }

  function handleChange(field: keyof Branch, value: string) {
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
        <Link href="/system/store-setup">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {isEdit ? 'Chỉnh sửa chi nhánh' : 'Thêm chi nhánh mới'}
          </h1>
          <p className="text-muted-foreground">
            {isEdit ? 'Cập nhật thông tin chi nhánh' : 'Điền thông tin để tạo chi nhánh mới'}
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="rounded-lg border bg-card p-6">
          <h2 className="mb-4 text-lg font-semibold">Thông tin chi nhánh</h2>

          <div className="grid gap-6 sm:grid-cols-2">
            {/* Mã chi nhánh */}
            <div className="space-y-2">
              <Label htmlFor="code">
                Mã chi nhánh <span className="text-destructive">*</span>
              </Label>
              <Input
                id="code"
                placeholder="VD: CN001, HN-01"
                value={form.code}
                onChange={(e) => handleChange('code', e.target.value.toUpperCase())}
                className={errors.code ? 'border-destructive' : ''}
                disabled={isEdit}
              />
              {errors.code && (
                <p className="text-sm text-destructive">{errors.code}</p>
              )}
              {isEdit && (
                <p className="text-sm text-muted-foreground">Mã chi nhánh không thể thay đổi</p>
              )}
            </div>

            {/* Tên chi nhánh */}
            <div className="space-y-2">
              <Label htmlFor="name">
                Tên chi nhánh <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                placeholder="VD: Chi nhánh Quận 1"
                value={form.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className={errors.name ? 'border-destructive' : ''}
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name}</p>
              )}
            </div>

            {/* Số điện thoại */}
            <div className="space-y-2">
              <Label htmlFor="phone">
                Điện thoại <span className="text-destructive">*</span>
              </Label>
              <Input
                id="phone"
                placeholder="VD: 028 1234 5678"
                value={form.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className={errors.phone ? 'border-destructive' : ''}
              />
              {errors.phone && (
                <p className="text-sm text-destructive">{errors.phone}</p>
              )}
            </div>

            {/* Múi giờ */}
            <div className="space-y-2">
              <Label htmlFor="timezone">
                Múi giờ <span className="text-destructive">*</span>
              </Label>
              <Select
                value={form.timezone}
                onValueChange={(value) => handleChange('timezone', value)}
              >
                <SelectTrigger className={errors.timezone ? 'border-destructive' : ''}>
                  <SelectValue placeholder="Chọn múi giờ" />
                </SelectTrigger>
                <SelectContent>
                  {timezones.map((tz) => (
                    <SelectItem key={tz.value} value={tz.value}>
                      {tz.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.timezone && (
                <p className="text-sm text-destructive">{errors.timezone}</p>
              )}
            </div>

            {/* Trạng thái */}
            <div className="space-y-2">
              <Label htmlFor="status">Trạng thái</Label>
              <Select
                value={form.status}
                onValueChange={(value) => handleChange('status', value as Branch['status'])}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Hoạt động</SelectItem>
                  <SelectItem value="inactive">Ngừng hoạt động</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Địa chỉ - full width */}
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="address">
                Địa chỉ <span className="text-destructive">*</span>
              </Label>
              <Input
                id="address"
                placeholder="VD: 123 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP.HCM"
                value={form.address}
                onChange={(e) => handleChange('address', e.target.value)}
                className={errors.address ? 'border-destructive' : ''}
              />
              {errors.address && (
                <p className="text-sm text-destructive">{errors.address}</p>
              )}
            </div>
          </div>

          {/* Ghi chú - full width */}
          <div className="mt-6 space-y-2">
            <Label htmlFor="note">Ghi chú</Label>
            <Textarea
              id="note"
              placeholder="Nhập ghi chú về chi nhánh (nếu có)"
              value={form.note}
              onChange={(e) => handleChange('note', e.target.value)}
              rows={4}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3">
          <Link href="/system/store-setup">
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