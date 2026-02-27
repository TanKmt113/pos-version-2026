# 1.4.1. Quy Trình Thêm Mới Chi Nhánh

## Mô tả
Khi doanh nghiệp mở rộng và mở thêm cửa hàng mới, Super Admin cần thêm chi nhánh vào hệ thống để bắt đầu vận hành.

---

## Actor & Hệ thống liên quan

### Primary actor
- **Super Admin** (người dùng Back Office)

### Thành phần/hệ thống trong phạm vi Back Office
- Back Office UI
- Branch API/Service
- Validation component
- Branch Database
- Audit/Log Service
- RBAC/Permission Service
- Message Queue/Event Bus

### Hệ thống ngoài (tích hợp)
- LocationService (xác thực địa chỉ)
- Inventory Service (khởi tạo tồn kho)
- Reporting Service (tạo dashboard chi nhánh)
- CRM System (cập nhật danh sách địa điểm)
- Email Service (gửi email cho Branch Manager)

---

## Use case: UC-1.4.1 – Thêm mới chi nhánh

### Mục tiêu
Tạo chi nhánh mới để bắt đầu vận hành, đồng thời khởi tạo các dữ liệu liên quan và đồng bộ sang các hệ thống khác.

### Tiền điều kiện (Pre-conditions)
- Super Admin đã đăng nhập.
- Super Admin có quyền “Quản lý chi nhánh”.
- Danh mục Ward/District/City và dữ liệu nhân viên (manager) tồn tại.

### Hậu điều kiện (Post-conditions) khi thành công
- Tạo Branch với `status = "ACTIVE"`.
- Tạo Default Warehouse cho Branch.
- Tạo nhóm quyền mặc định cho nhân viên chi nhánh.
- Ghi audit log tạo chi nhánh.
- Phát event `BRANCH_CREATED` sang Message Queue để hệ thống khác đồng bộ.
- Gửi email thông báo cho Branch Manager được gán.

---

## Các bước thực hiện (Flow)

1. **Khởi tạo yêu cầu**
   - Super Admin đăng nhập vào Back Office
   - Điều hướng đến menu **"Quản lý chi nhánh"**
   - Chọn nút **"Thêm chi nhánh mới"**
2. **Nhập thông tin chi nhánh**
   - Tên, mã chi nhánh (bắt buộc, duy nhất)
   - Địa chỉ chi tiết, phường/xã, quận/huyện, tỉnh/thành phố
   - Số điện thoại, email (tùy chọn)
   - Giờ mở cửa, đóng cửa
   - Gán người quản lý chi nhánh
   - Múi giờ, đơn vị tiền tệ
3. **Xác thực dữ liệu**
   - Kiểm tra trùng tên/mã
   - Kiểm tra định dạng số điện thoại, email
   - Xác thực địa chỉ qua LocationService
   - Kiểm tra manager_id hợp lệ
4. **Lưu thông tin và tạo dữ liệu liên quan**
   - Lưu branch vào database (status = ACTIVE)
   - Tạo kho hàng mặc định, nhóm quyền mặc định
   - Ghi log lịch sử
5. **Đồng bộ hệ thống liên quan**
   - Gửi event BRANCH_CREATED đến MQ
   - Inventory Service, Reporting Service, CRM System nhận event và xử lý
6. **Thông báo kết quả**
   - Hiển thị thông báo thành công, chuyển hướng chi tiết, gửi email cho Branch Manager

---

## Input / Output

### Input (request body)
```json
{
  "code": "HN_CAU_GIAY_01",
  "name": "POS Hà Nội - Cầu Giấy 01",
  "address_line": "255 Xuân Thủy",
  "ward_id": "W123",
  "district_id": "D456",
  "city_id": "C001",
  "phone": "0988123456",
  "email": "caugiay01@pos.vn",
  "open_time": "08:00",
  "close_time": "22:00",
  "manager_id": 50,
  "currency": "VND",
  "timezone": "Asia/Ho_Chi_Minh"
}
```

### Output các trường hợp

#### 1. Thành công (Success)
```json
{
  "success": true,
  "data": {
    "id": 101,
    "code": "HN_CAU_GIAY_01",
    "name": "POS Hà Nội - Cầu Giấy 01",
    "status": "ACTIVE",
    "default_warehouse_id": 301,
    "created_at": "2026-02-24T09:00:00Z",
    "created_by": 1
  },
  "message": "Thêm mới chi nhánh thành công"
}
```

#### 2. Lỗi trùng tên chi nhánh
```json
{
  "success": false,
  "error": {
    "code": "BRANCH_NAME_DUPLICATED",
    "field": "name",
    "message": "Tên chi nhánh đã tồn tại"
  }
}
```

#### 3. Lỗi trùng mã chi nhánh
```json
{
  "success": false,
  "error": {
    "code": "BRANCH_CODE_DUPLICATED",
    "field": "code",
    "message": "Mã chi nhánh đã tồn tại"
  }
}
```

#### 4. Lỗi định dạng phone/email
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Dữ liệu không hợp lệ",
    "details": [
      { "field": "phone", "message": "Số điện thoại không đúng định dạng" },
      { "field": "email", "message": "Email không đúng định dạng" }
    ]
  }
}
```

#### 5. Lỗi địa chỉ không hợp lệ (LocationService)
```json
{
  "success": false,
  "error": {
    "code": "LOCATION_INVALID",
    "message": "Địa chỉ không tồn tại hoặc không hợp lệ",
    "details": [
      { "field": "ward_id", "message": "Phường/Xã không hợp lệ" }
    ]
  }
}
```

#### 6. Lỗi manager_id không tồn tại
```json
{
  "success": false,
  "error": {
    "code": "MANAGER_NOT_FOUND",
    "field": "manager_id",
    "message": "Không tìm thấy nhân viên quản lý"
  }
}
```

#### 7. Lỗi manager đã quản lý chi nhánh khác
```json
{
  "success": false,
  "error": {
    "code": "MANAGER_ALREADY_ASSIGNED",
    "field": "manager_id",
    "message": "Nhân viên này đã được gán quản lý cho chi nhánh khác"
  }
}
```

#### 8. Thành công (async) – Tạo branch OK, đồng bộ qua event xử lý sau
```json
{
  "success": true,
  "data": {
    "id": 101,
    "code": "HN_CAU_GIAY_01",
    "name": "POS Hà Nội - Cầu Giấy 01",
    "status": "ACTIVE",
    "default_warehouse_id": 301,
    "created_at": "2026-02-24T09:00:00Z",
    "created_by": 1
  },
  "message": "Thêm mới chi nhánh thành công"
}
```

---

## Sơ đồ tổng quan quy trình

![Sơ đồ tổng quan quy trình thêm mới chi nhánh](./add-branch-diagram.png)

---

## Lưu ý triển khai
- Chuẩn hóa lỗi trả về, highlight đúng field trên UI
- Hỗ trợ Idempotency-Key cho POST tránh tạo trùng
- DB cần unique index code, name để chống race khi tạo đồng thời
