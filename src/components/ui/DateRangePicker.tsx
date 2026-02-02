/* eslint-disable max-lines */
"use client";

import { cn } from "@/shared/utils/utils";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "./Button";
import { Calendar } from "./Calendar";
import { DateInput } from "./DateInput";
import { Label } from "./Label";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./Select";
import { Switch } from "./Switch";

// --- Interfaces ---

export interface DateRange {
  from: Date;
  to?: Date;
}

export interface DateRangePickerProps {
  initialDateFrom?: Date | string;
  initialDateTo?: Date | string;
  initialCompareFrom?: Date | string;
  initialCompareTo?: Date | string;
  onUpdate?: (values: { range: DateRange; rangeCompare?: DateRange }) => void;
  align?: "start" | "center" | "end";
  locale?: string;
  showCompare?: boolean;
}

interface Preset {
  name: string;
  label: string;
}

// --- Helpers ---

const formatDate = (date: Date, locale: string = "en-us"): string => {
  return date.toLocaleDateString(locale, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const getDateAdjustedForTimezone = (dateInput: Date | string): Date => {
  if (typeof dateInput === "string") {
    const parts = dateInput.split("-").map((part) => parseInt(part, 10));
    // Month is 0-indexed
    return new Date(parts[0], parts[1] - 1, parts[2]);
  }
  return dateInput;
};

const PRESETS: Preset[] = [
  { name: "today", label: "Today" },
  { name: "yesterday", label: "Yesterday" },
  { name: "last7", label: "Last 7 days" },
  { name: "last14", label: "Last 14 days" },
  { name: "last30", label: "Last 30 days" },
  { name: "thisWeek", label: "This Week" },
  { name: "lastWeek", label: "Last Week" },
  { name: "thisMonth", label: "This Month" },
  { name: "lastMonth", label: "Last Month" },
];

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  initialDateFrom = new Date(new Date().setHours(0, 0, 0, 0)),
  initialDateTo,
  initialCompareFrom,
  initialCompareTo,
  onUpdate,
  align = "end",
  locale = "en-US",
  showCompare = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const [range, setRange] = useState<DateRange>({
    from: getDateAdjustedForTimezone(initialDateFrom),
    to: initialDateTo
      ? getDateAdjustedForTimezone(initialDateTo)
      : getDateAdjustedForTimezone(initialDateFrom),
  });

  const [rangeCompare, setRangeCompare] = useState<DateRange | undefined>(
    initialCompareFrom
      ? {
          from: new Date(new Date(initialCompareFrom).setHours(0, 0, 0, 0)),
          to: initialCompareTo
            ? new Date(new Date(initialCompareTo).setHours(0, 0, 0, 0))
            : new Date(new Date(initialCompareFrom).setHours(0, 0, 0, 0)),
        }
      : undefined
  );

  const openedRangeRef = useRef<DateRange | undefined>(undefined);
  const openedRangeCompareRef = useRef<DateRange | undefined>(undefined);

  const [selectedPreset, setSelectedPreset] = useState<string | undefined>(
    undefined
  );

  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(
    typeof window !== "undefined" ? window.innerWidth < 960 : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 960);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getPresetRange = (presetName: string): DateRange => {
    const preset = PRESETS.find(({ name }) => name === presetName);
    if (!preset) throw new Error(`Unknown date range preset: ${presetName}`);
    const from = new Date();
    const to = new Date();
    const first = from.getDate() - from.getDay();

    switch (preset.name) {
      case "today":
        from.setHours(0, 0, 0, 0);
        to.setHours(23, 59, 59, 999);
        break;
      case "yesterday":
        from.setDate(from.getDate() - 1);
        from.setHours(0, 0, 0, 0);
        to.setDate(to.getDate() - 1);
        to.setHours(23, 59, 59, 999);
        break;
      case "last7":
        from.setDate(from.getDate() - 6);
        from.setHours(0, 0, 0, 0);
        to.setHours(23, 59, 59, 999);
        break;
      case "last14":
        from.setDate(from.getDate() - 13);
        from.setHours(0, 0, 0, 0);
        to.setHours(23, 59, 59, 999);
        break;
      case "last30":
        from.setDate(from.getDate() - 29);
        from.setHours(0, 0, 0, 0);
        to.setHours(23, 59, 59, 999);
        break;
      case "thisWeek":
        from.setDate(first);
        from.setHours(0, 0, 0, 0);
        to.setHours(23, 59, 59, 999);
        break;
      case "lastWeek":
        from.setDate(from.getDate() - 7 - from.getDay());
        to.setDate(to.getDate() - to.getDay() - 1);
        from.setHours(0, 0, 0, 0);
        to.setHours(23, 59, 59, 999);
        break;
      case "thisMonth":
        from.setDate(1);
        from.setHours(0, 0, 0, 0);
        to.setHours(23, 59, 59, 999);
        break;
      case "lastMonth":
        from.setMonth(from.getMonth() - 1);
        from.setDate(1);
        from.setHours(0, 0, 0, 0);
        to.setDate(0);
        to.setHours(23, 59, 59, 999);
        break;
    }

    return { from, to };
  };

  const setPreset = (preset: string): void => {
    const newRange = getPresetRange(preset);
    setRange(newRange);
    if (rangeCompare) {
      const newRangeCompare: DateRange = {
        from: new Date(
          newRange.from.getFullYear() - 1,
          newRange.from.getMonth(),
          newRange.from.getDate()
        ),
        to: newRange.to
          ? new Date(
              newRange.to.getFullYear() - 1,
              newRange.to.getMonth(),
              newRange.to.getDate()
            )
          : undefined,
      };
      setRangeCompare(newRangeCompare);
    }
  };

  const checkPreset = (): void => {
    for (const preset of PRESETS) {
      const presetRange = getPresetRange(preset.name);

      const normalizedRangeFrom = new Date(range.from).setHours(0, 0, 0, 0);
      const normalizedPresetFrom = new Date(presetRange.from).setHours(
        0,
        0,
        0,
        0
      );

      const normalizedRangeTo = new Date(range.to ?? 0).setHours(0, 0, 0, 0);
      const normalizedPresetTo = new Date(presetRange.to ?? 0).setHours(
        0,
        0,
        0,
        0
      );

      if (
        normalizedRangeFrom === normalizedPresetFrom &&
        normalizedRangeTo === normalizedPresetTo
      ) {
        setSelectedPreset(preset.name);
        return;
      }
    }
    setSelectedPreset(undefined);
  };

  const resetValues = (): void => {
    setRange({
      from: getDateAdjustedForTimezone(initialDateFrom),
      to: initialDateTo
        ? getDateAdjustedForTimezone(initialDateTo)
        : getDateAdjustedForTimezone(initialDateFrom),
    });
    setRangeCompare(
      initialCompareFrom
        ? {
            from: getDateAdjustedForTimezone(initialCompareFrom),
            to: initialCompareTo
              ? getDateAdjustedForTimezone(initialCompareTo)
              : getDateAdjustedForTimezone(initialCompareFrom),
          }
        : undefined
    );
  };

  useEffect(() => {
    checkPreset();
  }, [range]);

  const areRangesEqual = (a?: DateRange, b?: DateRange): boolean => {
    if (!a || !b) return a === b;
    return (
      a.from.getTime() === b.from.getTime() &&
      (!a.to || !b.to ? a.to === b.to : a.to.getTime() === b.to.getTime())
    );
  };

  useEffect(() => {
    if (isOpen) {
      openedRangeRef.current = range;
      openedRangeCompareRef.current = rangeCompare;
    }
  }, [isOpen]);

  return (
    <Popover
      modal={true}
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) resetValues();
        setIsOpen(open);
      }}
    >
      <PopoverTrigger asChild>
        <Button size={"lg"} variant="outline">
          <div className="text-right">
            <div className="py-1">
              <div>{`${formatDate(range.from, locale)}${
                range.to != null ? " - " + formatDate(range.to, locale) : ""
              }`}</div>
            </div>
            {rangeCompare != null && (
              <div className="opacity-60 text-xs -mt-1">
                vs. {formatDate(rangeCompare.from, locale)}
                {rangeCompare.to != null
                  ? ` - ${formatDate(rangeCompare.to, locale)}`
                  : ""}
              </div>
            )}
          </div>
          <div className="pl-1 opacity-60 -mr-2 scale-125">
            {isOpen ? (
              <ChevronUpIcon width={24} />
            ) : (
              <ChevronDownIcon width={24} />
            )}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent align={align} className="w-auto">
        <div className="flex py-2">
          <div className="flex flex-col">
            <div className="flex flex-col lg:flex-row gap-2 px-3 justify-end items-center lg:items-start pb-4 lg:pb-0">
              {showCompare && (
                <div className="flex items-center space-x-2 pr-4 py-1">
                  <Switch
                    checked={Boolean(rangeCompare)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        if (!range.to)
                          setRange({ from: range.from, to: range.from });
                        setRangeCompare({
                          from: new Date(
                            range.from.getFullYear(),
                            range.from.getMonth(),
                            range.from.getDate() - 365
                          ),
                          to: range.to
                            ? new Date(
                                range.to.getFullYear() - 1,
                                range.to.getMonth(),
                                range.to.getDate()
                              )
                            : new Date(
                                range.from.getFullYear() - 1,
                                range.from.getMonth(),
                                range.from.getDate()
                              ),
                        });
                      } else {
                        setRangeCompare(undefined);
                      }
                    }}
                    id="compare-mode"
                  />
                  <Label htmlFor="compare-mode">Compare</Label>
                </div>
              )}
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <DateInput
                    value={range.from}
                    onChange={(date: Date) => {
                      const toDate =
                        !range.to || date > range.to ? date : range.to;
                      setRange((prev) => ({ ...prev, from: date, to: toDate }));
                    }}
                  />
                  <div className="py-1">-</div>
                  <DateInput
                    value={range.to}
                    onChange={(date: Date) => {
                      const fromDate = date < range.from ? date : range.from;
                      setRange((prev) => ({
                        ...prev,
                        from: fromDate,
                        to: date,
                      }));
                    }}
                  />
                </div>
                {rangeCompare && (
                  <div className="flex gap-2">
                    <DateInput
                      value={rangeCompare.from}
                      onChange={(date: Date) => {
                        const toDate =
                          !rangeCompare.to || date > rangeCompare.to
                            ? date
                            : rangeCompare.to;
                        setRangeCompare((prev) =>
                          prev ? { ...prev, from: date, to: toDate } : undefined
                        );
                      }}
                    />
                    <div className="py-1">-</div>
                    <DateInput
                      value={rangeCompare.to}
                      onChange={(date: Date) => {
                        const fromDate =
                          rangeCompare.from && date < rangeCompare.from
                            ? date
                            : rangeCompare.from;
                        setRangeCompare((prev) =>
                          prev
                            ? { ...prev, from: fromDate, to: date }
                            : undefined
                        );
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
            {isSmallScreen && (
              <Select defaultValue={selectedPreset} onValueChange={setPreset}>
                <SelectTrigger className="w-[180px] mx-auto mb-2">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  {PRESETS.map((p) => (
                    <SelectItem key={p.name} value={p.name}>
                      {p.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            <Calendar
              mode="range"
              onSelect={(value: any) => {
                if (value?.from) setRange({ from: value.from, to: value?.to });
              }}
              selected={range}
              numberOfMonths={isSmallScreen ? 1 : 2}
              defaultMonth={
                new Date(
                  new Date().setMonth(
                    new Date().getMonth() - (isSmallScreen ? 0 : 1)
                  )
                )
              }
            />
          </div>
          {!isSmallScreen && (
            <div className="flex flex-col items-end gap-1 pr-2 pl-6 pb-6">
              {PRESETS.map((preset) => (
                <Button
                  key={preset.name}
                  variant="ghost"
                  className={cn(
                    selectedPreset === preset.name && "pointer-events-none"
                  )}
                  onClick={() => setPreset(preset.name)}
                >
                  <span
                    className={cn(
                      "pr-2 opacity-0",
                      selectedPreset === preset.name && "opacity-70"
                    )}
                  >
                    <CheckIcon width={18} height={18} />
                  </span>
                  {preset.label}
                </Button>
              ))}
            </div>
          )}
        </div>
        <div className="flex justify-end gap-2 py-2 pr-4">
          <Button
            onClick={() => {
              setIsOpen(false);
              resetValues();
            }}
            variant="ghost"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              setIsOpen(false);
              if (
                !areRangesEqual(range, openedRangeRef.current) ||
                !areRangesEqual(rangeCompare, openedRangeCompareRef.current)
              ) {
                onUpdate?.({ range, rangeCompare });
              }
            }}
          >
            Update
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

DateRangePicker.displayName = "DateRangePicker";
