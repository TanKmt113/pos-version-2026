export interface IItemRequest {
  /** OData filter expression */
  $filter?: string;
  /** Sort fields, e.g: "createdAt desc" */
  $orderby?: string;
  /** Select specific fields, e.g: "id,itemCode,itemName" */
  $select?: string;
  /** Number of records to skip (pagination) */
  $skip?: number;
  /** Number of records to take */
  $top?: number;
}

export interface IProduct {
  id: string; 
  itemCode: string;
  itemName: string;
  foreignName: string;
  itemType: string;
  isActive: boolean;
  isSellable: boolean;
  isPurchasable: boolean;
  salePrice: number;
  createdAt: string; 
  creator: string;
}

export interface PaginatedItems {
  items: IProduct[];
  totalCount: number;
  pageIndex: number;
  pageSize: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface ApiResponse<PaginatedItems> {
  isSuccess: boolean;
  code: string;
  error: string;
  errors: string[];
  isFailure: boolean;
  value: PaginatedItems[];
}

export interface IItemFormData {
  itemCode: string;
  itemName: string;
  foreignName: string;
  itemType: string;
  isActive: boolean;
  isSellable: boolean;
  isPurchasable: boolean;
  salePrice: number;
}

