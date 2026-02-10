"use client";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Separator } from "@/components/ui/Separator";
import { formatCurrency, formatFileSize } from "@/shared/utils/useFormatNumber";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useItemById } from "../hooks/useDetailItem";
import Image from "next/image";

export function ViewItemPage({ itemId }: { itemId: string }) {
  const { data, loading, error } = useItemById(itemId);

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center p-6">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
        <h3 className="text-lg font-semibold text-destructive">
          Lỗi tải dữ liệu
        </h3>
        <p className="text-sm text-muted-foreground">{error}</p>
        <Button onClick={() => window.location.reload()} className="mt-4">
          Thử lại
        </Button>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="text-muted-foreground">Không tìm thấy sản phẩm.</p>
      </div>
    );
  }

  const primaryImage = data.documents?.find((doc) => doc.isPrimary);
  const otherImages = data.documents?.filter((doc) => !doc.isPrimary) || [];

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/products/items">
            <Button type="button" variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Chi tiết sản phẩm
            </h1>
            <p className="text-muted-foreground">
              Xem thông tin chi tiết về sản phẩm
            </p>
          </div>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="space-y-6 md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin chung</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
                <div>
                  <div className="font-semibold text-gray-500">
                    Tên sản phẩm
                  </div>
                  <div>{data.itemName}</div>
                </div>
                <div>
                  <div className="font-semibold text-gray-500">Mã sản phẩm</div>
                  <div>{data.itemCode}</div>
                </div>
                <div>
                  <div className="font-semibold text-gray-500">
                    Loại sản phẩm
                  </div>
                  <div>{data.itemType}</div>
                </div>
                <div>
                  <div className="font-semibold text-gray-500">Đơn vị tính</div>
                  <div>{data.unitOfMeasureGroupName}</div>
                </div>
                <div>
                  <div className="font-semibold text-gray-500">Xuất xứ</div>
                  <div>{data.origin || "Chưa cập nhật"}</div>
                </div>
                <div>
                  <div className="font-semibold text-gray-500">
                    Nhà sản xuất
                  </div>
                  <div>{data.manufacturer || "Chưa cập nhật"}</div>
                </div>
                <div>
                  <div className="font-semibold text-gray-500">Giá mua vào</div>
                  <div>{formatCurrency(data.purchasePrice)}</div>
                </div>
                <div>
                  <div className="font-semibold text-gray-500">Giá bán ra</div>
                  <div>{formatCurrency(data.salePrice)}</div>
                </div>
                <div>
                  <div className="font-semibold text-gray-500">Quản lý giá</div>
                  <Badge variant="outline">{data.priceManagementType}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Thuộc tính</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {data.isActive && <Badge>Đang hoạt động</Badge>}
                {data.isSellable && <Badge color="green">Được phép bán</Badge>}
                {data.isPurchasable && (
                  <Badge color="blue">Được phép mua</Badge>
                )}
                {data.isOrderable && <Badge color="yellow">Hàng đặt</Badge>}
                {data.isExchangeable && (
                  <Badge color="cyan">Được phép đổi trả</Badge>
                )}
                {data.hasWarranty && <Badge color="purple">Có bảo hành</Badge>}
                {data.manageBatchNumber && (
                  <Badge variant="secondary">Quản lý theo lô</Badge>
                )}
                {data.manageSerialNumber && (
                  <Badge variant="secondary">Quản lý theo Serial</Badge>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6 md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Hình ảnh & Tài liệu</CardTitle>
            </CardHeader>
            <CardContent>
              {primaryImage && (
                <div className="mb-4">
                  {primaryImage?.sourcePath && (
                    <Image
                      src={`${primaryImage.sourcePath}`}
                      alt={primaryImage.fileName || "image"}
                      width={500}
                      height={500}
                      className="h-auto w-full rounded-lg object-cover"
                    />
                  )}
                  <p className="mt-2 text-center text-xs text-muted-foreground">
                    {primaryImage.fileName} (
                    {formatFileSize(primaryImage.fileSize)})
                  </p>
                </div>
              )}
              {otherImages.length > 0 && (
                <>
                  <Separator className="my-4" />
                  <div className="flex flex-wrap gap-2">
                    {otherImages.map((doc) => (
                      <div key={doc.id}>
                        <Image
                          src={`${doc.sourcePath}`}
                          alt={doc.fileName}
                          width={150}
                          height={150}
                          className="h-auto w-full rounded-md object-cover"
                        />
                        <p
                          className="mt-1 truncate text-center text-xs text-muted-foreground"
                          title={doc.fileName}
                        >
                          {doc.fileName}
                        </p>
                      </div>
                    ))}
                  </div>
                </>
              )}
              {data.documents.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  Không có hình ảnh hoặc tài liệu.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
