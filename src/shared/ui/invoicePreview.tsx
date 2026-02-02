interface Props {
  htmlContent: string;
}

export const InvoicePreview = ({ htmlContent }: Props) => {
  console.log("Nội dung HTML nhận được trong Preview:", htmlContent);
  function renderTemplate(
    template: string,
    data: Record<string, string | number>
  ): string {
    return template.replace(
      /\{([\w_]+)(?:\|([^}]+))?\}/g,
      (_, key, defaultValue) => {
        if (data[key] !== undefined) {
          return String(data[key]);
        }

        return defaultValue ?? `{${key}}`;
      }
    );
  }

  const invoiceData = {
    Ma_Don_Hang: "HD-2026-001",
    Khach_Hang: "Nguyễn Văn A",
    So_Dien_Thoai: "0909123456",
    Dia_Chi_Khach_Hang: "123 Đường ABC, Quận 1, TP.HCM",
    Phuong_Xa_Khach_Hang: "Phường Bến Nghé",
    Quan_Huyen_Khach_Hang: "Quận 1",
    Khu_Vuc_Khach_Hang_QH_TP: "TP.HCM",
    Ngay_Thang: "25/10/2026",
    Tong_Tien: "2.500.000đ",
    Tieu_De_In: "HÓA ĐƠN BÁN HÀNG",
    Ten_Cua_Hang: "Cửa Hàng ABC",
    Logo_Cua_Hang: `<img src="https://logo.kiotviet.vn/KiotViet-Logo-Horizontal.svg" style="max-width: 200px;">`,
    Chiet_Khau_Hoa_Don_Phan_Tram: "10%",
    Tong_Tien_Hang: "250.000đ",
    Chiet_Khau_Hoa_Don: "250.000đ",
    Tong_Cong: "2.250.000đ",
    Tong_Cong_Bang_Chu: "Hai triệu hai trăm năm mươi nghìn đồng",
    Ma_QR: "<img src='https://api.qrserver.com/v1/create-qr-code/?data=HD-2026-001&size=100x100' alt='QR Code' />",
  };

  const html = renderTemplate(htmlContent, invoiceData);

  return (
    <div className="w-full h-full bg-gray-100 flex justify-center">
      <iframe
        className="w-[210mm] h-[297mm] bg-white shadow-lg"
        frameBorder={0}
        scrolling="yes"
        srcDoc={html}
      />
    </div>
  );
};
