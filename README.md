# Next.js Clean Architecture (Feature-Based Module)

Dự án này được xây dựng dựa trên nguyên lý **Clean Architecture** kết hợp với kiến trúc **Module-based**. Mục tiêu là tách biệt rõ ràng giữa logic kỹ thuật và logic nghiệp vụ, giúp hệ thống dễ bảo trì, dễ mở rộng và dễ kiểm thử.

---

## 🏷️ Quy tắc đặt tên (Naming Convention)

Để đảm bảo tính nhất quán trên toàn bộ dự án, các thành viên cần tuân thủ nghiêm ngặt các quy tắc sau:

### 1. Quy ước chung về định dạng
| Đối tượng | Quy ước (Convention) | Ví dụ |
| :--- | :--- | :--- |
| **Folder** | `kebab-case` | `auth-module`, `user-profile` |
| **File** | `camelCase.ts` / `PascalCase.tsx` | `httpClient.ts`, `Button.tsx` |
| **Constant** | `SCREAMING_SNAKE_CASE` | `API_URL`, `MAX_RETRY` |

### 2. Quy tắc đặt tên chi tiết (Biến, Hàm, Component)

#### 🔹 Component (PascalCase)
* Phải là danh từ và sử dụng **PascalCase**.
* Tên Component nên phản ánh chức năng hoặc vị trí.
* *Ví dụ:* `LoginForm.tsx`, `Sidebar.tsx`, `UserCard.tsx`.

#### 🔹 Function (camelCase)
* Phải bắt đầu bằng một **Động từ** (Verb).
* **Service:** Đặt tên theo nghiệp vụ: `login()`, `logout()`, `getProfile()`.
* **UI Event:** Bắt đầu bằng tiền tố `handle`. Ví dụ: `handleSubmit()`, `handleChange()`.
* **Hàm bổ trợ:** `formatDate()`, `validateEmail()`, `calculateTotal()`.

#### 🔹 Hooks (camelCase)
* Luôn bắt đầu bằng tiền tố `use`.
* *Ví dụ:* `useAuth()`, `useProfile()`, `useDebounce()`.

#### 🔹 Biến - Variables (camelCase)
* **Danh từ số ít/nhiều:** `const user = {}` / `const users = []`.
* **Boolean:** Phải bắt đầu bằng: `is`, `has`, `can`, `should`.
    * *Ví dụ:* `isLoggedIn`, `hasPermission`, `canEdit`, `shouldRender`.
* ⚠️ **Tránh:** `const data`, `const temp`, `const item`.
* ✅ **Nên:** `const userData`, `const tempFile`, `const selectedItem`.

---

## 📂 Chi tiết cấu trúc thư mục (Folder Explanations)

### 1. `src/infrastructure/` (Tầng Hạ tầng)
Đây là lớp tiếp xúc với các thư viện bên ngoài và môi trường thực thi.
* **`api-clients/`**: Chứa cấu hình `httpClient.ts` (Axios). Thực hiện **Level 1 Error Handling**.
* **`storage/`**: Quản lý việc lưu trữ (LocalStorage, Cookies).
* **`config/`**: Quản lý biến môi trường và các hằng số hệ thống.

### 2. `src/shared/` (Tầng Dùng chung)
Chứa các tài nguyên có thể tái sử dụng ở bất kỳ module nào.
* **`ui/`**: Các Atomic Components (Button, Input, Modal...) không chứa logic nghiệp vụ.
* **`base/`**: Chứa `BaseService.ts` cung cấp các phương thức HTTP cơ bản.
* **`types/`**: Định nghĩa các Interface chung.
* **`utils/`**: Các hàm tiện ích (format date, validate).

### 3. `src/modules/` (Tầng Nghiệp vụ - Feature Layer)
Mỗi tính năng được đóng gói trong một thư mục riêng biệt.
* **`types.ts`**: Định nghĩa Model/Interface của riêng module.
* **`api.ts`**: Danh sách các Endpoints.
* **`services/`**: Thực hiện **Level 2 Error Handling** và Logic nghiệp vụ.
* **`hooks/`**: Thực hiện **Level 3 Error Handling** và quản lý UI State.
* **`components/`**: Các UI Components đặc thù của tính năng.

### 4. `src/app/` (Tầng Giao diện & Routing)
Sử dụng Next.js App Router.
* Chỉ đóng vai trò là "người lắp ghép" các Components từ module vào trang.
* Quản lý Metadata (SEO) và Layout hệ thống.

---

## 🔄 Luồng dữ liệu & Xử lý lỗi (Data Flow & Error Handling)

Hệ thống áp dụng quy trình xử lý lỗi 3 cấp độ:

1. **Level 1 (Infrastructure)**: `httpClient` bắt lỗi HTTP thô từ Axios.
2. **Level 2 (Service)**: Chuyển đổi lỗi kỹ thuật thành thông báo nghiệp vụ thân thiện.
3. **Level 3 (UI/Hook)**: Sử dụng `try-catch` để bắt lỗi và hiển thị lên UI qua Toast/Alert.

---

## 🛠 Nguyên tắc phát triển (Development Principles)

* **Tính độc lập**: Tầng `Infrastructure` không được biết về sự tồn tại của UI.
* **Tính đóng gói**: Mọi thứ thuộc về tính năng `Auth` phải nằm trong `modules/auth`.
* **Tính nhất quán**: Tuyệt đối tuân thủ các quy tắc đặt tên biến và hàm để đảm bảo Clean Code.

----

## 🚀 Cách thêm tính năng mới

1. Tạo thư mục mới trong `src/modules/{feature_name}`.
2. Định nghĩa Types ⮕ Khai báo API ⮕ Viết Service ⮕ Tạo Hook quản lý UI.
3. Import Component vào `src/app/{route}/page.tsx`.
