export interface UomItem {
  id: string;
  uomCode: string;
  uomName: string;
  isActive: boolean;
  createdAt: string; // ISO datetime string
  creator: string;
  updateDate: string | null;
  updator: string | null;
}

export interface PaginatedResponse<UomItem> {
  items: UomItem[];
  totalCount: number;
  pageIndex: number;
  pageSize: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}


export interface IUnitOfMeasuresApiRequest {
  /** OData filter expression */
  $filter?: string; 
  /** Sort fields, e.g: "createdAt desc" */
  $orderby?: string; 
  /** Select specific fields, e.g: "id,uomCode,uomName" */
  $select?: string; 
  /** Number of records to skip (pagination) */
  $skip?: number; 
  /** Number of records to take */
  $top?: number;
}