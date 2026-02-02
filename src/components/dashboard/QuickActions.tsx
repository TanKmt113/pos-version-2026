"use client";

import { cn } from "@/shared/utils/utils";
import { motion } from "framer-motion";
import {
  ArrowRightLeft,
  BarChart3,
  PlusCircle,
  Receipt,
  SendHorizontal,
  Wallet,
  LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card"; // Đảm bảo đường dẫn này đúng với project của bạn

// 1. Định nghĩa Interface cho Action
interface QuickActionItem {
  title: string;
  href: string;
  icon: LucideIcon;
  description: string;
  color: string;
  lightColor: string;
  iconColor: string;
  hoverColor: string;
}

interface QuickActionsProps {
  className?: string;
}

export function QuickActions({ className }: QuickActionsProps) {
  // 2. Định nghĩa state với kiểu dữ liệu string hoặc null
  const [hoveredAction, setHoveredAction] = useState<string | null>(null);

  // 3. Khai báo mảng actions với kiểu dữ liệu QuickActionItem[]
  const actions: QuickActionItem[] = [
    {
      title: "Add Money",
      href: "/wallets/add-money",
      icon: PlusCircle,
      description: "Deposit funds to your wallet",
      color: "from-emerald-500 to-teal-500",
      lightColor: "bg-emerald-50 dark:bg-emerald-900/20",
      iconColor: "text-emerald-500 dark:text-emerald-400",
      hoverColor: "hover:border-emerald-200 dark:hover:border-emerald-800",
    },
    {
      title: "Send Money",
      href: "/wallets/send-money",
      icon: SendHorizontal,
      description: "Transfer to friends or pay bills",
      color: "from-blue-500 to-indigo-500",
      lightColor: "bg-blue-50 dark:bg-blue-900/20",
      iconColor: "text-blue-500 dark:text-blue-400",
      hoverColor: "hover:border-blue-200 dark:hover:border-blue-800",
    },
    {
      title: "Pay Bills",
      href: "/bills/pay",
      icon: Receipt,
      description: "Pay your recurring expenses",
      color: "from-amber-500 to-orange-500",
      lightColor: "bg-amber-50 dark:bg-amber-900/20",
      iconColor: "text-amber-500 dark:text-amber-400",
      hoverColor: "hover:border-amber-200 dark:hover:border-amber-800",
    },
    {
      title: "Transfer",
      href: "/wallets/transfer",
      icon: ArrowRightLeft,
      description: "Move money between accounts",
      color: "from-violet-500 to-purple-500",
      lightColor: "bg-violet-50 dark:bg-violet-900/20",
      iconColor: "text-violet-500 dark:text-violet-400",
      hoverColor: "hover:border-violet-200 dark:hover:border-violet-800",
    },
    {
      title: "My Wallets",
      href: "/wallets",
      icon: Wallet,
      description: "View and manage your wallets",
      color: "from-cyan-500 to-sky-500",
      lightColor: "bg-cyan-50 dark:bg-cyan-900/20",
      iconColor: "text-cyan-500 dark:text-cyan-400",
      hoverColor: "hover:border-cyan-200 dark:hover:border-cyan-800",
    },
    {
      title: "Reports", // Sửa lỗi chính tả "Repports" -> "Reports"
      href: "/reports",
      icon: BarChart3,
      description: "View your spending patterns",
      color: "from-fuchsia-500 to-pink-500",
      lightColor: "bg-fuchsia-50 dark:bg-fuchsia-900/20",
      iconColor: "text-fuchsia-500 dark:text-fuchsia-400",
      hoverColor: "hover:border-fuchsia-200 dark:hover:border-fuchsia-800",
    },
  ];

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-3">
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>
          Common tasks and operations for your finances
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-3 sm:gap-3">
          {actions.map((action, index) => {
            // Khai báo component Icon để React có thể render
            const IconComponent = action.icon;
            
            return (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onHoverStart={() => setHoveredAction(action.title)}
                onHoverEnd={() => setHoveredAction(null)}
                className="relative"
              >
                <Link
                  href={action.href}
                  className={cn(
                    "relative block h-full rounded-xl border border-border/40 bg-card p-3 transition-all duration-200",
                    "hover:shadow-md hover:border-opacity-100",
                    action.hoverColor,
                    hoveredAction === action.title ? "shadow-md" : ""
                  )}
                >
                  {/* Background decoration */}
                  <div className="absolute top-0 right-0 w-20 h-20 rounded-full -mt-10 -mr-10 opacity-10 overflow-hidden pointer-events-none">
                    <div
                      className={cn(
                        "w-full h-full rounded-full",
                        action.lightColor
                      )}
                    ></div>
                  </div>

                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div
                      className={cn(
                        "flex items-center justify-center w-12 h-12 rounded-full mb-3",
                        action.lightColor
                      )}
                    >
                      <IconComponent className={cn("h-6 w-6", action.iconColor)} />
                    </div>

                    <h3 className="font-medium text-sm sm:text-base mb-1">
                      {action.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {action.description}
                    </p>
                  </div>

                  {/* Hover effect - gradient overlay */}
                  {hoveredAction === action.title && (
                    <motion.div
                      className="absolute inset-0 rounded-xl z-0 pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div
                        className={cn(
                          "absolute inset-0 rounded-xl bg-gradient-to-br opacity-5",
                          action.color
                        )}
                      ></div>
                    </motion.div>
                  )}
                </Link>
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}