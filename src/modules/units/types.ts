export interface UnitOfMeasures {
  id: string;
  uomCode: string;
  uomName: string;
  isActive: boolean;
  createdAt: string;
  creator: string;
  updateDate: string | null;
  updator: string | null;
}

/**
 * DTO cho tạo mới đơn vị tính
 */
export interface CreateUnitOfMeasureDto {
  uomCode: string;
  uomName: string;
  isActive: boolean;
}

/**
 * DTO cho cập nhật đơn vị tính
 */
export interface UpdateUnitOfMeasureDto {
  uomName: string;
  isActive: boolean;
}