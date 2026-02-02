"use client";

import { useState } from "react";
import { InvoicePreview } from "@/shared/ui/invoicePreview";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/Button";
import { Plus } from "lucide-react";

export default function InvoicePage() {
  const [template, setTemplate] = useState("");

  const EditorClient = dynamic(() => import("@/shared/ui/editorClient"), {
    ssr: false,
    loading: () => <p>Đang tải editor...</p>,
  });

  return (
    <div className="flex flex-col gap-4 sm:gap-6  sm:py-6">
      <div className="flex justify-between">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
          Mẫu hóa đơn
        </h1>
        <Button variant="default" size="default">
          <Plus className="mr-2 h-4 w-4" />
          Thêm mới
        </Button>
      </div>
      <div className="flex flex-1 ">
        {/* Cột trái: Editor */}
        <section className="w-1/2 p-4 border-r flex flex-col gap-4 bg-gray-50">
          <EditorClient onChange={setTemplate} value={template} />
        </section>
        {/* Cột phải: Preview */}
        <section className="w-1/2">
          <InvoicePreview htmlContent={template} />
        </section>
      </div>
    </div>
  );
}
