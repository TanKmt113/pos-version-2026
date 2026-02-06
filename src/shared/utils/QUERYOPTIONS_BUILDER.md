# QueryOptions Builder - Hướng dẫn sử dụng

## Tổng quan

QueryOptions Builder cung cấp cách xây dựng query string OData-like một cách type-safe và dễ dàng cho dự án POS.

## Cài đặt

```typescript
import { 
  FilterBuilder, 
  QueryOptionsBuilder, 
  buildQueryString 
} from '@/shared/utils/queryOptionsBuilder';
```

## FilterBuilder - Xây dựng điều kiện lọc

### 1. Các phương thức cơ bản

#### equals() - Bằng
```typescript
FilterBuilder.create()
  .equals('isActive', true)
  .build();
// Result: "isActive eq true"

FilterBuilder.create()
  .equals('status', 'active')
  .build();
// Result: "status eq 'active'"
```

#### notEquals() - Không bằng
```typescript
FilterBuilder.create()
  .notEquals('status', 'deleted')
  .build();
// Result: "status ne 'deleted'"
```

#### greaterThan() / greaterThanOrEqual() - Lớn hơn
```typescript
FilterBuilder.create()
  .greaterThan('price', 1000)
  .build();
// Result: "price gt 1000"

FilterBuilder.create()
  .greaterThanOrEqual('quantity', 10)
  .build();
// Result: "quantity ge 10"
```

#### lessThan() / lessThanOrEqual() - Nhỏ hơn
```typescript
FilterBuilder.create()
  .lessThan('price', 5000)
  .build();
// Result: "price lt 5000"

FilterBuilder.create()
  .lessThanOrEqual('stock', 100)
  .build();
// Result: "stock le 100"
```

### 2. Phương thức tìm kiếm chuỗi

#### contains() - Chứa chuỗi
```typescript
FilterBuilder.create()
  .contains('itemName', 'Vàng')
  .build();
// Result: "contains(itemName, 'Vàng')"
```

#### startsWith() - Bắt đầu bằng
```typescript
FilterBuilder.create()
  .startsWith('itemCode', 'GOLD')
  .build();
// Result: "startswith(itemCode, 'GOLD')"
```

#### endsWith() - Kết thúc bằng
```typescript
FilterBuilder.create()
  .endsWith('itemCode', '001')
  .build();
// Result: "endswith(itemCode, '001')"
```

### 3. Kiểm tra null

#### isNull() - Là null
```typescript
FilterBuilder.create()
  .isNull('parentId')
  .build();
// Result: "parentId eq null"
```

#### isNotNull() - Không null
```typescript
FilterBuilder.create()
  .isNotNull('parentId')
  .build();
// Result: "parentId ne null"
```

### 4. Kết hợp điều kiện

#### and() - Và
```typescript
FilterBuilder.create()
  .equals('isActive', true)
  .and()
  .contains('itemName', 'Vàng')
  .build();
// Result: "isActive eq true and contains(itemName, 'Vàng')"
```

#### or() - Hoặc
```typescript
FilterBuilder.create()
  .contains('itemName', 'Vàng')
  .or()
  .contains('itemName', 'Bạc')
  .build();
// Result: "contains(itemName, 'Vàng') or contains(itemName, 'Bạc')"
```

#### group() - Nhóm điều kiện
```typescript
FilterBuilder.create()
  .equals('isActive', true)
  .and()
  .group(f => 
    f.contains('itemName', 'Vàng')
      .or()
      .contains('itemName', 'Bạc')
  )
  .build();
// Result: "isActive eq true and (contains(itemName, 'Vàng') or contains(itemName, 'Bạc'))"
```

### 5. Guid và các giá trị đặc biệt

```typescript
// Guid được tự động nhận diện
FilterBuilder.create()
  .equals('itemGroupId', '3fa85f64-5717-4562-b3fc-2c963f66afa6')
  .build();
// Result: "itemGroupId eq 3fa85f64-5717-4562-b3fc-2c963f66afa6"

// String thông thường được wrap trong quotes
FilterBuilder.create()
  .equals('status', 'active')
  .build();
// Result: "status eq 'active'"
```

## QueryOptionsBuilder - Xây dựng query đầy đủ

### 1. Filter

```typescript
QueryOptionsBuilder.create()
  .filter(f => f.equals('isActive', true))
  .buildQueryString();
// Result: "$filter=isActive eq true"

// Filter với nhiều điều kiện
QueryOptionsBuilder.create()
  .filter(f => 
    f.equals('isActive', true)
      .and()
      .contains('itemName', 'Vàng')
  )
  .buildQueryString();
```

### 2. OrderBy - Sắp xếp

```typescript
QueryOptionsBuilder.create()
  .orderBy('itemName', 'asc')
  .buildQueryString();
// Result: "$orderby=itemName asc"

// Sắp xếp theo nhiều cột
QueryOptionsBuilder.create()
  .orderBy('itemName', 'asc')
  .orderBy('createdAt', 'desc')
  .buildQueryString();
// Result: "$orderby=itemName asc, createdAt desc"
```

### 3. Select - Chọn cột

```typescript
QueryOptionsBuilder.create()
  .select(['id', 'itemCode', 'itemName'])
  .buildQueryString();
// Result: "$select=id,itemCode,itemName"
```

### 4. Pagination - Phân trang

#### Cách 1: Sử dụng page và pageSize
```typescript
// Trang 1, mỗi trang 20 bản ghi
QueryOptionsBuilder.create()
  .paginate(1, 20)
  .buildQueryString();
// Result: "$skip=0&$top=20"

// Trang 2, mỗi trang 20 bản ghi
QueryOptionsBuilder.create()
  .paginate(2, 20)
  .buildQueryString();
// Result: "$skip=20&$top=20"
```

#### Cách 2: Sử dụng skip và top trực tiếp
```typescript
QueryOptionsBuilder.create()
  .skipAndTop(20, 10)
  .buildQueryString();
// Result: "$skip=20&$top=10"
```

### 5. Query đầy đủ

```typescript
const queryString = QueryOptionsBuilder.create()
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

// Result: 
// "$filter=isActive eq true and contains(itemName, 'Vàng')&$orderby=itemName asc, createdAt desc&$select=id,itemCode,itemName,price&$skip=0&$top=20"
```

## Use Cases thực tế

### 1. API Service

```typescript
// items.service.ts
export class ItemsService {
  async getItems(params: {
    page?: number;
    pageSize?: number;
    searchText?: string;
    isActive?: boolean;
    itemGroupId?: string;
  }) {
    const queryString = QueryOptionsBuilder.create()
      .filter(f => {
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

        return filter;
      })
      .orderBy('itemName', 'asc')
      .paginate(params.page || 1, params.pageSize || 20)
      .buildQueryString();

    const response = await fetch(`/api/items?${queryString}`);
    return response.json();
  }

  async getItemsByPriceRange(minPrice: number, maxPrice: number) {
    const queryString = QueryOptionsBuilder.create()
      .filter(f =>
        f.equals('isActive', true)
          .and()
          .greaterThanOrEqual('price', minPrice)
          .and()
          .lessThanOrEqual('price', maxPrice)
      )
      .orderBy('price', 'asc')
      .buildQueryString();

    const response = await fetch(`/api/items?${queryString}`);
    return response.json();
  }
}
```

### 2. React Hook

```typescript
// useItems.ts
import { useState, useEffect } from 'react';
import { QueryOptionsBuilder, FilterBuilder } from '@/shared/utils/queryOptionsBuilder';

export function useItems(options: {
  searchText?: string;
  isActive?: boolean;
  page?: number;
  pageSize?: number;
}) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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

    fetch(`/api/items?${queryString}`)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setIsLoading(false);
      });
  }, [options.searchText, options.isActive, options.page, options.pageSize]);

  return { data, isLoading };
}
```

### 3. Next.js Server Component

```typescript
// app/items/page.tsx
import { QueryOptionsBuilder, FilterBuilder } from '@/shared/utils/queryOptionsBuilder';

export default async function ItemsPage({
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

  return <ItemsList data={data} />;
}
```

### 4. Redux Toolkit Query

```typescript
// itemsApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { QueryOptionsBuilder } from '@/shared/utils/queryOptionsBuilder';

export const itemsApi = createApi({
  reducerPath: 'itemsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getItems: builder.query({
      query: (params: {
        page?: number;
        pageSize?: number;
        searchText?: string;
        isActive?: boolean;
      }) => {
        const queryString = QueryOptionsBuilder.create()
          .filter(f => {
            let filter = FilterBuilder.create();
            if (params.isActive !== undefined) {
              filter = filter.equals('isActive', params.isActive);
            }
            if (params.searchText) {
              if (params.isActive !== undefined) filter = filter.and();
              filter = filter.contains('itemName', params.searchText);
            }
            return filter;
          })
          .orderBy('itemName', 'asc')
          .paginate(params.page || 1, params.pageSize || 20)
          .buildQueryString();

        return `items?${queryString}`;
      },
    }),
  }),
});

export const { useGetItemsQuery } = itemsApi;
```

## Tips & Best Practices

### 1. Sử dụng điều kiện động

```typescript
function buildFilter(params: any) {
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

  return filter;
}
```

### 2. Tái sử dụng filter

```typescript
// Tạo filter cơ bản
const activeFilter = FilterBuilder.create()
  .equals('isActive', true);

// Thêm điều kiện vào filter có sẵn
const fullFilter = activeFilter
  .and()
  .contains('itemName', 'Vàng')
  .build();
```

### 3. Filter phức tạp

```typescript
// (isActive eq true) and 
// ((contains(itemName, 'Vàng') or contains(itemName, 'Bạc')) and 
// (price gt 1000 and price lt 5000))

const filter = FilterBuilder.create()
  .equals('isActive', true)
  .and()
  .group(f => 
    f.group(g => 
        g.contains('itemName', 'Vàng')
          .or()
          .contains('itemName', 'Bạc')
      )
      .and()
      .group(g => 
        g.greaterThan('price', 1000)
          .and()
          .lessThan('price', 5000)
      )
  )
  .build();
```

### 4. Xử lý string có ký tự đặc biệt

Builder tự động escape các ký tự đặc biệt:

```typescript
FilterBuilder.create()
  .contains('itemName', "Vàng 24K (99.99%)")
  .build();
// Tự động escape quote: contains(itemName, 'Vàng 24K (99.99%)')
```

## Tham khảo thêm

- Xem file `queryOptionsBuilder.examples.ts` để có thêm ví dụ chi tiết
- Tham khảo LAYOUT_GUIDE.md về chuẩn OData
