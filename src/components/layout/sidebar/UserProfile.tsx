"use client";

import Link from "next/link";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";

export function UserProfile({
  mobile = false,
  isCollapsed,
}: {
  mobile: boolean;
  isCollapsed: boolean;
}) {
  return (
    <div className="flex items-center gap-3 py-2">
      <Avatar className="h-10 w-10">
        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      {(!isCollapsed || mobile) && (
        <div className="flex flex-col">
          <span className="text-sm font-medium">Admin</span>
          <span className="text-xs text-muted-foreground">
            admin@fox.ai.vn
          </span>
        </div>
      )}
      {(!isCollapsed || mobile) && (
        <Button variant="ghost" size="icon" className="ml-auto h-8 w-8" asChild>
          <Link href="/auth/login">
            <LogOut className="h-4 w-4" />
            <span className="sr-only">Đăng xuất</span>
          </Link>
        </Button>
      )}
    </div>
  );
}
