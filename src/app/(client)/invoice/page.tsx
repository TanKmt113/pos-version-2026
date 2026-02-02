import { HeaderTabs } from "@/components/client/Header";
import { SlideRightClient } from "@/components/client/SlideRight";
import { Input } from "@/components/ui/Input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { Search } from "lucide-react";
import Image from "next/image";

export default function InvoicePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <HeaderTabs>
        <div className="relative">
          <Input type="text" placeholder="Tìm kiếm sản phẩm" className="h-8" />
          <Search className="absolute right-3 top-2 h-4 w-4 text-muted-foreground" />
        </div>
      </HeaderTabs>
      <div className="flex flex-1">
        <div className="w-[75%] p-2">
          <Table className="border rounded-lg">
            <TableCaption>Danh sách sản phẩm</TableCaption>
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="font-bold">STT</TableHead>
                <TableHead className="font-bold">Mã hàng hóa</TableHead>
                <TableHead className="font-bold">Ảnh hàng hóa</TableHead>
                <TableHead className="font-bold">Tên hàng hóa</TableHead>
                <TableHead className="font-bold">Số lượng</TableHead>
                <TableHead className="font-bold">Đơn vị tính</TableHead>
                <TableHead className="font-bold">Đơn giá</TableHead>
                <TableHead className="font-bold">Thành tiền</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[1, 2, 3, 4, 5, 6].map((e) => (
                <TableRow key={e}>
                  <TableCell>1</TableCell>
                  <TableCell>MK01009</TableCell>
                  <TableCell>
                    <Image
                      src={
                        "http://t1.gstatic.com/images?q=tbn:ANd9GcQOt8jh7Qz16k4Q6DMP6CnhrCqj94xetn2p_oLq-VCJ42NWGpZzpHSH8yhHJ1qEsA"
                      }
                      alt="Sản phẩm"
                      width={50}
                      height={50}
                      className="object-contain"
                    />
                  </TableCell>
                  <TableCell>Súng tiểu liên</TableCell>
                  <TableCell>2</TableCell>
                  <TableCell>Cái</TableCell>
                  <TableCell>200.000.000 đ</TableCell>
                  <TableCell>200.000.000 đ</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <SlideRightClient className="flex-1 p-2" />
      </div>
    </div>
  );
}
