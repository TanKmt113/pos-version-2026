import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { ChevronRight, MoreHorizontal } from "lucide-react"

import { cn } from "@/shared/utils/utils"

// Breadcrumb Root
type BreadcrumbProps = React.HTMLAttributes<HTMLElement>

const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />
)
Breadcrumb.displayName = "Breadcrumb"

// Breadcrumb List
type BreadcrumbListProps = React.OlHTMLAttributes<HTMLOListElement>

const BreadcrumbList = React.forwardRef<HTMLOListElement, BreadcrumbListProps>(
  ({ className, ...props }, ref) => (
    <ol
      ref={ref}
      className={cn(
        "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",
        className
      )}
      {...props}
    />
  )
)
BreadcrumbList.displayName = "BreadcrumbList"

// Breadcrumb Item
type BreadcrumbItemProps = React.LiHTMLAttributes<HTMLLIElement>

const BreadcrumbItem = React.forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn("inline-flex items-center gap-1.5", className)} {...props} />
  )
)
BreadcrumbItem.displayName = "BreadcrumbItem"

// Breadcrumb Link
type BreadcrumbLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  asChild?: boolean
}

const BreadcrumbLink = React.forwardRef<HTMLElement, BreadcrumbLinkProps>(
  ({ asChild, className, ...props }, ref) => {
    const Comp = asChild ? Slot : "a"
    return <Comp ref={ref} className={cn("transition-colors hover:text-foreground", className)} {...props} />
  }
)
BreadcrumbLink.displayName = "BreadcrumbLink"

// Breadcrumb Page
type BreadcrumbPageProps = React.HTMLAttributes<HTMLSpanElement>

const BreadcrumbPage = React.forwardRef<HTMLSpanElement, BreadcrumbPageProps>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("font-normal text-foreground", className)}
      {...props}
    />
  )
)
BreadcrumbPage.displayName = "BreadcrumbPage"

// Breadcrumb Separator
type BreadcrumbSeparatorProps = React.LiHTMLAttributes<HTMLLIElement> & {
  children?: React.ReactNode
}

const BreadcrumbSeparator: React.FC<BreadcrumbSeparatorProps> = ({
  children,
  className,
  ...props
}) => (
  <li role="presentation" aria-hidden="true" className={cn("[&>svg]:size-3.5", className)} {...props}>
    {children ?? <ChevronRight />}
  </li>
)
BreadcrumbSeparator.displayName = "BreadcrumbSeparator"

// Breadcrumb Ellipsis
type BreadcrumbEllipsisProps = React.HTMLAttributes<HTMLSpanElement>

const BreadcrumbEllipsis: React.FC<BreadcrumbEllipsisProps> = ({ className, ...props }) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More</span>
  </span>
)
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis"

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}
