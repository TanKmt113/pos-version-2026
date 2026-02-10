/**
 * Units Form Component
 * Form tái sử dụng cho Create và Edit Units
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Switch } from '@/components/ui/Switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';

import { toast } from 'sonner';
import { formatDateTime } from '@/shared/utils/useFormatDate';
import { ArrowLeft, Loader2, Save } from 'lucide-react';
import Link from 'next/link';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';

export interface UnitsFormProps {

  /** Mode: create hoặc edit */
  mode: 'create' | 'edit';
}

export function UnitsGroupForm({  mode }: UnitsFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({})
  const [unitOpts] = useState([
    { label: 'Kilogram (KG)', value: 'kg' },
    { label: 'Gram (G)', value: 'g' },
    { label: 'Mét (M)', value: 'm' },
    { label: 'Lít (L)', value: 'l' },
    { label: 'Cái', value: 'cai' },
    { label: 'Hộp', value: 'hop' },
  ])
  return (
    <>

      <form onSubmit={() => { }} className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-center gap-4">
            <Link href="/products/unit-group">
              <Button type='button' variant="ghost" size="sm">
                <ArrowLeft className='h-4 w-4'></ArrowLeft>
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                {mode === 'create' ? `Thêm nhóm đơn vị tính` : `Chỉnh sửa nhóm đơn vị tính`}
              </h1>
              <p className='text-muted-foreground'>
                {mode ==='create' ? `Tạo nhóm đơn vị tính mới trong hệ thống` : `Cập nhật thông tin nhóm đơn vị tính`}
              </p>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <Button type='button' variant="outline">Huỷ</Button>
            <Button type='submit'>Lưu</Button>
          </div>
        </div>
        {/* Form Content */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Thông tin cơ bản</CardTitle>
                <CardDescription>
                  Nhập thông tin chi tiết về nhóm đơn vị tính
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Mã và Tên nhóm đơn vị tính */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="groupCode">
                      Mã nhóm đơn vị tính <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="groupCode"
                      placeholder="VD: WEIGHT, LENGTH..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="groupName">
                      Tên nhóm đơn vị tính <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="groupName"
                      placeholder="VD: Khối lượng, Chiều dài..."
                    />
                  </div>
                </div>

                {/* Đơn vị tính cơ sở */}
                <div className="space-y-2">
                  <Label htmlFor="baseUnit">
                    Đơn vị tính cơ sở <span className="text-destructive">*</span>
                  </Label>
                  <Select>
                    <SelectTrigger id="baseUnit">
                      <SelectValue placeholder="Chọn đơn vị tính cơ sở..." />
                    </SelectTrigger>
                    <SelectContent>
                      {unitOpts.map((el) => (
                        <SelectItem key={el.value} value={el.value}>
                          {el.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">
                    Đơn vị tính cơ sở là đơn vị nhỏ nhất trong nhóm
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Trạng thái</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="isActive">Hoạt động</Label>
                    <p className="text-sm text-muted-foreground">
                      Cho phép sử dụng nhóm đơn vị này
                    </p>
                  </div>
                  <Switch id="isActive" defaultChecked />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
    </form>
    </>

  );
}
