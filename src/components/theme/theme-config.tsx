"use client";

import { useThemeContext } from "@/components/theme/theme-provider";
import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { Label } from "@/components/ui/Label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import { cn } from "@/shared/utils/utils";
import {
  ArrowLeft,
  ArrowRight,
  Monitor,
  Moon,
  PanelLeft,
  PanelTop,
  Settings,
  Sun,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

// Giả định kiểu dữ liệu cho Primary Color
type PrimaryColor = "teal" | "pink" | "blue" | "green" | "red" | "slate";

export function ThemeConfig() {
  // next-themes cung cấp sẵn types cho setTheme và theme
  const { theme, setTheme, resolvedTheme } = useTheme();

  // Lấy dữ liệu từ Context (Bạn nên đảm bảo ThemeContext đã có interface tương ứng)
  const { layout, setLayout, direction, setDirection, config } =
    useThemeContext();

  const [open, setOpen] = useState<boolean>(false);
  const [primaryColor, setPrimaryColor] = useState<PrimaryColor>(
    (config.colors?.defaultPrimaryColor as PrimaryColor) || "teal"
  );

  // Handle theme change
  const handleThemeChange = (value: string) => {
    setTheme(value);
  };

  // Handle layout change
  const handleLayoutChange = (value: string) => {
    setLayout(value);
  };

  // Handle direction change
  const handleDirectionChange = (value: "ltr" | "rtl") => {
    setDirection(value);
  };

  // Handle primary color change
  const handleColorChange = (color: PrimaryColor) => {
    setPrimaryColor(color);

    // Update CSS variables
    if (typeof window !== "undefined") {
      document.documentElement.style.setProperty(
        "--primary",
        `var(--${color})`
      );
      document.documentElement.style.setProperty(
        "--primary-foreground",
        `var(--${color}-foreground)`
      );
    }
  };

  // Load saved primary color on mount
  useEffect(() => {
    const savedColor = localStorage.getItem(
      "primaryColor"
    ) as PrimaryColor | null;
    const defaultColor =
      (config.colors?.defaultPrimaryColor as PrimaryColor) || "teal";
    const finalColor = savedColor || defaultColor;

    setPrimaryColor(finalColor);
    handleColorChange(finalColor);
  }, [config.colors?.defaultPrimaryColor]);

  // Save color preference
  useEffect(() => {
    localStorage.setItem("primaryColor", primaryColor);
  }, [primaryColor]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-foreground/60 hover:text-foreground relative"
        >
          <Settings className="h-4 w-4" />
          <span className="sr-only">Cài đặt</span>
          <span
            className={cn(
              "absolute -top-0.5 -right-0.5 h-1.5 w-1.5 rounded-full",
              `bg-${primaryColor}-500`
            )}
          />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[360px] p-4">
        <DialogHeader>
          <DialogTitle className="text-base">Giao diện</DialogTitle>
        </DialogHeader>

        <div className="py-4 space-y-6">
          {/* Theme Selection */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Chủ đề</Label>
            <RadioGroup
              value={theme}
              onValueChange={handleThemeChange}
              className="flex gap-2"
            >
              <ThemeOption
                value="light"
                activeValue={theme}
                icon={Sun}
                label="Sáng"
              />
              <ThemeOption
                value="dark"
                activeValue={theme}
                icon={Moon}
                label="Tối"
              />
              <ThemeOption
                value="system"
                activeValue={theme}
                icon={Monitor}
                label="Tự động"
              />
            </RadioGroup>
          </div>

          {/* Primary Color Selection */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Màu chính</Label>
            <div className="flex items-center gap-2">
              <ColorButton
                color="teal"
                hex="#11B989"
                current={primaryColor}
                onClick={handleColorChange}
              />
              <ColorButton
                color="pink"
                current={primaryColor}
                onClick={handleColorChange}
                className="bg-pink-500"
              />
              <ColorButton
                color="blue"
                current={primaryColor}
                onClick={handleColorChange}
                className="bg-blue-500"
              />
              <ColorButton
                color="green"
                current={primaryColor}
                onClick={handleColorChange}
                className="bg-green-500"
              />
              <ColorButton
                color="red"
                current={primaryColor}
                onClick={handleColorChange}
                className="bg-red-500"
              />
            </div>
          </div>

          {/* Layout Selection */}
          {config.availableLayouts.length > 1 && (
            <div className="space-y-2">
              <Label className="text-sm font-medium">Bố cục</Label>
              <RadioGroup
                value={layout}
                onValueChange={handleLayoutChange}
                className="flex gap-2"
              >
                <LayoutOption
                  value="vertical"
                  activeValue={layout}
                  icon={PanelLeft}
                  label="Sidebar"
                />
                <LayoutOption
                  value="horizontal"
                  activeValue={layout}
                  icon={PanelTop}
                  label="Horizontal"
                />
              </RadioGroup>
            </div>
          )}

          {/* Direction Selection */}
          {config.availableDirections.length > 1 && (
            <div className="space-y-2">
              <Label className="text-sm font-medium">Phương hướng</Label>
              <RadioGroup
                value={direction}
                onValueChange={handleDirectionChange}
                className="flex gap-2"
              >
                <LayoutOption
                  value="ltr"
                  activeValue={direction}
                  icon={ArrowRight}
                  label="LTR"
                />
                <LayoutOption
                  value="rtl"
                  activeValue={direction}
                  icon={ArrowLeft}
                  label="RTL"
                />
              </RadioGroup>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setOpen(false)}
            className="w-full"
          >
            Đóng
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// --- Sub-components để code gọn sạch hơn ---

interface ColorButtonProps {
  color: PrimaryColor;
  hex?: string;
  current: string;
  onClick: (color: PrimaryColor) => void;
  className?: string;
}

function ColorButton({
  color,
  hex,
  current,
  onClick,
  className,
}: ColorButtonProps) {
  return (
    <button
      onClick={() => onClick(color)}
      style={hex ? { backgroundColor: hex } : undefined}
      className={cn(
        "w-8 h-8 rounded-full border-2 transition-all",
        className,
        current === color
          ? "border-black dark:border-white scale-110"
          : "border-transparent hover:scale-105"
      )}
      aria-label={`${color} theme color`}
    />
  );
}

interface OptionProps {
  value: string;
  activeValue: string | undefined;
  icon: any;
  label: string;
}

function ThemeOption({ value, activeValue, icon: Icon, label }: OptionProps) {
  return (
    <Label
      className={cn(
        "flex-1 flex items-center justify-center gap-2 p-2 rounded cursor-pointer border text-sm transition-colors",
        activeValue === value ? "border-primary bg-primary/5" : "hover:bg-muted"
      )}
    >
      <RadioGroupItem value={value} id={value} className="sr-only" />
      <Icon className="h-4 w-4" />
      {label}
    </Label>
  );
}

// Tái sử dụng ThemeOption cho Layout
const LayoutOption = ThemeOption;
