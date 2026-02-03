"use client";

import { ReactNode } from "react";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { BarChart, Plus, User, X, FileText } from "lucide-react";

interface HeaderTabsProps {
  children?: ReactNode;
}

export const HeaderTabs = ({ children }: HeaderTabsProps) => {
  return (
    <div className="w-full bg-gradient-to-r from-primary via-primary to-primary/90 shadow-lg">
      <div className="flex justify-between items-center gap-5 px-4 py-2">
        {/* Left Section - Search & Tabs */}
        <div className="flex items-center gap-3 flex-1">
          {/* Search Box */}
          <div className="w-[320px]">{children}</div>

          {/* Active Invoice Tab */}
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20 transition-all hover:bg-white/20">
            <FileText className="h-4 w-4 text-white" />
            <span className="font-medium text-white text-sm">Hóa đơn #001</span>
            <Badge variant="secondary" className="ml-2 bg-green-500 text-white text-xs px-2 py-0.5">
              Đang chỉnh sửa
            </Badge>
            <Button
              size="icon"
              variant="ghost"
              className="h-6 w-6 ml-2 hover:bg-white/20 text-white rounded-full"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>

          {/* Add New Tab Button */}
          <Button
            size="sm"
            className="gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white backdrop-blur-sm transition-all"
          >
            <Plus className="h-4 w-4" />
            <span className="text-sm">Tạo mới</span>
          </Button>
        </div>

        {/* Right Section - Action Buttons */}
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="ghost"
            className="gap-2 hover:bg-white/10 text-white backdrop-blur-sm transition-all"
          >
            <User className="h-4 w-4" />
            <span className="text-sm hidden md:inline">Khách hàng</span>
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="gap-2 hover:bg-white/10 text-white backdrop-blur-sm transition-all"
          >
            <BarChart className="h-4 w-4" />
            <span className="text-sm hidden md:inline">Báo cáo</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
