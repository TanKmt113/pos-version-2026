"use client";

import { Editor } from "@tinymce/tinymce-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}
export default function EditorClient({ value, onChange }: Props) {
  return (
    <Editor
      apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
      value={value}
      onEditorChange={(newValue, editor) => {
        onChange(newValue);
      }}
      init={{
        height: 500,
        plugins: "lists link image table code help wordcount",
        toolbar:
          "undo redo | code |  formatselect | bold italic emoticons | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image table | help",
        skin: "oxide",
        content_css: "light",
      }}
    />
  );
}
