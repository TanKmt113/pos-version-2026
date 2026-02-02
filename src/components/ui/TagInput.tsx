import * as React from "react"
import { cn } from "@/shared/utils/utils"
import { X } from "lucide-react"

// Lấy tất cả props của input trừ 'onChange'
type OmitOnChange<T> = Omit<T, "onChange">

interface TagInputProps extends OmitOnChange<React.InputHTMLAttributes<HTMLInputElement>> {
  value: string[]
  onChange: (tags: string[]) => void
  className?: string
}

const TagInput = ({ value, onChange, className, ...props }: TagInputProps) => {
  const [inputValue, setInputValue] = React.useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault()
      onChange([...value, inputValue.trim()])
      setInputValue("")
    } else if (e.key === "Backspace" && !inputValue && value.length > 0) {
      onChange(value.slice(0, -1))
    }
  }

  const handleRemoveTag = (index: number) => {
    onChange(value.filter((_, i) => i !== index))
  }

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
        className
      )}
    >
      {value.map((tag, index) => (
        <span
          key={index}
          className="inline-flex items-center rounded-md bg-secondary px-2 py-1 text-sm font-medium text-secondary-foreground"
        >
          {tag}
          <button
            type="button"
            onClick={() => handleRemoveTag(index)}
            className="ml-1 rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <X className="h-3 w-3" />
            <span className="sr-only">Remove tag</span>
          </button>
        </span>
      ))}

      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
        {...props}
      />
    </div>
  )
}

export default TagInput
