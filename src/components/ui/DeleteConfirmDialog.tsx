/**
 * DeleteConfirmDialog Component
 * Generic dialog xác nhận xóa cho bất kỳ entity nào
 */

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/AlertDialog';

export interface DeleteConfirmDialogProps {
  /** Dialog open state */
  open: boolean;
  /** On open change */
  onOpenChange: (open: boolean) => void;
  /** Item name to display */
  itemName: string;
  /** Entity type name (e.g., "đơn vị tính", "khách hàng", "sản phẩm") */
  entityType?: string;
  /** On confirm delete */
  onConfirm: () => void;
  /** Deleting state */
  isDeleting?: boolean;
  /** Custom title */
  title?: string;
  /** Custom description */
  description?: string;
}

/**
 * Generic Delete Confirmation Dialog
 */
export function DeleteConfirmDialog({
  open,
  onOpenChange,
  itemName,
  entityType = 'mục',
  onConfirm,
  isDeleting = false,
  title = 'Xác nhận xóa',
  description,
}: DeleteConfirmDialogProps) {
  const defaultDescription = (
    <>
      Bạn có chắc chắn muốn xóa {entityType}{' '}
      <span className="font-semibold text-foreground">"{itemName}"</span>?
      Hành động này không thể hoàn tác.
    </>
  );

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            {description || defaultDescription}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Hủy</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              onConfirm();
            }}
            disabled={isDeleting}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isDeleting ? 'Đang xóa...' : 'Xóa'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
