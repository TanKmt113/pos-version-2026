export interface UnitOfMeasuresGroup {
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
export interface CreateUnitOfMeasureGroupDto {
  uomCode: string;
  uomName: string;
  isActive: boolean;
}

/**
 * DTO cho cập nhật đơn vị tính
 */
export interface UpdateUnitOfMeasureGroupDto {
  uomName: string;
  isActive: boolean;
}