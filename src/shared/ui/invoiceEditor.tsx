"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

const CKEditorComponent = dynamic(() => import("./ckeditor"), {
  ssr: false,
  loading: () => <p>Đang tải editor...</p>,
});

type props = {
  onChange: (value: string) => void;
};

export const InvoiceEditor = ({ onChange }: props) => {

  return (
    <div className="p-8">
      <CKEditorComponent
        initialData="<p>Nội dung ban đầu của bạn</p>"
        onChange={(data) =>onChange(data)}
        onReady={(editor) => {
          console.log("Editor sẵn sàng!", editor);
        }}
        placeholder="Nhập nội dung..."
      />
    </div>
  );
};
