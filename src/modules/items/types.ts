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

// CHi tiết sản phẩm

export interface ApiResponseDetail<T> {
  isSuccess: boolean
  code: string
  error: string | null
  errors: string[]
  isFailure: boolean
  value: T
}
export interface ItemBarcode {
  id: string
  barcodeCode: string
  barcodeName: string
  unitOfMeasureId: string
  unitOfMeasureName: string
}
export interface ItemUom {
  id: string
  uomType: string
  unitOfMeasureId: string
  unitOfMeasureName: string
  defaultBarcodeId: string
}
export interface ItemDocument {
  id: string
  sourcePath: string
  fileName: string
  fileExtension: string
  fileSize: number
  isPrimary: boolean
  isImage: boolean
  documentType: string
  note: string
  uploadDate: string // ISO Date
}
export interface ItemDetail {
  id: string
  itemCode: string
  itemName: string
  foreignName: string
  itemType: string
  itemGroupId: string
  isActive: boolean
  isSellable: boolean
  isPurchasable: boolean
  isOrderable: boolean
  isExchangeable: boolean
  hasWarranty: boolean

  salePrice: number
  purchasePrice: number

  createdAt: string
  creator: string
  updateDate: string
  updator: string

  freeText: string

  unitOfMeasureGroupId: string
  unitOfMeasureGroupName: string

  itemCodePrefixId: string
  itemCodePrefixCode: string
  itemCodePrefixName: string

  manageBatchNumber: boolean
  manageSerialNumber: boolean
  priceManagementType: string

  origin: string
  manufacturer: string
  manufactureYear: number

  barcodes: ItemBarcode[]
  itemUoms: ItemUom[]
  documents: ItemDocument[]
}
export type ItemDetailResponse = ApiResponseDetail<ItemDetail>