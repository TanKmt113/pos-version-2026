# API Client Documentation

## Tổng quan

Hệ thống API Client được thiết kế để làm việc với cấu trúc response chuẩn từ Backend:

### Success Response
```json
{
  "isSuccess": true,
  "error": null,
  "errors": null,
  "value": { ... }  // Data object hoặc array
}
```

### Error Response
```json
{
  "isSuccess": false,
  "error": "Mô tả lỗi chính",
  "errors": ["Lỗi 1", "Lỗi 2"],
  "value": null
}
```

## Cấu trúc Files

```
src/infrastructure/api-clients/
├── httpClient.ts           # Axios instance với interceptors
├── apiHelpers.ts          # Helper utilities
└── API_USAGE_EXAMPLES.ts  # Ví dụ sử dụng

src/shared/base/
└── baseService.ts         # Base class cho services
```

## httpClient

### ApiResponse Interface

```typescript
interface ApiResponse<T = any> {
    isSuccess: boolean;
    error: string | null;
    errors: string[] | null;
    value: T | null;
}
```

### ApiError Class

```typescript
class ApiError extends Error {
    status: number;
    error: string;
    errors: string[] | null;
    code: string;
}
```

### Automatic Response Handling

HttpClient tự động:
1. ✅ Unwrap `value` từ `ApiResponse` khi success
2. ✅ Throw `ApiError` khi `isSuccess = false`
3. ✅ Xử lý authentication (401 - redirect to login)
4. ✅ Xử lý authorization (403)
5. ✅ Log errors ra console

### Configuration

```typescript
// Trong .env hoặc .env.local
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## BaseService

### Tạo Service mới

```typescript
import { BaseService } from '@/shared/base/baseService';

interface Item {
  id: string;
  name: string;
}

class ItemService extends BaseService {
  private readonly baseUrl = '/api/items';

  async getAll(): Promise<Item[]> {
    // httpClient đã tự động unwrap value
    const response = await this.http.get<Item[]>(this.baseUrl);
    return response.data; // Đây chính là value từ ApiResponse
  }

  async getById(id: string): Promise<Item> {
    const response = await this.http.get<Item>(`${this.baseUrl}/${id}`);
    return response.data;
  }

  async create(data: Omit<Item, 'id'>): Promise<Item> {
    const response = await this.http.post<Item>(this.baseUrl, data);
    this.logActivity(`Created item: ${response.data.name}`);
    return response.data;
  }

  async update(id: string, data: Partial<Item>): Promise<Item> {
    const response = await this.http.put<Item>(`${this.baseUrl}/${id}`, data);
    return response.data;
  }

  async delete(id: string): Promise<void> {
    await this.http.delete(`${this.baseUrl}/${id}`);
    this.logActivity(`Deleted item: ${id}`);
  }
}
```

## API Helpers

### handleApiCall

Wrapper cho API calls với error handling tự động:

```typescript
import { handleApiCall } from '@/infrastructure/api-clients/apiHelpers';

const items = await handleApiCall(
  () => itemService.getAll(),
  {
    defaultValue: [],      // Giá trị mặc định khi có lỗi
    logError: true,        // Log error ra console
    onError: (error) => {  // Custom error handler
      toast.error(error.error);
    }
  }
);
```

### getErrorMessage / getAllErrorMessages

Lấy error messages từ error:

```typescript
import { getErrorMessage, getAllErrorMessages } from '@/infrastructure/api-clients/apiHelpers';

try {
  await itemService.create(data);
} catch (error) {
  // Lấy main error
  const message = getErrorMessage(error);
  console.error(message);

  // Lấy tất cả errors (bao gồm cả validation errors)
  const allMessages = getAllErrorMessages(error);
  allMessages.forEach(msg => console.error(msg));
}
```

### formatErrorMessages

Format errors thành string:

```typescript
import { formatErrorMessages } from '@/infrastructure/api-clients/apiHelpers';

try {
  await itemService.create(data);
} catch (error) {
  // Format với newline
  const formatted = formatErrorMessages(error, '\n');
  alert(formatted);

  // Format với separator khác
  const formatted2 = formatErrorMessages(error, ' | ');
  // Output: "Main error | Validation error 1 | Validation error 2"
}
```

### retryApiCall

Retry API call với số lần thử lại:

```typescript
import { retryApiCall } from '@/infrastructure/api-clients/apiHelpers';

const items = await retryApiCall(
  () => itemService.getAll(),
  {
    maxRetries: 3,        // Số lần thử lại
    delay: 1000,          // Delay giữa các lần thử (ms)
    onRetry: (attempt, error) => {
      console.log(`Retry ${attempt}:`, error.error);
    }
  }
);
```

**Lưu ý:** Chỉ retry cho 5xx errors, không retry cho 4xx errors.

### batchApiCalls

Gọi nhiều API calls và xử lý kết quả:

```typescript
import { batchApiCalls } from '@/infrastructure/api-clients/apiHelpers';

const ids = ['1', '2', '3', '4', '5'];

const results = await batchApiCalls(
  ids.map(id => () => itemService.getById(id)),
  {
    continueOnError: true,  // Tiếp tục nếu có lỗi
    onError: (error, index) => {
      console.error(`Failed at index ${index}:`, error.error);
    }
  }
);

// Filter out null values (failed requests)
const items = results.filter(item => item !== null);
```

## Sử dụng trong React

### 1. Basic Hook

```typescript
import { useState, useEffect } from 'react';
import { getErrorMessage } from '@/infrastructure/api-clients/apiHelpers';

function useItems() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);

      try {
        const service = new ItemService();
        const data = await service.getAll();
        setItems(data);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { items, loading, error };
}
```

### 2. React Query

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getErrorMessage, formatErrorMessages } from '@/infrastructure/api-clients/apiHelpers';

// Query
function useItemsQuery() {
  return useQuery({
    queryKey: ['items'],
    queryFn: async () => {
      const service = new ItemService();
      return service.getAll();
    },
    retry: 3,
  });
}

// Mutation
function useCreateItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Omit<Item, 'id'>) => {
      const service = new ItemService();
      return service.create(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
    },
    onError: (error) => {
      alert(formatErrorMessages(error, '\n'));
    }
  });
}

// Component
function ItemsPage() {
  const { data: items, isLoading, error } = useItemsQuery();
  const createMutation = useCreateItem();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {getErrorMessage(error)}</div>;

  return <div>{/* Render items */}</div>;
}
```

### 3. Redux Toolkit

```typescript
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ApiError } from '@/infrastructure/api-clients/httpClient';

export const fetchItems = createAsyncThunk(
  'items/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const service = new ItemService();
      return await service.getAll();
    } catch (error) {
      if (error instanceof ApiError) {
        return rejectWithValue({
          error: error.error,
          errors: error.errors
        });
      }
      return rejectWithValue({ error: 'Unknown error' });
    }
  }
);

const itemsSlice = createSlice({
  name: 'items',
  initialState: {
    items: [] as Item[],
    loading: false,
    error: null as string | null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload?.error || 'Failed to load items';
      });
  }
});
```

### 4. Next.js Server Component

```typescript
import { getErrorMessage } from '@/infrastructure/api-clients/apiHelpers';

async function ItemsPage() {
  try {
    const service = new ItemService();
    const items = await service.getAll();

    return (
      <div>
        {items.map(item => (
          <div key={item.id}>{item.name}</div>
        ))}
      </div>
    );
  } catch (error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{getErrorMessage(error)}</p>
      </div>
    );
  }
}
```

## Error Handling Patterns

### 1. Try-Catch

```typescript
try {
  const item = await itemService.getById(id);
  console.log(item);
} catch (error) {
  if (error instanceof ApiError) {
    console.error('Status:', error.status);
    console.error('Error:', error.error);
    console.error('Errors:', error.errors);
  }
}
```

### 2. Với Default Value

```typescript
const items = await handleApiCall(
  () => itemService.getAll(),
  { defaultValue: [] }
) || [];
```

### 3. Với Custom Error Handler

```typescript
await handleApiCall(
  () => itemService.create(data),
  {
    onError: (error) => {
      // Show toast
      toast.error(error.error);
      
      // Show validation errors
      if (error.errors) {
        error.errors.forEach(err => toast.error(err));
      }
    }
  }
);
```

### 4. Form Validation Errors

```typescript
try {
  await itemService.create(formData);
  toast.success('Created successfully!');
} catch (error) {
  if (error instanceof ApiError) {
    // Main error
    setFormError(error.error);
    
    // Field-specific errors
    if (error.errors) {
      error.errors.forEach(err => {
        // Parse field error: "itemCode: Item code is required"
        const [field, message] = err.split(':').map(s => s.trim());
        setFieldError(field, message);
      });
    }
  }
}
```

## Best Practices

### 1. Tạo Service cho mỗi Resource

```typescript
// itemService.ts
export class ItemService extends BaseService {
  // ...
}

// customerService.ts
export class CustomerService extends BaseService {
  // ...
}
```

### 2. Export Service Instance

```typescript
// itemService.ts
export class ItemService extends BaseService {
  // ...
}

export const itemService = new ItemService();

// Usage
import { itemService } from '@/services/itemService';
const items = await itemService.getAll();
```

### 3. Sử dụng TypeScript Generics

```typescript
async getAll<T>(): Promise<T[]> {
  const response = await this.http.get<T[]>(this.baseUrl);
  return response.data;
}
```

### 4. Logging

```typescript
async create(data: CreateItemDto): Promise<Item> {
  const response = await this.http.post<Item>(this.baseUrl, data);
  this.logActivity(`Created item: ${response.data.itemCode}`);
  return response.data;
}
```

### 5. Error Context

```typescript
try {
  await itemService.create(data);
} catch (error) {
  this.logError(error, 'ItemForm.handleSubmit');
  throw error;
}
```

## Testing

### Mock HttpClient

```typescript
import { jest } from '@jest/globals';

// Mock successful response
jest.spyOn(httpClient, 'get').mockResolvedValue({
  data: [{ id: '1', name: 'Item 1' }]
});

// Mock error response
jest.spyOn(httpClient, 'post').mockRejectedValue(
  new ApiError(400, 'Validation error', ['Field is required'])
);
```

### Test Service

```typescript
describe('ItemService', () => {
  it('should get all items', async () => {
    const service = new ItemService();
    const items = await service.getAll();
    expect(items).toHaveLength(1);
  });

  it('should handle error', async () => {
    const service = new ItemService();
    await expect(service.create({})).rejects.toThrow(ApiError);
  });
});
```

## Troubleshooting

### Response không đúng format

Nếu API không trả về đúng format `ApiResponse`, interceptor sẽ pass through response gốc để backward compatibility.

### 401 Unauthorized

HttpClient tự động clear token và redirect về `/login` khi nhận 401.

### TypeScript Errors

Đảm bảo import đúng types:

```typescript
import { ApiResponse, ApiError } from '@/infrastructure/api-clients/httpClient';
```

## Migration từ Code cũ

### Trước

```typescript
try {
  const response = await axios.get('/api/items');
  const items = response.data; // Trực tiếp lấy data
} catch (error) {
  console.error(error.response?.data?.message);
}
```

### Sau

```typescript
try {
  const response = await httpClient.get<Item[]>('/api/items');
  const items = response.data; // Đã được unwrap từ ApiResponse.value
} catch (error) {
  if (error instanceof ApiError) {
    console.error(error.error);
  }
}
```

## Xem thêm

- [API_USAGE_EXAMPLES.ts](./API_USAGE_EXAMPLES.ts) - Ví dụ chi tiết
- [httpClient.ts](./httpClient.ts) - Implementation
- [apiHelpers.ts](./apiHelpers.ts) - Helper utilities
