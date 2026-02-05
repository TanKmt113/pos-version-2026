'use client'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/Pagination"

type TablePaginationProps = {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
  onPageChange: (page: number) => void
  itemName?: string // "người dùng", "chi nhánh", "sản phẩm"...
}

export function TablePagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  itemName = "mục",
}: TablePaginationProps) {
  // Tính toán range hiển thị
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalItems)

  // Tạo danh sách các trang cần hiển thị
  function getPageNumbers(): (number | 'ellipsis')[] {
    const pages: (number | 'ellipsis')[] = []

    if (totalPages <= 7) {
      // Hiển thị tất cả các trang nếu <= 7
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Luôn hiển thị trang đầu
      pages.push(1)

      if (currentPage <= 3) {
        // Đầu: 1 2 3 4 5 ... n
        pages.push(2, 3, 4, 5, 'ellipsis', totalPages)
      } else if (currentPage >= totalPages - 2) {
        // Cuối: 1 ... n-4 n-3 n-2 n-1 n
        pages.push('ellipsis', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
      } else {
        // Giữa: 1 ... x-1 x x+1 ... n
        pages.push('ellipsis', currentPage - 1, currentPage, currentPage + 1, 'ellipsis', totalPages)
      }
    }

    return pages
  }

  function handlePageClick(page: number) {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page)
    }
  }

  // Không hiển thị nếu không có dữ liệu
  if (totalItems === 0) {
    return null
  }

  return (
    <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
      <p className="text-sm text-muted-foreground">
        Hiển thị <span className="font-medium">{startItem}-{endItem}</span> trong tổng số{" "}
        <span className="font-medium">{totalItems}</span> {itemName}
      </p>

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            {/* Nút Previous */}
            <PaginationItem>
              <PaginationPrevious
                href="#"
                size="default"
                onClick={(e) => {
                  e.preventDefault()
                  handlePageClick(currentPage - 1)
                }}
                className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
              />
            </PaginationItem>

            {/* Các số trang */}
            {getPageNumbers().map((page, index) => (
              <PaginationItem key={index}>
                {page === 'ellipsis' ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink
                    href="#"
                    size="icon"
                    isActive={page === currentPage}
                    onClick={(e) => {
                      e.preventDefault()
                      handlePageClick(page)
                    }}
                    className="cursor-pointer"
                  >
                    {page}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}

            {/* Nút Next */}
            <PaginationItem>
              <PaginationNext
                href="#"
                size="default"
                onClick={(e) => {
                  e.preventDefault()
                  handlePageClick(currentPage + 1)
                }}
                className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}
