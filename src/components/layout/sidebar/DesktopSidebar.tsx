"use client";

import navItems from "@/components/layout/navItems";
import { Logo } from "@/components/logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { ScrollArea } from "@/components/ui/ScrollArea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Tooltip";
import { cn } from "@/shared/utils/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavigationItems } from "./NavigationItems";
import { UserProfile } from "./UserProfile";

export function DesktopSidebar({
  isCollapsed,
  direction = "ltr",
}: {
  isCollapsed: boolean;
  direction?: "ltr" | "rtl";
}) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <TooltipProvider>
      <div
        className={cn(
          "fixed top-0 bottom-0 z-40 hidden md:flex h-screen flex-col border-r bg-card shadow-sm transition-all duration-300",
          isCollapsed ? "w-[70px]" : "w-[260px]",
          direction === "rtl" ? "right-0 border-l" : "left-0 border-r"
        )}
      >
        {/* Logo in Sidebar */}
        <div className="flex h-16 shrink-0 items-center border-b px-3 py-4">
          <Logo showText={!isCollapsed} />
        </div>

        <ScrollArea className="flex-1">
          {/* Main Navigation */}
          <div className="px-3 py-4">
            {!isCollapsed && (
              <h2 className="mb-2 px-2 text-xs font-semibold text-muted-foreground">
                MAIN NAVIGATION
              </h2>
            )}
            {isCollapsed ? (
              <div className="grid gap-1">
                {navItems.map((item) => (
                  <Tooltip key={item.name} delayDuration={0}>
                    <TooltipTrigger asChild>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center justify-center rounded-md p-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                          isActive(item.href)
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground"
                        )}
                      >
                        <item.icon
                          className={cn(
                            "h-5 w-5",
                            isActive(item.href) && "text-primary"
                          )}
                        />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent
                      side={direction === "rtl" ? "left" : "right"}
                    >
                      {item.name}
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            ) : (
              <NavigationItems
                isCollapsed={isCollapsed}
                mobile={false}
                direction={direction}
              />
            )}
          </div>
        </ScrollArea>

        {/* User Profile Section */}
        <div className="mt-auto border-t p-3">
          {isCollapsed ? (
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-full"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src="/placeholder.svg?height=40&width=40"
                      alt="User"
                    />
                    <AvatarFallback>Ad</AvatarFallback>
                  </Avatar>
                </Button>
              </TooltipTrigger>
              <TooltipContent side={direction === "rtl" ? "left" : "right"}>
                Admin
              </TooltipContent>
            </Tooltip>
          ) : (
            <UserProfile isCollapsed={isCollapsed} />
          )}
        </div>
      </div>
    </TooltipProvider>
  );
}
