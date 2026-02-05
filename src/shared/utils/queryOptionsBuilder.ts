/**
 * OData Query Options Builder
 * Xây dựng query string theo chuẩn OData cho POS API
 */

export interface QueryOptions {
  $filter?: string;
  $orderby?: string;
  $select?: string;
  $skip?: number;
  $top?: number;
}

export type OrderDirection = 'asc' | 'desc';

/**
 * Filter Builder - Xây dựng filter string theo chuẩn OData
 * 
 * @example
 * ```ts
 * const filter = FilterBuilder.create()
 *   .equals('isActive', true)
 *   .and()
 *   .contains('itemName', 'Vàng')
 *   .build();
 * // Result: "isActive eq true and contains(itemName, 'Vàng')"
 * ```
 */
export class FilterBuilder {
  private conditions: string[] = [];

  private constructor() {}

  /**
   * Tạo FilterBuilder mới
   */
  static create(): FilterBuilder {
    return new FilterBuilder();
  }

  /**
   * Thêm điều kiện AND
   */
  and(): this {
    if (this.conditions.length > 0) {
      this.conditions.push('and');
    }
    return this;
  }

  /**
   * Thêm điều kiện OR
   */
  or(): this {
    if (this.conditions.length > 0) {
      this.conditions.push('or');
    }
    return this;
  }

  /**
   * Bằng (eq)
   * @example equals('isActive', true) => "isActive eq true"
   * @example equals('itemGroupId', '3fa85f64-5717-4562-b3fc-2c963f66afa6') => "itemGroupId eq 3fa85f64-5717-4562-b3fc-2c963f66afa6"
   */
  equals(field: string, value: string | number | boolean | null): this {
    this.conditions.push(`${field} eq ${this.formatValue(value)}`);
    return this;
  }

  /**
   * Không bằng (ne)
   * @example notEquals('status', 'deleted') => "status ne 'deleted'"
   */
  notEquals(field: string, value: string | number | boolean | null): this {
    this.conditions.push(`${field} ne ${this.formatValue(value)}`);
    return this;
  }

  /**
   * Lớn hơn (gt)
   * @example greaterThan('price', 1000) => "price gt 1000"
   */
  greaterThan(field: string, value: number): this {
    this.conditions.push(`${field} gt ${value}`);
    return this;
  }

  /**
   * Lớn hơn hoặc bằng (ge)
   * @example greaterThanOrEqual('quantity', 10) a=> "quantity ge 10"
   */
  greaterThanOrEqual(field: string, value: number): this {
    this.conditions.push(`${field} ge ${value}`);
    return this;
  }

  /**
   * Nhỏ hơn (lt)
   * @example lessThan('price', 5000) => "price lt 5000"
   */
  lessThan(field: string, value: number): this {
    this.conditions.push(`${field} lt ${value}`);
    return this;
  }

  /**
   * Nhỏ hơn hoặc bằng (le)
   * @example lessThanOrEqual('stock', 100) => "stock le 100"
   */
  lessThanOrEqual(field: string, value: number): this {
    this.conditions.push(`${field} le ${value}`);
    return this;
  }

  /**
   * Chứa chuỗi (contains)
   * @example contains('itemName', 'Vàng') => "contains(itemName, 'Vàng')"
   */
  contains(field: string, value: string): this {
    this.conditions.push(`contains(${field}, '${this.escapeString(value)}')`);
    return this;
  }

  /**
   * Bắt đầu bằng (startswith)
   * @example startsWith('itemCode', 'GOLD') => "startswith(itemCode, 'GOLD')"
   */
  startsWith(field: string, value: string): this {
    this.conditions.push(`startswith(${field}, '${this.escapeString(value)}')`);
    return this;
  }

  /**
   * Kết thúc bằng (endswith)
   * @example endsWith('itemCode', '001') => "endswith(itemCode, '001')"
   */
  endsWith(field: string, value: string): this {
    this.conditions.push(`endswith(${field}, '${this.escapeString(value)}')`);
    return this;
  }

  /**
   * Kiểm tra null
   * @example isNull('parentId') => "parentId eq null"
   */
  isNull(field: string): this {
    this.conditions.push(`${field} eq null`);
    return this;
  }

  /**
   * Kiểm tra không null
   * @example isNotNull('parentId') => "parentId ne null"
   */
  isNotNull(field: string): this {
    this.conditions.push(`${field} ne null`);
    return this;
  }

  /**
   * Thêm điều kiện tùy chỉnh
   * @example custom("price gt 1000 and price lt 5000")
   */
  custom(condition: string): this {
    this.conditions.push(condition);
    return this;
  }

  /**
   * Nhóm điều kiện với ngoặc đơn
   * @example
   * ```ts
   * FilterBuilder.create()
   *   .equals('isActive', true)
   *   .and()
   *   .group(builder => 
   *     builder.contains('itemName', 'Vàng')
   *       .or()
   *       .contains('itemName', 'Bạc')
   *   )
   * // Result: "isActive eq true and (contains(itemName, 'Vàng') or contains(itemName, 'Bạc'))"
   * ```
   */
  group(callback: (builder: FilterBuilder) => FilterBuilder): this {
    const subBuilder = FilterBuilder.create();
    callback(subBuilder);
    const subFilter = subBuilder.build();
    if (subFilter) {
      this.conditions.push(`(${subFilter})`);
    }
    return this;
  }

  /**
   * Xây dựng filter string cuối cùng
   */
  build(): string {
    return this.conditions.join(' ');
  }

  /**
   * Format giá trị theo đúng cú pháp OData
   */
  private formatValue(value: string | number | boolean | null): string {
    if (value === null) {
      return 'null';
    }
    if (typeof value === 'string') {
      // Kiểm tra xem có phải là Guid không (UUID format)
      if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value)) {
        return value;
      }
      return `'${this.escapeString(value)}'`;
    }
    if (typeof value === 'boolean') {
      return value.toString();
    }
    return value.toString();
  }

  /**
   * Escape string để tránh lỗi syntax
   */
  private escapeString(value: string): string {
    return value.replace(/'/g, "''");
  }
}

/**
 * Query Options Builder - Xây dựng toàn bộ query options
 * 
 * @example
 * ```ts
 * const query = QueryOptionsBuilder.create()
 *   .filter(f => f.equals('isActive', true).and().contains('itemName', 'Vàng'))
 *   .orderBy('itemName', 'asc')
 *   .select(['id', 'itemCode', 'itemName'])
 *   .paginate(1, 20)
 *   .build();
 * ```
 */
export class QueryOptionsBuilder {
  private options: QueryOptions = {};

  private constructor() {}

  /**
   * Tạo QueryOptionsBuilder mới
   */
  static create(): QueryOptionsBuilder {
    return new QueryOptionsBuilder();
  }

  /**
   * Thiết lập filter
   * @example filter(f => f.equals('isActive', true))
   */
  filter(callback: (builder: FilterBuilder) => FilterBuilder): this {
    const builder = FilterBuilder.create();
    const result = callback(builder);
    this.options.$filter = result.build();
    return this;
  }

  /**
   * Thiết lập filter từ string có sẵn
   * @example filterRaw("isActive eq true and contains(itemName, 'Vàng')")
   */
  filterRaw(filter: string): this {
    this.options.$filter = filter;
    return this;
  }

  /**
   * Thêm điều kiện sắp xếp
   * @example orderBy('itemName', 'asc')
   */
  orderBy(field: string, direction: OrderDirection = 'asc'): this {
    const newOrder = `${field} ${direction}`;
    if (this.options.$orderby) {
      this.options.$orderby += `, ${newOrder}`;
    } else {
      this.options.$orderby = newOrder;
    }
    return this;
  }

  /**
   * Thiết lập orderBy từ string có sẵn
   * @example orderByRaw("itemName asc, createdAt desc")
   */
  orderByRaw(orderBy: string): this {
    this.options.$orderby = orderBy;
    return this;
  }

  /**
   * Chọn các cột cần trả về
   * @example select(['id', 'itemCode', 'itemName'])
   */
  select(fields: string[]): this {
    this.options.$select = fields.join(',');
    return this;
  }

  /**
   * Thiết lập select từ string có sẵn
   * @example selectRaw("id,itemCode,itemName")
   */
  selectRaw(select: string): this {
    this.options.$select = select;
    return this;
  }

  /**
   * Thiết lập phân trang (page-based)
   * @param page Số trang (bắt đầu từ 1)
   * @param pageSize Số bản ghi trên 1 trang
   * @example paginate(1, 20) => $skip=0, $top=20
   * @example paginate(2, 20) => $skip=20, $top=20
   */
  paginate(page: number, pageSize: number): this {
    this.options.$skip = (page - 1) * pageSize;
    this.options.$top = pageSize;
    return this;
  }

  /**
   * Thiết lập skip và top trực tiếp
   * @example skipAndTop(20, 10) => $skip=20, $top=10
   */
  skipAndTop(skip: number, top: number): this {
    this.options.$skip = skip;
    this.options.$top = top;
    return this;
  }

  /**
   * Thiết lập skip
   * @example skip(20) => $skip=20
   */
  skip(value: number): this {
    this.options.$skip = value;
    return this;
  }

  /**
   * Thiết lập top
   * @example top(10) => $top=10
   */
  top(value: number): this {
    this.options.$top = value;
    return this;
  }

  /**
   * Xây dựng QueryOptions object
   */
  build(): QueryOptions {
    return { ...this.options };
  }

  /**
   * Xây dựng query string cho URL
   * @example buildQueryString() => "$filter=isActive eq true&$orderby=itemName asc&$top=20&$skip=0"
   */
  buildQueryString(): string {
    const params = new URLSearchParams();
    if (this.options.$filter) params.append('$filter', this.options.$filter);
    if (this.options.$orderby) params.append('$orderby', this.options.$orderby);
    if (this.options.$select) params.append('$select', this.options.$select);
    if (this.options.$skip !== undefined) params.append('$skip', this.options.$skip.toString());
    if (this.options.$top !== undefined) params.append('$top', this.options.$top.toString());
    return params.toString();
  }
}

/**
 * Helper function để build query string nhanh
 * @example buildQueryString({ $filter: "isActive eq true", $top: 20 })
 */
export function buildQueryString(options: QueryOptions): string {
  const params = new URLSearchParams();
  if (options.$filter) params.append('$filter', options.$filter);
  if (options.$orderby) params.append('$orderby', options.$orderby);
  if (options.$select) params.append('$select', options.$select);
  if (options.$skip !== undefined) params.append('$skip', options.$skip.toString());
  if (options.$top !== undefined) params.append('$top', options.$top.toString());
  return params.toString();
}
