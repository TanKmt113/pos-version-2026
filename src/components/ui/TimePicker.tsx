"use client"

import { Button } from "@/components/ui/Button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select"
import { Clock } from "lucide-react"
import * as React from "react"

interface TimePickerProps {
  value: string // Định dạng "HH:mm" 24h
  onChange: (value: string) => void
}

export function TimePicker({ value, onChange }: TimePickerProps) {
  const [hour, setHour] = React.useState<number>(() => {
    const [hours] = value.split(":")
    const parsedHour = parseInt(hours, 10)
    return parsedHour > 12 ? parsedHour - 12 : parsedHour === 0 ? 12 : parsedHour
  })

  const [minute, setMinute] = React.useState<number>(() => {
    const [, minutes] = value.split(":")
    return parseInt(minutes, 10)
  })

  const [meridiem, setMeridiem] = React.useState<"AM" | "PM">(() => {
    const [hours] = value.split(":")
    return parseInt(hours, 10) >= 12 ? "PM" : "AM"
  })

  React.useEffect(() => {
    let adjustedHour = hour
    if (meridiem === "PM" && hour !== 12) {
      adjustedHour += 12
    } else if (meridiem === "AM" && hour === 12) {
      adjustedHour = 0
    }
    const formattedHour = adjustedHour.toString().padStart(2, "0")
    const formattedMinute = minute.toString().padStart(2, "0")
    onChange(`${formattedHour}:${formattedMinute}`)
  }, [hour, minute, meridiem, onChange])

  return (
    <div className="flex items-center space-x-2">
      {/* Giờ */}
      <Select value={hour.toString()} onValueChange={(newHour) => setHour(parseInt(newHour, 10))}>
        <SelectTrigger className="w-[70px]">
          <SelectValue placeholder={hour.toString().padStart(2, "0")} />
        </SelectTrigger>
        <SelectContent>
          {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
            <SelectItem key={h} value={h.toString()}>
              {h.toString().padStart(2, "0")}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <span className="text-xl">:</span>

      {/* Phút */}
      <Select value={minute.toString()} onValueChange={(newMinute) => setMinute(parseInt(newMinute, 10))}>
        <SelectTrigger className="w-[70px]">
          <SelectValue placeholder={minute.toString().padStart(2, "0")} />
        </SelectTrigger>
        <SelectContent>
          {Array.from({ length: 60 }, (_, i) => i).map((m) => (
            <SelectItem key={m} value={m.toString()}>
              {m.toString().padStart(2, "0")}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* AM/PM */}
      <Select value={meridiem} onValueChange={(v) => setMeridiem(v as "AM" | "PM")}>
        <SelectTrigger className="w-[70px]">
          <SelectValue placeholder={meridiem} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="AM">AM</SelectItem>
          <SelectItem value="PM">PM</SelectItem>
        </SelectContent>
      </Select>

      {/* Nút đặt thời gian hiện tại */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => {
          const now = new Date()
          const currentHour = now.getHours()
          const currentMinute = now.getMinutes()
          setHour(currentHour % 12 || 12)
          setMinute(currentMinute)
          setMeridiem(currentHour >= 12 ? "PM" : "AM")
          onChange(`${currentHour.toString().padStart(2, "0")}:${currentMinute.toString().padStart(2, "0")}`)
        }}
      >
        <Clock className="h-4 w-4" />
        <span className="sr-only">Set to current time</span>
      </Button>
    </div>
  )
}
