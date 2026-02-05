export interface PermissionFunction {
    id: number;
    code: string;
    name: string;
    numberOrder: number;
    parentId: number | null;
    functions: PermissionFunction[];
}

export const permissionsData: PermissionFunction[] = [
    {
        "id": 1,
        "code": "System",
        "name": "Hệ thống - CMS",
        "numberOrder": 1,
        "parentId": null,
        "functions": [
            {
                "id": 11,
                "code": "SystemSetting",
                "name": "Thiết lập hệ thống",
                "numberOrder": 4,
                "parentId": 1,
                "functions": [
                    {
                        "id": 20,
                        "code": "Admin_Setting",
                        "name": "Thiết lập quản lý",
                        "numberOrder": 1,
                        "parentId": 11,
                        "functions": [
                            {
                                "id": 21,
                                "code": "Admin_Update",
                                "name": "Cập nhật",
                                "numberOrder": 1,
                                "parentId": 20,
                                "functions": []
                            }
                        ]
                    }
                ]
            },
            {
                "id": 12,
                "code": "Branch",
                "name": "Quản lý chi nhánh",
                "numberOrder": 6,
                "parentId": 1,
                "functions": [
                    {
                        "id": 22,
                        "code": "Branch_Setting",
                        "name": "Thiết lập cửa hàng",
                        "numberOrder": 1,
                        "parentId": 12,
                        "functions": [
                            {
                                "id": 23,
                                "code": "Branch_Read",
                                "name": "Xem danh sách",
                                "numberOrder": 1,
                                "parentId": 22,
                                "functions": []
                            },
                            {
                                "id": 24,
                                "code": "Branch_Create",
                                "name": "Thêm mới",
                                "numberOrder": 2,
                                "parentId": 22,
                                "functions": []
                            },
                            {
                                "id": 25,
                                "code": "Branch_Update",
                                "name": "Cập nhật",
                                "numberOrder": 3,
                                "parentId": 22,
                                "functions": []
                            },
                            {
                                "id": 26,
                                "code": "Branch_Delete",
                                "name": "Xóa",
                                "numberOrder": 4,
                                "parentId": 22,
                                "functions": []
                            }
                        ]
                    },
                    {
                        "id": 27,
                        "code": "Counter_Setting",
                        "name": "Thiết lập quầy hàng",
                        "numberOrder": 1,
                        "parentId": 12,
                        "functions": [
                            {
                                "id": 28,
                                "code": "Counter_Read",
                                "name": "Xem danh sách",
                                "numberOrder": 1,
                                "parentId": 27,
                                "functions": []
                            },
                            {
                                "id": 29,
                                "code": "Counter_Create",
                                "name": "Thêm mới",
                                "numberOrder": 2,
                                "parentId": 27,
                                "functions": []
                            },
                            {
                                "id": 30,
                                "code": "Counter_Update",
                                "name": "Cập nhật",
                                "numberOrder": 3,
                                "parentId": 27,
                                "functions": []
                            },
                            {
                                "id": 31,
                                "code": "Counter_Delete",
                                "name": "Xóa",
                                "numberOrder": 4,
                                "parentId": 27,
                                "functions": []
                            }
                        ]
                    }
                ]
            },
            {
                "id": 13,
                "code": "User",
                "name": "Quản lý người dùng",
                "numberOrder": 1,
                "parentId": 1,
                "functions": [
                    {
                        "id": 32,
                        "code": "User_Setting",
                        "name": "Thiết lập người dùng",
                        "numberOrder": 1,
                        "parentId": 13,
                        "functions": [
                            {
                                "id": 33,
                                "code": "User_Read",
                                "name": "Xem danh sách",
                                "numberOrder": 1,
                                "parentId": 32,
                                "functions": []
                            },
                            {
                                "id": 34,
                                "code": "User_Create",
                                "name": "Thêm mới",
                                "numberOrder": 2,
                                "parentId": 32,
                                "functions": []
                            },
                            {
                                "id": 35,
                                "code": "User_Update",
                                "name": "Cập nhật",
                                "numberOrder": 3,
                                "parentId": 32,
                                "functions": []
                            },
                            {
                                "id": 36,
                                "code": "User_Export",
                                "name": "Xuất file",
                                "numberOrder": 4,
                                "parentId": 32,
                                "functions": []
                            },
                            {
                                "id": 37,
                                "code": "User_Delete",
                                "name": "Xóa",
                                "numberOrder": 5,
                                "parentId": 32,
                                "functions": []
                            }
                        ]
                    },
                    {
                        "id": 38,
                        "code": "Role_Setting",
                        "name": "Thiết lập vai trò",
                        "numberOrder": 1,
                        "parentId": 13,
                        "functions": [
                            {
                                "id": 39,
                                "code": "Role_Create",
                                "name": "Thêm mới",
                                "numberOrder": 2,
                                "parentId": 38,
                                "functions": []
                            },
                            {
                                "id": 40,
                                "code": "Role_Update",
                                "name": "Cập nhật",
                                "numberOrder": 3,
                                "parentId": 38,
                                "functions": []
                            },
                            {
                                "id": 41,
                                "code": "Role_Delete",
                                "name": "Xóa",
                                "numberOrder": 4,
                                "parentId": 38,
                                "functions": []
                            },
                            {
                                "id": 301,
                                "code": "Role_Read",
                                "name": "Xem danh sách",
                                "numberOrder": 1,
                                "parentId": 38,
                                "functions": []
                            }
                        ]
                    }
                ]
            },
            {
                "id": 14,
                "code": "PaymentMethod",
                "name": "Phương thức thanh toán",
                "numberOrder": 5,
                "parentId": 1,
                "functions": [
                    {
                        "id": 42,
                        "code": "PaymentMethod_Read",
                        "name": "Xem danh sách",
                        "numberOrder": 1,
                        "parentId": 14,
                        "functions": []
                    },
                    {
                        "id": 43,
                        "code": "PaymentMethod_Create",
                        "name": "Thêm mới",
                        "numberOrder": 2,
                        "parentId": 14,
                        "functions": []
                    },
                    {
                        "id": 44,
                        "code": "PaymentMethod_Update",
                        "name": "Cập nhật",
                        "numberOrder": 3,
                        "parentId": 14,
                        "functions": []
                    },
                    {
                        "id": 45,
                        "code": "PaymentMethod_Delete",
                        "name": "Xóa",
                        "numberOrder": 4,
                        "parentId": 14,
                        "functions": []
                    }
                ]
            },
            {
                "id": 15,
                "code": "PrintTemplate",
                "name": "Quản lý mẫu in",
                "numberOrder": 2,
                "parentId": 1,
                "functions": [
                    {
                        "id": 46,
                        "code": "PrintTemplate_Read",
                        "name": "Xem danh sách",
                        "numberOrder": 1,
                        "parentId": 15,
                        "functions": []
                    },
                    {
                        "id": 47,
                        "code": "PrintTemplate_Create",
                        "name": "Thêm mới",
                        "numberOrder": 2,
                        "parentId": 15,
                        "functions": []
                    },
                    {
                        "id": 48,
                        "code": "PrintTemplate_Update",
                        "name": "Cập nhật",
                        "numberOrder": 3,
                        "parentId": 15,
                        "functions": []
                    },
                    {
                        "id": 49,
                        "code": "PrintTemplate_Delete",
                        "name": "Xóa",
                        "numberOrder": 4,
                        "parentId": 15,
                        "functions": []
                    }
                ]
            },
            {
                "id": 16,
                "code": "Invoice",
                "name": "Hóa đơn điện tử",
                "numberOrder": 4,
                "parentId": 1,
                "functions": [
                    {
                        "id": 50,
                        "code": "Invoice_Update",
                        "name": "Cập nhật",
                        "numberOrder": 1,
                        "parentId": 16,
                        "functions": []
                    },
                    {
                        "id": 51,
                        "code": "Invoice_Delete",
                        "name": "Xóa",
                        "numberOrder": 2,
                        "parentId": 16,
                        "functions": []
                    }
                ]
            },
            {
                "id": 17,
                "code": "SmsEmailTemplate",
                "name": "SMS / Email",
                "numberOrder": 7,
                "parentId": 1,
                "functions": [
                    {
                        "id": 52,
                        "code": "SmsEmailTemplate_Read",
                        "name": "Xem danh sách",
                        "numberOrder": 1,
                        "parentId": 17,
                        "functions": []
                    },
                    {
                        "id": 53,
                        "code": "SmsEmailTemplate_Create",
                        "name": "Thêm mới",
                        "numberOrder": 2,
                        "parentId": 17,
                        "functions": []
                    },
                    {
                        "id": 54,
                        "code": "SmsEmailTemplate_Update",
                        "name": "Cập nhật",
                        "numberOrder": 3,
                        "parentId": 17,
                        "functions": []
                    },
                    {
                        "id": 55,
                        "code": "SmsEmailTemplate_Delete",
                        "name": "Xóa",
                        "numberOrder": 4,
                        "parentId": 17,
                        "functions": []
                    },
                    {
                        "id": 56,
                        "code": "SmsEmailTemplate_SentSmS",
                        "name": "Gửi SMS",
                        "numberOrder": 5,
                        "parentId": 17,
                        "functions": []
                    },
                    {
                        "id": 57,
                        "code": "SmsEmailTemplate_SentEmail",
                        "name": "Gửi Email",
                        "numberOrder": 6,
                        "parentId": 17,
                        "functions": []
                    },
                    {
                        "id": 58,
                        "code": "SmsEmailTemplate_SentZalo",
                        "name": "Gửi tin nhắn Zalo",
                        "numberOrder": 7,
                        "parentId": 17,
                        "functions": []
                    }
                ]
            },
            {
                "id": 18,
                "code": "AuditTrail",
                "name": "Lịch sử thao tác",
                "numberOrder": 8,
                "parentId": 1,
                "functions": [
                    {
                        "id": 59,
                        "code": "AuditTrail_Read",
                        "name": "Xem",
                        "numberOrder": 1,
                        "parentId": 18,
                        "functions": []
                    }
                ]
            },
            {
                "id": 19,
                "code": "DashBoard",
                "name": "Tổng quan",
                "numberOrder": 9,
                "parentId": 1,
                "functions": [
                    {
                        "id": 60,
                        "code": "DashBoard_Read",
                        "name": "Xem",
                        "numberOrder": 1,
                        "parentId": 19,
                        "functions": []
                    }
                ]
            }
        ]
    },
    {
        "id": 2,
        "code": "Item",
        "name": "Hàng hóa - CMS",
        "numberOrder": 2,
        "parentId": null,
        "functions": [
            {
                "id": 61,
                "code": "Item_Setting",
                "name": "Danh mục",
                "numberOrder": 1,
                "parentId": 2,
                "functions": [
                    {
                        "id": 62,
                        "code": "Item_Read",
                        "name": "Xem danh sách",
                        "numberOrder": 1,
                        "parentId": 61,
                        "functions": []
                    },
                    {
                        "id": 63,
                        "code": "Item_Create",
                        "name": "Thêm mới",
                        "numberOrder": 2,
                        "parentId": 61,
                        "functions": []
                    },
                    {
                        "id": 64,
                        "code": "Item_Update",
                        "name": "Cập nhật",
                        "numberOrder": 3,
                        "parentId": 61,
                        "functions": []
                    },
                    {
                        "id": 65,
                        "code": "Item_Export",
                        "name": "Xuất file",
                        "numberOrder": 4,
                        "parentId": 61,
                        "functions": []
                    },
                    {
                        "id": 66,
                        "code": "Item_Delete",
                        "name": "Xóa",
                        "numberOrder": 5,
                        "parentId": 61,
                        "functions": []
                    }
                ]
            },
            {
                "id": 67,
                "code": "ItemGroup_Setting",
                "name": "Nhóm hàng hóa",
                "numberOrder": 1,
                "parentId": 2,
                "functions": [
                    {
                        "id": 68,
                        "code": "ItemGroup_Read",
                        "name": "Xem danh sách",
                        "numberOrder": 2,
                        "parentId": 67,
                        "functions": []
                    },
                    {
                        "id": 69,
                        "code": "ItemGroup_Create",
                        "name": "Thêm mới",
                        "numberOrder": 3,
                        "parentId": 67,
                        "functions": []
                    },
                    {
                        "id": 70,
                        "code": "ItemGroup_Update",
                        "name": "Cập nhật",
                        "numberOrder": 4,
                        "parentId": 67,
                        "functions": []
                    },
                    {
                        "id": 71,
                        "code": "ItemGroup_Export",
                        "name": "Xuất file",
                        "numberOrder": 5,
                        "parentId": 67,
                        "functions": []
                    },
                    {
                        "id": 72,
                        "code": "ItemGroup_Delete",
                        "name": "Xóa",
                        "numberOrder": 6,
                        "parentId": 67,
                        "functions": []
                    }
                ]
            },
            {
                "id": 73,
                "code": "Price",
                "name": "Thiết lập mã giá",
                "numberOrder": 2,
                "parentId": 2,
                "functions": [
                    {
                        "id": 74,
                        "code": "PriceCode",
                        "name": "Mã giá",
                        "numberOrder": 2,
                        "parentId": 73,
                        "functions": [
                            {
                                "id": 75,
                                "code": "PriceCode_Read",
                                "name": "Xem danh sách",
                                "numberOrder": 3,
                                "parentId": 74,
                                "functions": []
                            },
                            {
                                "id": 76,
                                "code": "PriceCode_Create",
                                "name": "Thêm mới",
                                "numberOrder": 4,
                                "parentId": 74,
                                "functions": []
                            },
                            {
                                "id": 77,
                                "code": "PriceCode_Update",
                                "name": "Cập nhật",
                                "numberOrder": 5,
                                "parentId": 74,
                                "functions": []
                            },
                            {
                                "id": 78,
                                "code": "PriceCode_Delete",
                                "name": "Xóa",
                                "numberOrder": 6,
                                "parentId": 74,
                                "functions": []
                            },
                            {
                                "id": 79,
                                "code": "PriceCode_Export",
                                "name": "Xuất file",
                                "numberOrder": 7,
                                "parentId": 74,
                                "functions": []
                            }
                        ]
                    },
                    {
                        "id": 80,
                        "code": "PriceCodeTable",
                        "name": "Bảng mã giá",
                        "numberOrder": 2,
                        "parentId": 73,
                        "functions": [
                            {
                                "id": 81,
                                "code": "PriceCodeTable_Read",
                                "name": "Xem danh sách",
                                "numberOrder": 1,
                                "parentId": 80,
                                "functions": []
                            },
                            {
                                "id": 82,
                                "code": "PriceCodeTable_Create",
                                "name": "Thêm mới",
                                "numberOrder": 2,
                                "parentId": 80,
                                "functions": []
                            },
                            {
                                "id": 83,
                                "code": "PriceCodeTable_Update",
                                "name": "Cập nhật",
                                "numberOrder": 3,
                                "parentId": 80,
                                "functions": []
                            },
                            {
                                "id": 84,
                                "code": "PriceCodeTable_Delete",
                                "name": "Xóa",
                                "numberOrder": 4,
                                "parentId": 80,
                                "functions": []
                            }
                        ]
                    }
                ]
            },
            {
                "id": 85,
                "code": "Unit",
                "name": "Đơn vị tính",
                "numberOrder": 3,
                "parentId": 2,
                "functions": [
                    {
                        "id": 86,
                        "code": "Unit_Read",
                        "name": "Xem danh sách",
                        "numberOrder": 1,
                        "parentId": 85,
                        "functions": []
                    },
                    {
                        "id": 87,
                        "code": "Unit_Create",
                        "name": "Thêm mới",
                        "numberOrder": 2,
                        "parentId": 85,
                        "functions": []
                    },
                    {
                        "id": 88,
                        "code": "Unit_Update",
                        "name": "Cập nhật",
                        "numberOrder": 3,
                        "parentId": 85,
                        "functions": []
                    },
                    {
                        "id": 89,
                        "code": "Unit_Delete",
                        "name": "Xóa",
                        "numberOrder": 4,
                        "parentId": 85,
                        "functions": []
                    },
                    {
                        "id": 90,
                        "code": "Unit_Export",
                        "name": "Xuất file",
                        "numberOrder": 5,
                        "parentId": 85,
                        "functions": []
                    }
                ]
            },
            {
                "id": 91,
                "code": "UnitGroup",
                "name": "Nhóm đơn vị tính",
                "numberOrder": 4,
                "parentId": 2,
                "functions": [
                    {
                        "id": 92,
                        "code": "UnitGroup_Read",
                        "name": "Xem danh sách",
                        "numberOrder": 1,
                        "parentId": 91,
                        "functions": []
                    },
                    {
                        "id": 93,
                        "code": "UnitGroup_Create",
                        "name": "Thêm mới",
                        "numberOrder": 2,
                        "parentId": 91,
                        "functions": []
                    },
                    {
                        "id": 94,
                        "code": "UnitGroup_Update",
                        "name": "Cập nhật",
                        "numberOrder": 3,
                        "parentId": 91,
                        "functions": []
                    },
                    {
                        "id": 95,
                        "code": "UnitGroup_Delete",
                        "name": "Xóa",
                        "numberOrder": 4,
                        "parentId": 91,
                        "functions": []
                    },
                    {
                        "id": 96,
                        "code": "UnitGroup_Export",
                        "name": "Xuất file",
                        "numberOrder": 5,
                        "parentId": 91,
                        "functions": []
                    }
                ]
            },
            {
                "id": 97,
                "code": "BuyingPriceRule",
                "name": "Quy tắc giá mua",
                "numberOrder": 5,
                "parentId": 2,
                "functions": [
                    {
                        "id": 98,
                        "code": "BuyingPriceRule_Read",
                        "name": "Xem danh sách",
                        "numberOrder": 1,
                        "parentId": 97,
                        "functions": []
                    },
                    {
                        "id": 99,
                        "code": "BuyingPriceRule_Create",
                        "name": "Thêm mới",
                        "numberOrder": 2,
                        "parentId": 97,
                        "functions": []
                    },
                    {
                        "id": 100,
                        "code": "BuyingPriceRule_Update",
                        "name": "Cập nhật",
                        "numberOrder": 3,
                        "parentId": 97,
                        "functions": []
                    },
                    {
                        "id": 105,
                        "code": "BuyingPriceRule_Delete",
                        "name": "Xóa",
                        "numberOrder": 4,
                        "parentId": 97,
                        "functions": []
                    },
                    {
                        "id": 106,
                        "code": "BuyingPriceRule_Export",
                        "name": "Xuất file",
                        "numberOrder": 5,
                        "parentId": 97,
                        "functions": []
                    }
                ]
            },
            {
                "id": 107,
                "code": "SellingPriceRule",
                "name": "Quy tắc giá bán",
                "numberOrder": 6,
                "parentId": 2,
                "functions": [
                    {
                        "id": 108,
                        "code": "SellingPriceRule_Read",
                        "name": "Xem danh sách",
                        "numberOrder": 1,
                        "parentId": 107,
                        "functions": []
                    },
                    {
                        "id": 109,
                        "code": "SellPriceRule_Create",
                        "name": "Thêm mới",
                        "numberOrder": 2,
                        "parentId": 107,
                        "functions": []
                    },
                    {
                        "id": 110,
                        "code": "SellingPriceRule_Update",
                        "name": "Cập nhật",
                        "numberOrder": 3,
                        "parentId": 107,
                        "functions": []
                    },
                    {
                        "id": 111,
                        "code": "SellingPriceRule_Delete",
                        "name": "Xóa",
                        "numberOrder": 4,
                        "parentId": 107,
                        "functions": []
                    },
                    {
                        "id": 112,
                        "code": "SellingPriceRule_Export",
                        "name": "Xuất file",
                        "numberOrder": 5,
                        "parentId": 107,
                        "functions": []
                    }
                ]
            }
        ]
    },
    {
        "id": 3,
        "code": "Transaction",
        "name": "Giao dịch - CMS",
        "numberOrder": 3,
        "parentId": null,
        "functions": [
            {
                "id": 113,
                "code": "Selling",
                "name": "Bán hàng",
                "numberOrder": 1,
                "parentId": 3,
                "functions": [
                    {
                        "id": 119,
                        "code": "SaleInvoice",
                        "name": "Hóa đơn bán hàng",
                        "numberOrder": 1,
                        "parentId": 113,
                        "functions": [
                            {
                                "id": 122,
                                "code": "SaleInvoice_Read",
                                "name": "Xem danh sách",
                                "numberOrder": 1,
                                "parentId": 119,
                                "functions": []
                            },
                            {
                                "id": 123,
                                "code": "SaleInvoice_Export",
                                "name": "Xuất file",
                                "numberOrder": 2,
                                "parentId": 119,
                                "functions": []
                            }
                        ]
                    },
                    {
                        "id": 120,
                        "code": "SaleOrder",
                        "name": "Đặt hàng",
                        "numberOrder": 2,
                        "parentId": 113,
                        "functions": [
                            {
                                "id": 124,
                                "code": "SaleOrder_Read",
                                "name": "Xem danh sách",
                                "numberOrder": 1,
                                "parentId": 120,
                                "functions": []
                            },
                            {
                                "id": 125,
                                "code": "SaleOrder_Export",
                                "name": "Xuất file",
                                "numberOrder": 2,
                                "parentId": 120,
                                "functions": []
                            }
                        ]
                    },
                    {
                        "id": 121,
                        "code": "ReturnItem",
                        "name": "Đổi trả hàng",
                        "numberOrder": 3,
                        "parentId": 113,
                        "functions": [
                            {
                                "id": 126,
                                "code": "ReturnItem_Read",
                                "name": "Xem danh sách",
                                "numberOrder": 1,
                                "parentId": 121,
                                "functions": []
                            },
                            {
                                "id": 127,
                                "code": "ReturnItem_Export",
                                "name": "Xuất file",
                                "numberOrder": 2,
                                "parentId": 121,
                                "functions": []
                            }
                        ]
                    }
                ]
            },
            {
                "id": 114,
                "code": "Buying",
                "name": "Mua hàng",
                "numberOrder": 2,
                "parentId": 3,
                "functions": [
                    {
                        "id": 128,
                        "code": "Buying_Read",
                        "name": "Xem danh sách",
                        "numberOrder": 1,
                        "parentId": 114,
                        "functions": []
                    },
                    {
                        "id": 129,
                        "code": "Buying_Export",
                        "name": "Xuất file",
                        "numberOrder": 2,
                        "parentId": 114,
                        "functions": []
                    }
                ]
            },
            {
                "id": 115,
                "code": "Warranty",
                "name": "Bảo hành",
                "numberOrder": 3,
                "parentId": 3,
                "functions": [
                    {
                        "id": 130,
                        "code": "Warranty_Read",
                        "name": "Xem danh sách",
                        "numberOrder": 1,
                        "parentId": 115,
                        "functions": []
                    },
                    {
                        "id": 131,
                        "code": "Warranty_Export",
                        "name": "Xuất file",
                        "numberOrder": 2,
                        "parentId": 115,
                        "functions": []
                    }
                ]
            },
            {
                "id": 116,
                "code": "Stock",
                "name": "Nghiệp vụ kho",
                "numberOrder": 4,
                "parentId": 3,
                "functions": [
                    {
                        "id": 132,
                        "code": "AddStock",
                        "name": "Nhập hàng",
                        "numberOrder": 1,
                        "parentId": 116,
                        "functions": [
                            {
                                "id": 136,
                                "code": "AddStock_Read",
                                "name": "Xem danh sách",
                                "numberOrder": 1,
                                "parentId": 132,
                                "functions": []
                            },
                            {
                                "id": 137,
                                "code": "AddStock_Create",
                                "name": "Thêm mới",
                                "numberOrder": 2,
                                "parentId": 132,
                                "functions": []
                            },
                            {
                                "id": 138,
                                "code": "AddStock_Update",
                                "name": "Cập nhập",
                                "numberOrder": 3,
                                "parentId": 132,
                                "functions": []
                            },
                            {
                                "id": 139,
                                "code": "AddStock_Export",
                                "name": "Xuất file",
                                "numberOrder": 4,
                                "parentId": 132,
                                "functions": []
                            }
                        ]
                    },
                    {
                        "id": 133,
                        "code": "TransferStock",
                        "name": "Điều chuyển",
                        "numberOrder": 2,
                        "parentId": 116,
                        "functions": [
                            {
                                "id": 140,
                                "code": "TransferStock_Read",
                                "name": "Xem danh sách",
                                "numberOrder": 1,
                                "parentId": 133,
                                "functions": []
                            },
                            {
                                "id": 141,
                                "code": "TransferStock_Create",
                                "name": "Thêm mới",
                                "numberOrder": 7,
                                "parentId": 133,
                                "functions": []
                            },
                            {
                                "id": 142,
                                "code": "TransferStock_Update",
                                "name": "Cập nhật",
                                "numberOrder": 1,
                                "parentId": 133,
                                "functions": []
                            },
                            {
                                "id": 143,
                                "code": "TransferStock_Export",
                                "name": "Xuất file",
                                "numberOrder": 2,
                                "parentId": 133,
                                "functions": []
                            }
                        ]
                    },
                    {
                        "id": 134,
                        "code": "AuditStock",
                        "name": "Kiểm kê",
                        "numberOrder": 3,
                        "parentId": 116,
                        "functions": [
                            {
                                "id": 144,
                                "code": "AuditStock_Read",
                                "name": "Xem danh sách",
                                "numberOrder": 1,
                                "parentId": 134,
                                "functions": []
                            },
                            {
                                "id": 145,
                                "code": "AuditStock_Create",
                                "name": "Thêm mới",
                                "numberOrder": 2,
                                "parentId": 134,
                                "functions": []
                            },
                            {
                                "id": 146,
                                "code": "AuditStock_Update",
                                "name": "Cập nhật",
                                "numberOrder": 3,
                                "parentId": 134,
                                "functions": []
                            },
                            {
                                "id": 147,
                                "code": "AuditStock_Export",
                                "name": "Xuất file",
                                "numberOrder": 4,
                                "parentId": 134,
                                "functions": []
                            }
                        ]
                    },
                    {
                        "id": 135,
                        "code": "ReleaseStock",
                        "name": "Xuất hủy",
                        "numberOrder": 3,
                        "parentId": 116,
                        "functions": [
                            {
                                "id": 148,
                                "code": "ReleaseStock_Read",
                                "name": "Xem danh sách",
                                "numberOrder": 1,
                                "parentId": 135,
                                "functions": []
                            },
                            {
                                "id": 149,
                                "code": "ReleaseStock_Create",
                                "name": "Thêm mới",
                                "numberOrder": 2,
                                "parentId": 135,
                                "functions": []
                            },
                            {
                                "id": 150,
                                "code": "ReleaseStock_Update",
                                "name": "Cập nhật",
                                "numberOrder": 3,
                                "parentId": 135,
                                "functions": []
                            },
                            {
                                "id": 151,
                                "code": "ReleaseStock_Export",
                                "name": "Xuất file",
                                "numberOrder": 4,
                                "parentId": 135,
                                "functions": []
                            }
                        ]
                    }
                ]
            },
            {
                "id": 298,
                "code": "EndShift",
                "name": "Kết ca",
                "numberOrder": 1,
                "parentId": 3,
                "functions": [
                    {
                        "id": 300,
                        "code": "EndShift_Read",
                        "name": "Xem danh sách",
                        "numberOrder": 1,
                        "parentId": 298,
                        "functions": []
                    }
                ]
            }
        ]
    },
    {
        "id": 4,
        "code": "Promotion",
        "name": "Khuyến mại - CMS",
        "numberOrder": 4,
        "parentId": null,
        "functions": [
            {
                "id": 156,
                "code": "Promotion_Setting",
                "name": "Quản lý CTKM",
                "numberOrder": 1,
                "parentId": 4,
                "functions": [
                    {
                        "id": 159,
                        "code": "Promotion_Read",
                        "name": "Xem danh sách",
                        "numberOrder": 1,
                        "parentId": 156,
                        "functions": []
                    },
                    {
                        "id": 160,
                        "code": "Promotion_Create",
                        "name": "Thêm mới",
                        "numberOrder": 2,
                        "parentId": 156,
                        "functions": []
                    },
                    {
                        "id": 161,
                        "code": "Promotion_Update",
                        "name": "Cập nhật",
                        "numberOrder": 3,
                        "parentId": 156,
                        "functions": []
                    },
                    {
                        "id": 162,
                        "code": "Promotion_Delete",
                        "name": "Xóa",
                        "numberOrder": 4,
                        "parentId": 156,
                        "functions": []
                    },
                    {
                        "id": 163,
                        "code": "Promotion_Export",
                        "name": "Xuất file",
                        "numberOrder": 5,
                        "parentId": 156,
                        "functions": []
                    },
                    {
                        "id": 164,
                        "code": "Promotion_Copy",
                        "name": "Sao chép",
                        "numberOrder": 6,
                        "parentId": 156,
                        "functions": []
                    }
                ]
            },
            {
                "id": 157,
                "code": "Voucher_Setting",
                "name": "Quản lý Voucher",
                "numberOrder": 2,
                "parentId": 4,
                "functions": [
                    {
                        "id": 165,
                        "code": "Voucher_Read",
                        "name": "Xem danh sách",
                        "numberOrder": 1,
                        "parentId": 157,
                        "functions": []
                    },
                    {
                        "id": 166,
                        "code": "Voucher_Create",
                        "name": "Thêm mới",
                        "numberOrder": 2,
                        "parentId": 157,
                        "functions": []
                    },
                    {
                        "id": 167,
                        "code": "Voucher_Update",
                        "name": "Cập nhật",
                        "numberOrder": 3,
                        "parentId": 157,
                        "functions": []
                    },
                    {
                        "id": 168,
                        "code": "Voucher_Delete",
                        "name": "Xóa",
                        "numberOrder": 4,
                        "parentId": 157,
                        "functions": []
                    },
                    {
                        "id": 169,
                        "code": "Voucher_Export",
                        "name": "Xuất file",
                        "numberOrder": 1,
                        "parentId": 157,
                        "functions": []
                    },
                    {
                        "id": 170,
                        "code": "Voucher_Copy",
                        "name": "Sao chép",
                        "numberOrder": 2,
                        "parentId": 157,
                        "functions": []
                    }
                ]
            },
            {
                "id": 158,
                "code": "Coupon_Setting",
                "name": "Quản lý Coupon",
                "numberOrder": 3,
                "parentId": 4,
                "functions": [
                    {
                        "id": 171,
                        "code": "Coupon_Read",
                        "name": "Xem danh sách",
                        "numberOrder": 1,
                        "parentId": 158,
                        "functions": []
                    },
                    {
                        "id": 172,
                        "code": "Coupon_Create",
                        "name": "Thêm mới",
                        "numberOrder": 2,
                        "parentId": 158,
                        "functions": []
                    },
                    {
                        "id": 173,
                        "code": "Coupon_Update",
                        "name": "Cập nhật",
                        "numberOrder": 3,
                        "parentId": 158,
                        "functions": []
                    },
                    {
                        "id": 174,
                        "code": "Coupon_Delete",
                        "name": "Xóa",
                        "numberOrder": 4,
                        "parentId": 158,
                        "functions": []
                    },
                    {
                        "id": 175,
                        "code": "Coupon_Export",
                        "name": "Xuất file",
                        "numberOrder": 5,
                        "parentId": 158,
                        "functions": []
                    },
                    {
                        "id": 176,
                        "code": "Coupon_Copy",
                        "name": "Sao chép",
                        "numberOrder": 6,
                        "parentId": 158,
                        "functions": []
                    }
                ]
            }
        ]
    },
    {
        "id": 5,
        "code": "Report",
        "name": "Báo cáo - CMS",
        "numberOrder": 5,
        "parentId": null,
        "functions": [
            {
                "id": 177,
                "code": "StockReport",
                "name": "Báo cáo tồn kho",
                "numberOrder": 1,
                "parentId": 5,
                "functions": [
                    {
                        "id": 182,
                        "code": "StockReport_Read",
                        "name": "Xem danh sách",
                        "numberOrder": 1,
                        "parentId": 177,
                        "functions": []
                    },
                    {
                        "id": 183,
                        "code": "StockReport_Export",
                        "name": "Xuất file",
                        "numberOrder": 2,
                        "parentId": 177,
                        "functions": []
                    }
                ]
            },
            {
                "id": 178,
                "code": "ProfitReport",
                "name": "Báo các doanh thu",
                "numberOrder": 2,
                "parentId": 5,
                "functions": [
                    {
                        "id": 184,
                        "code": "ProfitReport_Read",
                        "name": "Xem danh sách",
                        "numberOrder": 1,
                        "parentId": 178,
                        "functions": []
                    },
                    {
                        "id": 185,
                        "code": "ProfitReport_Export",
                        "name": "Xuất file",
                        "numberOrder": 2,
                        "parentId": 178,
                        "functions": []
                    }
                ]
            },
            {
                "id": 179,
                "code": "PromotionReport",
                "name": "Báo cáo CTKM",
                "numberOrder": 3,
                "parentId": 5,
                "functions": [
                    {
                        "id": 186,
                        "code": "PromotionReport_Read",
                        "name": "Xem danh sách",
                        "numberOrder": 1,
                        "parentId": 179,
                        "functions": []
                    },
                    {
                        "id": 187,
                        "code": "PromotionReport_Export",
                        "name": "Xuất file",
                        "numberOrder": 2,
                        "parentId": 179,
                        "functions": []
                    }
                ]
            },
            {
                "id": 180,
                "code": "CustomerReport",
                "name": "Báo cáo khách hàng",
                "numberOrder": 4,
                "parentId": 5,
                "functions": [
                    {
                        "id": 188,
                        "code": "CustomerReport_Read",
                        "name": "Xem danh sách",
                        "numberOrder": 1,
                        "parentId": 180,
                        "functions": []
                    },
                    {
                        "id": 189,
                        "code": "CustomerReport_Export",
                        "name": "Xuất file",
                        "numberOrder": 2,
                        "parentId": 180,
                        "functions": []
                    }
                ]
            },
            {
                "id": 181,
                "code": "EmployeeReport",
                "name": "Báo cáo nhân viên",
                "numberOrder": 5,
                "parentId": 5,
                "functions": [
                    {
                        "id": 190,
                        "code": "EmployeeReport_Read",
                        "name": "Xem danh sách",
                        "numberOrder": 1,
                        "parentId": 181,
                        "functions": []
                    },
                    {
                        "id": 191,
                        "code": "EmployeeReport_Export",
                        "name": "Xuất file",
                        "numberOrder": 2,
                        "parentId": 181,
                        "functions": []
                    }
                ]
            }
        ]
    },
    {
        "id": 6,
        "code": "Cash",
        "name": "Sổ quỹ - CMS",
        "numberOrder": 6,
        "parentId": null,
        "functions": [
            {
                "id": 192,
                "code": "CashBook",
                "name": "Danh sách sổ quỹ",
                "numberOrder": 1,
                "parentId": 6,
                "functions": [
                    {
                        "id": 195,
                        "code": "CashBook_Read",
                        "name": "Xem danh sách",
                        "numberOrder": 1,
                        "parentId": 192,
                        "functions": []
                    },
                    {
                        "id": 196,
                        "code": "CashBook_Export",
                        "name": "Xuất file",
                        "numberOrder": 2,
                        "parentId": 192,
                        "functions": []
                    }
                ]
            },
            {
                "id": 193,
                "code": "CashReciept",
                "name": "Phiếu thu",
                "numberOrder": 2,
                "parentId": 6,
                "functions": [
                    {
                        "id": 197,
                        "code": "CashReciept_Read",
                        "name": "Xem danh sách",
                        "numberOrder": 1,
                        "parentId": 193,
                        "functions": []
                    },
                    {
                        "id": 198,
                        "code": "CashReciept_Create",
                        "name": "Thêm mới",
                        "numberOrder": 2,
                        "parentId": 193,
                        "functions": []
                    },
                    {
                        "id": 199,
                        "code": "CashReciept_Update",
                        "name": "Cập nhật",
                        "numberOrder": 3,
                        "parentId": 193,
                        "functions": []
                    },
                    {
                        "id": 200,
                        "code": "CashReciept_Delete",
                        "name": "Xóa",
                        "numberOrder": 4,
                        "parentId": 193,
                        "functions": []
                    },
                    {
                        "id": 201,
                        "code": "CashReciept_Export",
                        "name": "Xuất file",
                        "numberOrder": 5,
                        "parentId": 193,
                        "functions": []
                    }
                ]
            },
            {
                "id": 194,
                "code": "CashPayment",
                "name": "Phiếu chi",
                "numberOrder": 3,
                "parentId": 6,
                "functions": [
                    {
                        "id": 202,
                        "code": "CashPayment_Read",
                        "name": "Xem danh sách",
                        "numberOrder": 1,
                        "parentId": 194,
                        "functions": []
                    },
                    {
                        "id": 203,
                        "code": "CashPayment_Create",
                        "name": "Thêm mới",
                        "numberOrder": 2,
                        "parentId": 194,
                        "functions": []
                    },
                    {
                        "id": 204,
                        "code": "CashPayment_Update",
                        "name": "Cập nhật",
                        "numberOrder": 3,
                        "parentId": 194,
                        "functions": []
                    },
                    {
                        "id": 205,
                        "code": "CashPayment_Delete",
                        "name": "Xóa",
                        "numberOrder": 4,
                        "parentId": 194,
                        "functions": []
                    },
                    {
                        "id": 206,
                        "code": "CashPayment_Export",
                        "name": "Xuất file",
                        "numberOrder": 5,
                        "parentId": 194,
                        "functions": []
                    }
                ]
            }
        ]
    },
    {
        "id": 7,
        "code": "BusinessPartner",
        "name": "Đối tác - CMS",
        "numberOrder": 7,
        "parentId": null,
        "functions": [
            {
                "id": 219,
                "code": "Customer",
                "name": "Khách hàng",
                "numberOrder": 1,
                "parentId": 7,
                "functions": [
                    {
                        "id": 221,
                        "code": "CustomerList",
                        "name": "Danh sách KH",
                        "numberOrder": 1,
                        "parentId": 219,
                        "functions": [
                            {
                                "id": 225,
                                "code": "Customer_Read",
                                "name": "Xem danh sách",
                                "numberOrder": 1,
                                "parentId": 221,
                                "functions": []
                            },
                            {
                                "id": 226,
                                "code": "Customer_Create",
                                "name": "Thêm mới",
                                "numberOrder": 2,
                                "parentId": 221,
                                "functions": []
                            },
                            {
                                "id": 227,
                                "code": "Customer_Update",
                                "name": "Cập nhật",
                                "numberOrder": 3,
                                "parentId": 221,
                                "functions": []
                            },
                            {
                                "id": 228,
                                "code": "Customer_Delete",
                                "name": "Xoá",
                                "numberOrder": 4,
                                "parentId": 221,
                                "functions": []
                            },
                            {
                                "id": 229,
                                "code": "Customer_Import",
                                "name": "Import",
                                "numberOrder": 5,
                                "parentId": 221,
                                "functions": []
                            },
                            {
                                "id": 230,
                                "code": "Customer_Export",
                                "name": "Xuất file",
                                "numberOrder": 6,
                                "parentId": 221,
                                "functions": []
                            }
                        ]
                    },
                    {
                        "id": 222,
                        "code": "CustomerCard",
                        "name": "Hạng thẻ KH",
                        "numberOrder": 2,
                        "parentId": 219,
                        "functions": [
                            {
                                "id": 231,
                                "code": "CustomerCard_Read",
                                "name": "Xem danh sách",
                                "numberOrder": 1,
                                "parentId": 222,
                                "functions": []
                            },
                            {
                                "id": 232,
                                "code": "CustomerCard_Create",
                                "name": "Thêm mới",
                                "numberOrder": 2,
                                "parentId": 222,
                                "functions": []
                            },
                            {
                                "id": 233,
                                "code": "CustomerCard_Update",
                                "name": "Cập nhật",
                                "numberOrder": 3,
                                "parentId": 222,
                                "functions": []
                            },
                            {
                                "id": 234,
                                "code": "CustomerCard_Delete",
                                "name": "Xoá",
                                "numberOrder": 4,
                                "parentId": 222,
                                "functions": []
                            },
                            {
                                "id": 236,
                                "code": "CustomerCard_Export",
                                "name": "Xuất file",
                                "numberOrder": 5,
                                "parentId": 222,
                                "functions": []
                            }
                        ]
                    }
                ]
            },
            {
                "id": 220,
                "code": "Supplier",
                "name": "Nhà cung cấp",
                "numberOrder": 2,
                "parentId": 7,
                "functions": [
                    {
                        "id": 237,
                        "code": "Supplier_Read",
                        "name": "Xem danh sách",
                        "numberOrder": 1,
                        "parentId": 220,
                        "functions": []
                    },
                    {
                        "id": 238,
                        "code": "Supplier_Create",
                        "name": "Thêm mới",
                        "numberOrder": 2,
                        "parentId": 220,
                        "functions": []
                    },
                    {
                        "id": 239,
                        "code": "Supplier_Update",
                        "name": "Cập nhật",
                        "numberOrder": 3,
                        "parentId": 220,
                        "functions": []
                    },
                    {
                        "id": 240,
                        "code": "Supplier_Delete",
                        "name": "Xoá",
                        "numberOrder": 4,
                        "parentId": 220,
                        "functions": []
                    },
                    {
                        "id": 241,
                        "code": "Supplier_Export",
                        "name": "Xuất file",
                        "numberOrder": 5,
                        "parentId": 220,
                        "functions": []
                    }
                ]
            }
        ]
    },
    {
        "id": 8,
        "code": "MaterialPrice",
        "name": "Bảng giá nguyên liệu - CMS",
        "numberOrder": 8,
        "parentId": null,
        "functions": [
            {
                "id": 242,
                "code": "MaterialPriceList",
                "name": "Danh sách mã giá",
                "numberOrder": 1,
                "parentId": 8,
                "functions": [
                    {
                        "id": 244,
                        "code": "MaterialPrice_Read",
                        "name": "Xem danh sách",
                        "numberOrder": 1,
                        "parentId": 242,
                        "functions": []
                    },
                    {
                        "id": 245,
                        "code": "MaterialPrice_Create",
                        "name": "Thêm mới",
                        "numberOrder": 2,
                        "parentId": 242,
                        "functions": []
                    },
                    {
                        "id": 246,
                        "code": "MaterialPrice_Update",
                        "name": "Cập nhật",
                        "numberOrder": 3,
                        "parentId": 242,
                        "functions": []
                    },
                    {
                        "id": 247,
                        "code": "MaterialPrice_Delete",
                        "name": "Xoá",
                        "numberOrder": 4,
                        "parentId": 242,
                        "functions": []
                    },
                    {
                        "id": 248,
                        "code": "MaterialPrice_Export",
                        "name": "Xuất file",
                        "numberOrder": 5,
                        "parentId": 242,
                        "functions": []
                    }
                ]
            },
            {
                "id": 243,
                "code": "MaterialPriceTable",
                "name": "Danh sách bảng giá",
                "numberOrder": 2,
                "parentId": 8,
                "functions": [
                    {
                        "id": 249,
                        "code": "MaterialPriceTable_Read",
                        "name": "Xem danh sách",
                        "numberOrder": 1,
                        "parentId": 243,
                        "functions": []
                    },
                    {
                        "id": 250,
                        "code": "MaterialPriceTable_Create",
                        "name": "Thêm mới",
                        "numberOrder": 2,
                        "parentId": 243,
                        "functions": []
                    },
                    {
                        "id": 251,
                        "code": "MaterialPriceTable_Update",
                        "name": "Cập nhật",
                        "numberOrder": 3,
                        "parentId": 243,
                        "functions": []
                    },
                    {
                        "id": 252,
                        "code": "MaterialPriceTable_Delete",
                        "name": "Xoá",
                        "numberOrder": 4,
                        "parentId": 243,
                        "functions": []
                    },
                    {
                        "id": 253,
                        "code": "MaterialPriceTable_Export",
                        "name": "Xuất file",
                        "numberOrder": 5,
                        "parentId": 243,
                        "functions": []
                    },
                    {
                        "id": 254,
                        "code": "MaterialPriceTable_Copy",
                        "name": "Sao chép",
                        "numberOrder": 6,
                        "parentId": 243,
                        "functions": []
                    }
                ]
            }
        ]
    },
    {
        "id": 9,
        "code": "POS",
        "name": "Nghiệp vụ tại quầy - POS",
        "numberOrder": 9,
        "parentId": null,
        "functions": [
            {
                "id": 255,
                "code": "Pos_Selling",
                "name": "Hoá đơn",
                "numberOrder": 1,
                "parentId": 9,
                "functions": [
                    {
                        "id": 265,
                        "code": "Pos_Selling_Create",
                        "name": "Tạo đơn",
                        "numberOrder": 1,
                        "parentId": 255,
                        "functions": []
                    },
                    {
                        "id": 266,
                        "code": "Pos_Selling_Payment",
                        "name": "Thanh toán",
                        "numberOrder": 2,
                        "parentId": 255,
                        "functions": []
                    },
                    {
                        "id": 304,
                        "code": "Pos_Selling_Cancel",
                        "name": "Hủy đơn",
                        "numberOrder": 3,
                        "parentId": 255,
                        "functions": []
                    },
                    {
                        "id": 305,
                        "code": "Pos_Selling_Update",
                        "name": "Cập nhật",
                        "numberOrder": 4,
                        "parentId": 255,
                        "functions": []
                    }
                ]
            },
            {
                "id": 261,
                "code": "Pos_SaleOrder",
                "name": "Đặt hàng",
                "numberOrder": 2,
                "parentId": 9,
                "functions": [
                    {
                        "id": 267,
                        "code": "Pos_SaleOrder_Create",
                        "name": "Tạo đơn",
                        "numberOrder": 1,
                        "parentId": 261,
                        "functions": []
                    },
                    {
                        "id": 268,
                        "code": "Pos_SaleOrder_Payment",
                        "name": "Thanh toán",
                        "numberOrder": 2,
                        "parentId": 261,
                        "functions": []
                    },
                    {
                        "id": 302,
                        "code": "Pos_SaleOrder_Cancel",
                        "name": "Hủy đơn",
                        "numberOrder": 3,
                        "parentId": 261,
                        "functions": []
                    },
                    {
                        "id": 303,
                        "code": "Pos_SaleOrder_Update",
                        "name": "Cập nhật",
                        "numberOrder": 4,
                        "parentId": 261,
                        "functions": []
                    }
                ]
            },
            {
                "id": 262,
                "code": "Pos_Buying",
                "name": "Mua hàng",
                "numberOrder": 3,
                "parentId": 9,
                "functions": [
                    {
                        "id": 269,
                        "code": "Pos_Buying_Create",
                        "name": "Tạo đơn",
                        "numberOrder": 1,
                        "parentId": 262,
                        "functions": []
                    },
                    {
                        "id": 270,
                        "code": "Pos_Buying_Payment",
                        "name": "Thanh toán",
                        "numberOrder": 2,
                        "parentId": 262,
                        "functions": []
                    },
                    {
                        "id": 306,
                        "code": "Pos_Buying_Cancel",
                        "name": "Hủy đơn",
                        "numberOrder": 3,
                        "parentId": 262,
                        "functions": []
                    },
                    {
                        "id": 307,
                        "code": "Pos_Buying_Update",
                        "name": "Cập nhật",
                        "numberOrder": 4,
                        "parentId": 262,
                        "functions": []
                    }
                ]
            },
            {
                "id": 264,
                "code": "Pos_ReturnItem",
                "name": "Đổi trả hàng",
                "numberOrder": 5,
                "parentId": 9,
                "functions": [
                    {
                        "id": 273,
                        "code": "Pos_ReturnItem_Create",
                        "name": "Tạo đơn",
                        "numberOrder": 1,
                        "parentId": 264,
                        "functions": []
                    },
                    {
                        "id": 274,
                        "code": "Pos_ReturnItem_Payment",
                        "name": "Thanh toán",
                        "numberOrder": 2,
                        "parentId": 264,
                        "functions": []
                    },
                    {
                        "id": 1304,
                        "code": "Pos_ReturnItem_Update",
                        "name": "Cập nhật",
                        "numberOrder": 3,
                        "parentId": 264,
                        "functions": []
                    },
                    {
                        "id": 1305,
                        "code": "Pos_ReturnItem_Cancel",
                        "name": "Hủy đơn",
                        "numberOrder": 4,
                        "parentId": 264,
                        "functions": []
                    }
                ]
            },
            {
                "id": 294,
                "code": "Pos_Waranty",
                "name": "Bảo hành",
                "numberOrder": 1,
                "parentId": 9,
                "functions": [
                    {
                        "id": 295,
                        "code": "Pos_Waranty_Create",
                        "name": "Tạo đơn",
                        "numberOrder": 1,
                        "parentId": 294,
                        "functions": []
                    },
                    {
                        "id": 296,
                        "code": "Pos_Waranty_Payment",
                        "name": "Thanh toán",
                        "numberOrder": 2,
                        "parentId": 294,
                        "functions": []
                    }
                ]
            },
            {
                "id": 297,
                "code": "Pos_Shift",
                "name": "Ca",
                "numberOrder": 1,
                "parentId": 9,
                "functions": [
                    {
                        "id": 299,
                        "code": "Pos_Shift_Create",
                        "name": "Tạo ca",
                        "numberOrder": 1,
                        "parentId": 297,
                        "functions": []
                    }
                ]
            }
        ]
    },
    {
        "id": 10,
        "code": "POSLinkCMS",
        "name": "Liên kết CMS - POS",
        "numberOrder": 10,
        "parentId": null,
        "functions": [
            {
                "id": 275,
                "code": "Pos_TransactionList",
                "name": "Danh sách giao dịch tại quầy",
                "numberOrder": 1,
                "parentId": 10,
                "functions": [
                    {
                        "id": 277,
                        "code": "Pos_SaleInvoice",
                        "name": "Danh sách hoá đơn bán hàng",
                        "numberOrder": 1,
                        "parentId": 275,
                        "functions": [
                            {
                                "id": 282,
                                "code": "Pos_SaleInvoice_Read",
                                "name": "Xem danh sách",
                                "numberOrder": 1,
                                "parentId": 277,
                                "functions": []
                            }
                        ]
                    },
                    {
                        "id": 278,
                        "code": "Pos_SaleOrderSlip",
                        "name": "Danh sách phiếu đặt hàng",
                        "numberOrder": 2,
                        "parentId": 275,
                        "functions": [
                            {
                                "id": 283,
                                "code": "Pos_SaleOrderSlip_Read",
                                "name": "Xem danh sách",
                                "numberOrder": 1,
                                "parentId": 278,
                                "functions": []
                            }
                        ]
                    },
                    {
                        "id": 279,
                        "code": "Pos_PurchaseSlip",
                        "name": "Danh sách phiếu mua hàng",
                        "numberOrder": 3,
                        "parentId": 275,
                        "functions": [
                            {
                                "id": 284,
                                "code": "Pos_PurchaseSlip_Read",
                                "name": "Xem danh sách",
                                "numberOrder": 1,
                                "parentId": 279,
                                "functions": []
                            }
                        ]
                    },
                    {
                        "id": 280,
                        "code": "Pos_ReturnItemSlip",
                        "name": "Danh sách phiếu đổi trả hàng",
                        "numberOrder": 4,
                        "parentId": 275,
                        "functions": [
                            {
                                "id": 285,
                                "code": "Pos_ReturnItemSlip_Read",
                                "name": "Xem danh sách",
                                "numberOrder": 1,
                                "parentId": 280,
                                "functions": []
                            }
                        ]
                    },
                    {
                        "id": 281,
                        "code": "Pos_WarrantySlip",
                        "name": "Danh sách phiếu bảo hành",
                        "numberOrder": 5,
                        "parentId": 275,
                        "functions": [
                            {
                                "id": 286,
                                "code": "Pos_WarrantySlip_Read",
                                "name": "Xem danh sách",
                                "numberOrder": 1,
                                "parentId": 281,
                                "functions": []
                            }
                        ]
                    }
                ]
            },
            {
                "id": 276,
                "code": "Pos_EndDayReport",
                "name": "Xem báo cáo cuối ngày",
                "numberOrder": 2,
                "parentId": 10,
                "functions": [
                    {
                        "id": 287,
                        "code": "Pos_ProfitReport_Read",
                        "name": "Báo cáo doanh thu",
                        "numberOrder": 1,
                        "parentId": 276,
                        "functions": []
                    },
                    {
                        "id": 288,
                        "code": "Pos_StockReport_Read",
                        "name": "Báo cáo tồn kho",
                        "numberOrder": 2,
                        "parentId": 276,
                        "functions": []
                    }
                ]
            }
        ]
    }
];


export interface RoleFunction {
    id: number;
    code: string;
    name: string;
    users : number;
    permissions: string[];
    status: "active" | "inactive";
}

export const mockRoles: RoleFunction[] = [
    {
        id: 1,
        name: "Quản trị viên",
        code: "ADMIN",
        users: 2,
        permissions: ["Toàn quyền hệ thống"],
        status: "active",
    },
    {
        id: 2,
        name: "Kế toán",
        code: "ACCOUNTANT",
        users: 5,
        permissions: ["Quản lý hóa đơn", "Xem báo cáo"],
        status: "active",
    },
    {
        id: 3,
        name: "Nhân viên bán hàng",
        code: "SALES",
        users: 12,
        permissions: ["Tạo hóa đơn", "Quản lý khách hàng"],
        status: "active",
    },
    {
        id: 4,
        name: "Thủ kho",
        code: "WAREHOUSE",
        users: 3,
        permissions: ["Quản lý kho", "Nhập xuất hàng"],
        status: "active",
    },
]