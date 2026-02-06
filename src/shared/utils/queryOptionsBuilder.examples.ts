/**
 * Ví dụ sử dụng QueryOptionsBuilder và FilterBuilder
 */

import { FilterBuilder, QueryOptionsBuilder, buildQueryString } from './queryOptionsBuilder';

// ============================================================================
// VÍ DỤ 1: Filter cơ bản
// ============================================================================

// 1.1. Filter đơn giản - Lấy items đang active
const filter1 = FilterBuilder.create()
  .equals('isActive', true)
  .build();
// Result: "isActive eq true"

// 1.2. Filter với contains
const filter2 = FilterBuilder.create()
  .contains('itemName', 'Vàng')
  .build();
// Result: "contains(itemName, 'Vàng')"

// 1.3. Filter kết hợp AND
const filter3 = FilterBuilder.create()
  .equals('isActive', true)
  .and()
  .contains('itemName', 'Vàng')
  .build();
// Result: "isActive eq true and contains(itemName, 'Vàng')"

// ============================================================================
// VÍ DỤ 2: Filter với nhiều điều kiện
// ============================================================================

// 2.1. Lọc theo nhiều điều kiện với AND
const filter4 = FilterBuilder.create()
  .equals('isActive', true)
  .and()
  .greaterThan('price', 1000)
  .and()
  .lessThan('price', 5000)
  .build();
// Result: "isActive eq true and price gt 1000 and price lt 5000"

// 2.2. Lọc với OR
const filter5 = FilterBuilder.create()
  .contains('itemName', 'Vàng')
  .or()
  .contains('itemName', 'Bạc')
  .build();
// Result: "contains(itemName, 'Vàng') or contains(itemName, 'Bạc')"

// 2.3. Kết hợp AND và OR với group
const filter6 = FilterBuilder.create()
  .equals('isActive', true)
  .and()
  .group(builder =>
    builder
      .contains('itemName', 'Vàng')
      .or()
      .contains('itemName', 'Bạc')
  )
  .build();
// Result: "isActive eq true and (contains(itemName, 'Vàng') or contains(itemName, 'Bạc'))"

// ============================================================================
// VÍ DỤ 3: Filter với Guid và null
// ============================================================================

// 3.1. Lọc theo Guid
const filter7 = FilterBuilder.create()
  .equals('itemGroupId', '3fa85f64-5717-4562-b3fc-2c963f66afa6')
  .build();
// Result: "itemGroupId eq 3fa85f64-5717-4562-b3fc-2c963f66afa6"

// 3.2. Lấy items không có parent (null check)
const filter8 = FilterBuilder.create()
  .isNull('parentId')
  .build();
// Result: "parentId eq null"

// 3.3. Lấy items có parent
const filter9 = FilterBuilder.create()
  .isNotNull('parentId')
  .build();
// Result: "parentId ne null"

// ============================================================================
// VÍ DỤ 4: Filter với startsWith và endsWith
// ============================================================================

// 4.1. Tìm items có mã bắt đầu bằng "GOLD"
const filter10 = FilterBuilder.create()
  .startsWith('itemCode', 'GOLD')
  .build();
// Result: "startswith(itemCode, 'GOLD')"

// 4.2. Tìm items có mã kết thúc bằng "001"
const filter11 = FilterBuilder.create()
  .endsWith('itemCode', '001')
  .build();
// Result: "endswith(itemCode, '001')"

// ============================================================================
// VÍ DỤ 5: QueryOptionsBuilder - Xây dựng query đầy đủ
// ============================================================================

// 5.1. Query đơn giản với filter và paging
const query1 = QueryOptionsBuilder.create()
  .filter(f => f.equals('isActive', true))
  .paginate(1, 20)
  .buildQueryString();
// Result: "$filter=isActive eq true&$skip=0&$top=20"

// 5.2. Query đầy đủ với filter, sort, select và paging
const query2 = QueryOptionsBuilder.create()
  .filter(f =>
    f.equals('isActive', true)
      .and()
      .contains('itemName', 'Vàng')
  )
  .orderBy('itemName', 'asc')
  .orderBy('createdAt', 'desc')
  .select(['id', 'itemCode', 'itemName', 'price'])
  .paginate(1, 20)
  .buildQueryString();
// Result: "$filter=isActive eq true and contains(itemName, 'Vàng')&$orderby=itemName asc, createdAt desc&$select=id,itemCode,itemName,price&$skip=0&$top=20"

// 5.3. Query với skip và top trực tiếp
const query3 = QueryOptionsBuilder.create()
  .filter(f => f.greaterThan('price', 1000))
  .skipAndTop(20, 10)
  .buildQueryString();
// Result: "$filter=price gt 1000&$skip=20&$top=10"

// ============================================================================
// VÍ DỤ 6: Sử dụng trong API calls
// ============================================================================

// 6.1. Lấy danh sách items với filter và paging
export async function getItems(page: number = 1, pageSize: number = 20, searchText?: string) {
  const builder = QueryOptionsBuilder.create()
    .filter(f => {
      let filter = f.equals('isActive', true);
      if (searchText) {
        filter = filter.and().contains('itemName', searchText);
      }
      return filter;
    })
    .orderBy('itemName', 'asc')
    .paginate(page, pageSize);

  const queryString = builder.buildQueryString();
  const response = await fetch(`/api/items?${queryString}`);
  return response.json();
}

// 6.2. Lấy danh sách theo itemGroupId
export async function getItemsByGroup(itemGroupId: string, page: number = 1) {
  const queryString = QueryOptionsBuilder.create()
    .filter(f =>
      f.equals('isActive', true)
        .and()
        .equals('itemGroupId', itemGroupId)
    )
    .orderBy('itemName', 'asc')
    .paginate(page, 20)
    .buildQueryString();

  const response = await fetch(`/api/items?${queryString}`);
  return response.json();
}

// 6.3. Lấy items trong khoảng giá
export async function getItemsByPriceRange(minPrice: number, maxPrice: number) {
  const queryString = QueryOptionsBuilder.create()
    .filter(f =>
      f.equals('isActive', true)
        .and()
        .greaterThanOrEqual('price', minPrice)
        .and()
        .lessThanOrEqual('price', maxPrice)
    )
    .orderBy('price', 'asc')
    .paginate(1, 50)
    .buildQueryString();

  const response = await fetch(`/api/items?${queryString}`);
  return response.json();
}

// 6.4. Tìm kiếm nâng cao
export async function advancedSearch(params: {
  searchText?: string;
  itemGroupId?: string;
  isActive?: boolean;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  pageSize?: number;
}) {
  const builder = QueryOptionsBuilder.create();

  // Build filter dynamically
  builder.filter(f => {
    let filter = FilterBuilder.create();
    let hasCondition = false;

    if (params.isActive !== undefined) {
      filter = filter.equals('isActive', params.isActive);
      hasCondition = true;
    }

    if (params.searchText) {
      if (hasCondition) filter = filter.and();
      filter = filter.contains('itemName', params.searchText);
      hasCondition = true;
    }

    if (params.itemGroupId) {
      if (hasCondition) filter = filter.and();
      filter = filter.equals('itemGroupId', params.itemGroupId);
      hasCondition = true;
    }

    if (params.minPrice !== undefined) {
      if (hasCondition) filter = filter.and();
      filter = filter.greaterThanOrEqual('price', params.minPrice);
      hasCondition = true;
    }

    if (params.maxPrice !== undefined) {
      if (hasCondition) filter = filter.and();
      filter = filter.lessThanOrEqual('price', params.maxPrice);
      hasCondition = true;
    }

    return filter;
  });

  builder
    .orderBy('itemName', 'asc')
    .paginate(params.page || 1, params.pageSize || 20);

  const queryString = builder.buildQueryString();
  const response = await fetch(`/api/items?${queryString}`);
  return response.json();
}

// ============================================================================
// VÍ DỤ 7: Sử dụng với React/Next.js
// ============================================================================

// 7.1. Hook để lấy items với query options
export function useItems(options: {
  searchText?: string;
  isActive?: boolean;
  page?: number;
  pageSize?: number;
}) {
  const queryString = QueryOptionsBuilder.create()
    .filter(f => {
      let filter = FilterBuilder.create();
      if (options.isActive !== undefined) {
        filter = filter.equals('isActive', options.isActive);
      }
      if (options.searchText) {
        if (options.isActive !== undefined) filter = filter.and();
        filter = filter.contains('itemName', options.searchText);
      }
      return filter;
    })
    .orderBy('itemName', 'asc')
    .paginate(options.page || 1, options.pageSize || 20)
    .buildQueryString();

  // Sử dụng với SWR, React Query, hoặc fetch thông thường
  // const { data, error, isLoading } = useSWR(`/api/items?${queryString}`);
  
  return { queryString };
}

// 7.2. Server Component (Next.js App Router)
export async function ItemsPage({
  searchParams,
}: {
  searchParams: { page?: string; search?: string };
}) {
  const page = parseInt(searchParams.page || '1');
  const search = searchParams.search;

  const queryString = QueryOptionsBuilder.create()
    .filter(f => {
      let filter = f.equals('isActive', true);
      if (search) {
        filter = filter.and().contains('itemName', search);
      }
      return filter;
    })
    .orderBy('itemName', 'asc')
    .paginate(page, 20)
    .buildQueryString();

  const response = await fetch(`${process.env.API_URL}/api/items?${queryString}`);
  const data = await response.json();

  // Return JSX with items list
  return null; // Replace with actual component rendering
}

// ============================================================================
// VÍ DỤ 8: Filter phức tạp với nhiều điều kiện lồng nhau
// ============================================================================

// 8.1. (isActive eq true) and (contains(itemName, 'Vàng') or contains(itemName, 'Bạc')) and (price gt 1000)
const complexFilter = FilterBuilder.create()
  .equals('isActive', true)
  .and()
  .group(f =>
    f.contains('itemName', 'Vàng')
      .or()
      .contains('itemName', 'Bạc')
  )
  .and()
  .greaterThan('price', 1000)
  .build();

// 8.2. Query cho ItemGroups - Lấy groups gốc (không có parent)
const rootGroupsQuery = QueryOptionsBuilder.create()
  .filter(f => f.isNull('parentId'))
  .orderBy('groupName', 'asc')
  .buildQueryString();

// 8.3. Query cho ItemGroups - Lấy sub-groups của một group
const subGroupsQuery = (parentId: string) =>
  QueryOptionsBuilder.create()
    .filter(f => f.equals('parentId', parentId))
    .orderBy('groupName', 'asc')
    .buildQueryString();

// ============================================================================
// VÍ DỤ 9: Sử dụng helper function buildQueryString
// ============================================================================

// 9.1. Sử dụng trực tiếp với QueryOptions object
const queryOptions = {
  $filter: "isActive eq true and contains(itemName, 'Vàng')",
  $orderby: 'itemName asc',
  $top: 20,
  $skip: 0,
};

const queryString = buildQueryString(queryOptions);
// Result: "$filter=isActive eq true and contains(itemName, 'Vàng')&$orderby=itemName asc&$skip=0&$top=20"
