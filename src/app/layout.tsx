import "@/app/globals.css";
import { Layout } from "@/components/layout";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Inter } from "next/font/google";
import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "POS - Bán lẻ nhanh chóng và hiệu quả",
  description:
    "Ứng dụng POS mạnh mẽ giúp bạn quản lý bán lẻ một cách nhanh chóng và hiệu quả.",
};

const inter = Inter({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

// 2. Định nghĩa Interface cho Props của RootLayout
interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
