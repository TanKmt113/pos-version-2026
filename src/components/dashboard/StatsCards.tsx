"use client";

import { Card } from "@/components/ui/Card";
import { cn } from "@/shared/utils/utils";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowDown,
  ArrowUp,
  CreditCard,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts";

export function StatsCards() {
  const stats = [
    {
      title: "Total Balance",
      value: "$14,278.45",
      change: "+2.5%",
      trend: "up",
      icon: DollarSign,
      color: "from-emerald-500 to-teal-500",
      lightColor: "bg-emerald-50 dark:bg-emerald-950/30",
      strokeColor: "#10b981", // emerald-500
      fillColor: "#10b98120", // emerald-500 with opacity
      decorationColor: "emerald",
      data: [
        { value: 4000 },
        { value: 3500 },
        { value: 4500 },
        { value: 4200 },
        { value: 5000 },
        { value: 4800 },
        { value: 5800 },
        { value: 5500 },
      ],
    },
    {
      title: "Monthly Income",
      value: "$3,100.00",
      change: "+5.1%",
      trend: "up",
      icon: TrendingUp,
      color: "from-blue-500 to-indigo-500",
      lightColor: "bg-blue-50 dark:bg-blue-950/30",
      strokeColor: "#3b82f6", // blue-500
      fillColor: "#3b82f620", // blue-500 with opacity
      decorationColor: "blue",
      data: [
        { value: 3000 },
        { value: 4000 },
        { value: 3500 },
        { value: 4500 },
        { value: 4000 },
        { value: 5000 },
        { value: 5500 },
        { value: 6000 },
      ],
    },
    {
      title: "Monthly Expenses",
      value: "$1,823.75",
      change: "+12.3%",
      trend: "down", // This is actually bad for expenses
      icon: CreditCard,
      color: "from-rose-500 to-pink-500",
      lightColor: "bg-rose-50 dark:bg-rose-950/30",
      strokeColor: "#f43f5e", // rose-500
      fillColor: "#f43f5e20", // rose-500 with opacity
      decorationColor: "rose",
      data: [
        { value: 2500 },
        { value: 3000 },
        { value: 3500 },
        { value: 4000 },
        { value: 4500 },
        { value: 5000 },
        { value: 5500 },
        { value: 6000 },
      ],
    },
    {
      title: "Savings Rate",
      value: "41.2%",
      change: "+2.1%",
      trend: "up",
      icon: Activity,
      color: "from-violet-500 to-purple-500",
      lightColor: "bg-violet-50 dark:bg-violet-950/30",
      strokeColor: "#8b5cf6", // violet-500
      fillColor: "#8b5cf620", // violet-500 with opacity
      decorationColor: "violet",
      data: [
        { value: 35 },
        { value: 40 },
        { value: 30 },
        { value: 35 },
        { value: 40 },
        { value: 35 },
        { value: 38 },
        { value: 40 },
      ],
    },
  ];

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat, index) => (
        <StatCard key={stat.title} stat={stat} index={index} />
      ))}
    </div>
  );
}

function StatCard({ stat, index }: { stat: any; index: number }) {
  const Icon = stat.icon;

  // Custom tooltip that matches our design
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border/40 rounded-lg shadow-sm p-2 text-xs">
          <p className="font-medium">{`Value: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Card
        className={cn(
          "overflow-hidden border-border/40 hover:shadow-md transition-all duration-300 group",
          "decoration-card decoration-" + stat.decorationColor
        )}
      >
        <div className="relative p-6">
          {/* Background accent */}
          <div
            className={cn(
              "absolute top-0 right-0 w-24 h-24 rounded-full -mt-8 -mr-8 opacity-10",
              stat.lightColor
            )}
          />

          {/* Top row with icon and chart */}
          <div className="flex justify-between items-start mb-4">
            {/* Icon with gradient background */}
            <div
              className={cn(
                "flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br",
                stat.color
              )}
            >
              <Icon className="h-6 w-6 text-white" />
            </div>

            {/* Recharts line chart in top right */}
            <div className="w-40 h-12 relative z-10">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={stat.data}
                  margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id={`gradient-${index}`}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor={stat.strokeColor}
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="95%"
                        stopColor={stat.strokeColor}
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <Tooltip content={<CustomTooltip />} cursor={false} />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke={stat.strokeColor}
                    strokeWidth={2}
                    fillOpacity={1}
                    fill={`url(#gradient-${index})`}
                    animationDuration={1000}
                    animationEasing="ease-out"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Value and title */}
          <div className="flex justify-between items-center">
            <div className="space-y-1 relative z-10">
              <h3 className="text-3xl font-semibold tracking-tight">
                {stat.value}
              </h3>
              <p className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </p>
            </div>

            {/* Change indicator */}
            <div className="mt-4 flex items-center relative z-10">
              <div
                className={cn(
                  "flex items-center justify-center rounded-full p-1 mr-2",
                  stat.trend === "up"
                    ? "text-emerald-500 bg-emerald-100 dark:bg-emerald-950/30"
                    : "text-rose-500 bg-rose-100 dark:bg-rose-950/30"
                )}
              >
                {stat.trend === "up" ? (
                  <ArrowUp className="h-3 w-3" />
                ) : (
                  <ArrowDown className="h-3 w-3" />
                )}
              </div>
              <p
                className={cn(
                  "text-xs font-medium",
                  stat.trend === "up" ? "text-emerald-500" : "text-rose-500"
                )}
              >
                {stat.change} from last month
              </p>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
