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

### 1) Khởi tạo yêu cầu
- Super Admin đăng nhập vào Back Office
- Điều hướng đến menu **"Quản lý chi nhánh"**
- Chọn nút **"Thêm chi nhánh mới"**

### 2) Nhập thông tin chi nhánh
- Thông tin định danh:
  - Tên chi nhánh (bắt buộc, duy nhất)
  - Mã chi nhánh (bắt buộc, duy nhất, có thể tự sinh)
- Thông tin địa lý:
  - Địa chỉ chi tiết (số nhà, tên đường)
  - Phường/Xã (chọn từ danh mục)
  - Quận/Huyện (chọn từ danh mục)
  - Tỉnh/Thành phố (chọn từ danh mục)
- Thông tin liên hệ:
  - Số điện thoại chi nhánh
  - Email chi nhánh (tùy chọn)
- Thông tin vận hành:
  - Giờ mở cửa (HH:MM)
  - Giờ đóng cửa (HH:MM)
  - Gán người quản lý chi nhánh (chọn từ danh sách nhân viên)
- Cấu hình bổ sung:
  - Múi giờ (timezone)
  - Đơn vị tiền tệ (currency)

### 3) Xác thực dữ liệu
- Kiểm tra tên và mã chi nhánh không trùng lặp
- Validate định dạng số điện thoại, email
- Gọi LocationService để xác thực địa chỉ có tồn tại và hợp lệ
- Kiểm tra `manager_id` có tồn tại và chưa quản lý chi nhánh khác

### 4) Lưu thông tin và tạo dữ liệu liên quan
- Lưu bản ghi chi nhánh mới vào database với trạng thái `"ACTIVE"`
- Tự động tạo kho hàng mặc định (Default Warehouse) cho chi nhánh
- Tạo nhóm quyền mặc định cho nhân viên chi nhánh
- Ghi log lịch sử tạo chi nhánh

### 5) Đồng bộ với các hệ thống liên quan
- Gửi event `"BRANCH_CREATED"` đến Message Queue
- Inventory Service nhận thông báo và khởi tạo tồn kho
- Reporting Service tạo dashboard cho chi nhánh mới
- CRM System cập nhật danh sách địa điểm

### 6) Thông báo kết quả
- Hiển thị thông báo `"Thêm mới chi nhánh thành công"`
- Chuyển hướng đến trang chi tiết chi nhánh vừa tạo
- Gửi email thông báo cho Branch Manager được gán

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
Output thành công (Happy path)
json
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
Các trường hợp (Scenarios) của use case (thể hiện bằng Output)
1) Success – Tạo chi nhánh thành công
json
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
2) Fail – Trùng tên chi nhánh
json
{
  "success": false,
  "error": {
    "code": "BRANCH_NAME_DUPLICATED",
    "field": "name",
    "message": "Tên chi nhánh đã tồn tại"
  }
}
3) Fail – Trùng mã chi nhánh
json
{
  "success": false,
  "error": {
    "code": "BRANCH_CODE_DUPLICATED",
    "field": "code",
    "message": "Mã chi nhánh đã tồn tại"
  }
}
4) Fail – Sai định dạng phone/email
json
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
5) Fail – Địa chỉ không hợp lệ (LocationService)
json
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
6) Fail – manager_id không tồn tại
json
{
  "success": false,
  "error": {
    "code": "MANAGER_NOT_FOUND",
    "field": "manager_id",
    "message": "Không tìm thấy nhân viên quản lý"
  }
}
7) Fail – manager đã quản lý chi nhánh khác
json
{
  "success": false,
  "error": {
    "code": "MANAGER_ALREADY_ASSIGNED",
    "field": "manager_id",
    "message": "Nhân viên này đã được gán quản lý cho chi nhánh khác"
  }
}
8) Success (async) – Tạo branch OK, đồng bộ qua event xử lý sau
json
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
Use case diagram (PlantUML)
text
@startuml
left to right direction

actor "Super Admin" as SA

rectangle "Back Office System" {
  usecase "UC-1.4.1\nThêm mới chi nhánh" as UC1
  usecase "Xác thực dữ liệu" as UC1a
  usecase "Tạo Default Warehouse" as UC1b
  usecase "Tạo nhóm quyền mặc định" as UC1c
  usecase "Ghi log lịch sử" as UC1d
  usecase "Phát event BRANCH_CREATED" as UC1e
  usecase "Gửi email cho Branch Manager" as UC1f
}

SA --> UC1
UC1 .> UC1a : <<include>>
UC1 .> UC1b : <<include>>
UC1 .> UC1c : <<include>>
UC1 .> UC1d : <<include>>
UC1 .> UC1e : <<include>>
UC1 .> UC1f : <<include>>

actor "LocationService" as LS
actor "Inventory Service" as IS
actor "Reporting Service" as RS
actor "CRM System" as CRM
actor "Email Service" as ES
queue "Message Queue" as MQ

UC1a --> LS
UC1e --> MQ
MQ --> IS
MQ --> RS
MQ --> CRM
UC1f --> ES
@enduml
Sequence diagram – Happy path (PlantUML)
text
@startuml
autonumber

actor "Super Admin" as SA
boundary "Back Office UI" as UI
control "Branch API/Service" as BranchSvc
control "Validation" as Val
entity "Branch DB" as DB
control "LocationService" as LocSvc
control "Warehouse Service" as WhSvc
control "RBAC/Permission Service" as RbacSvc
control "Audit Log Service" as AuditSvc
queue "Message Queue" as MQ
control "Inventory Service" as InvSvc
control "Reporting Service" as RepSvc
control "CRM System" as CrmSvc
control "Email Service" as EmailSvc

SA -> UI : Mở "Quản lý chi nhánh"\nChọn "Thêm chi nhánh mới"
UI -> BranchSvc : POST /branches (input JSON)

BranchSvc -> Val : Validate required fields\n+ phone/email format\n+ open/close time
Val --> BranchSvc : OK

BranchSvc -> DB : Check unique(name, code)
DB --> BranchSvc : Not exists

BranchSvc -> LocSvc : Validate address(ward_id,\ndistrict_id, city_id, address_line)
LocSvc --> BranchSvc : Address valid

BranchSvc -> DB : Check manager_id exists\nand not assigned
DB --> BranchSvc : OK

BranchSvc -> DB : Insert Branch(status=ACTIVE)\nreturn branch_id
DB --> BranchSvc : branch_id=101

BranchSvc -> WhSvc : Create default warehouse(branch_id=101)
WhSvc --> BranchSvc : default_warehouse_id=301

BranchSvc -> RbacSvc : Create default roles/groups\nfor branch_id=101
RbacSvc --> BranchSvc : OK

BranchSvc -> AuditSvc : Write audit log\n(BRANCH_CREATED by created_by)
AuditSvc --> BranchSvc : OK

BranchSvc -> MQ : Publish event BRANCH_CREATED\n(branch_id=101, warehouse_id=301)
MQ --> BranchSvc : ACK

par Async consumers
  MQ -> InvSvc : BRANCH_CREATED
  InvSvc --> MQ : ACK (init inventory)
and
  MQ -> RepSvc : BRANCH_CREATED
  RepSvc --> MQ : ACK (create dashboard)
and
  MQ -> CrmSvc : BRANCH_CREATED
  CrmSvc --> MQ : ACK (update location list)
end

BranchSvc -> EmailSvc : Send email to Branch Manager\n(manager_id=50)
EmailSvc --> BranchSvc : Accepted

BranchSvc --> UI : 200 OK (success=true + data)
UI --> SA : Thông báo thành công\n+ chuyển trang chi tiết

@enduml
Mechanism – Happy path
AuthN/AuthZ: UI gửi access token; BranchSvc kiểm tra quyền Super Admin.

Validation: required fields, format (phone/email), logic time (open < close), tính duy nhất (name/code).

Consistency: tạo branch + default warehouse + quyền + audit nên chạy trong transaction hoặc cơ chế saga nội bộ.

Integration: phát event BRANCH_CREATED qua MQ, các hệ thống Inventory/Reporting/CRM xử lý bất đồng bộ.

Notification: EmailSvc xử lý kiểu queued/accepted để không chặn response.

Sequence diagram – Alternative flows (PlantUML)
text
@startuml
autonumber

actor "Super Admin" as SA
boundary "Back Office UI" as UI
control "Branch API/Service" as BranchSvc
control "Validation" as Val
entity "Branch DB" as DB
control "LocationService" as LocSvc

SA -> UI : Submit form thêm chi nhánh
UI -> BranchSvc : POST /branches (input)

BranchSvc -> Val : Validate required/format
alt Validation error (phone/email/time missing/invalid)
  Val --> BranchSvc : Fail + details
  BranchSvc --> UI : 400 VALIDATION_ERROR
  UI --> SA : Hiển thị lỗi theo field
else OK
  Val --> BranchSvc : OK
  BranchSvc -> DB : Check unique(name, code)
  alt name duplicated
    DB --> BranchSvc : name exists
    BranchSvc --> UI : 409 BRANCH_NAME_DUPLICATED
    UI --> SA : Báo trùng tên
  else code duplicated
    DB --> BranchSvc : code exists
    BranchSvc --> UI : 409 BRANCH_CODE_DUPLICATED
    UI --> SA : Báo trùng mã
  else unique OK
    DB --> BranchSvc : OK
    BranchSvc -> LocSvc : Validate address
    alt Location invalid/not found
      LocSvc --> BranchSvc : Fail
      BranchSvc --> UI : 422 LOCATION_INVALID
      UI --> SA : Báo địa chỉ không hợp lệ
    else Location valid
      LocSvc --> BranchSvc : OK
      BranchSvc -> DB : Check manager exists & not assigned
      alt manager not found
        DB --> BranchSvc : manager missing
        BranchSvc --> UI : 404 MANAGER_NOT_FOUND
        UI --> SA : Báo không tìm thấy manager
      else manager already assigned
        DB --> BranchSvc : already assigned
        BranchSvc --> UI : 409 MANAGER_ALREADY_ASSIGNED
        UI --> SA : Báo manager đã được gán
      end
    end
  end
end

@enduml
Mechanism – Alternative flows
Error mapping: chuẩn hoá HTTP status (400 validation, 409 conflict, 422 location semantic, 404 not found) và trả lỗi theo field/details để UI highlight đúng ô.

Idempotency (khuyến nghị): hỗ trợ Idempotency-Key cho POST /branches để tránh tạo trùng khi retry/bấm nhiều lần.

Unique enforcement: DB có unique index code, name để chống race condition khi tạo đồng thời.

text
undefined
