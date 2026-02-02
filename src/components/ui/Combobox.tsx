"use client"

import * as React from "react"
import { Button } from "@/components/ui/Button"
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from "@/components/ui/Command"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/Popover"
import { cn } from "@/shared/utils/utils"
import { Check, ChevronsUpDown } from "lucide-react"

// ----------------------
// Combobox Root
// ----------------------
type ComboboxProps = React.HTMLAttributes<HTMLDivElement>

const Combobox = React.forwardRef<HTMLDivElement, ComboboxProps>(
	({ className, ...props }, ref) => (
		<div ref={ref} className={cn("relative", className)} {...props} />
	)
)
Combobox.displayName = "Combobox"

// ----------------------
// Combobox Trigger
// ----------------------
type ComboboxTriggerProps = React.ComponentPropsWithoutRef<typeof Button> & {
	children?: React.ReactNode
}

const ComboboxTrigger = React.forwardRef<HTMLButtonElement, ComboboxTriggerProps>(
	({ className, children, ...props }, ref) => (
		<PopoverTrigger asChild>
			<Button
				ref={ref}
				variant="outline"
				role="combobox"
				className={cn("w-full justify-between", className)}
				{...props}
			>
				{children}
				<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
			</Button>
		</PopoverTrigger>
	)
)
ComboboxTrigger.displayName = "ComboboxTrigger"

// ----------------------
// Combobox Content
// ----------------------
type ComboboxContentProps = React.HTMLAttributes<HTMLDivElement> & {
	children?: React.ReactNode
}

const ComboboxContent = React.forwardRef<HTMLDivElement, ComboboxContentProps>(
	({ className, children, ...props }, ref) => (
		<Popover>
			<PopoverContent ref={ref} className={cn("w-full p-0", className)} {...props}>
				<Command>{children}</Command>
			</PopoverContent>
		</Popover>
	)
)
ComboboxContent.displayName = "ComboboxContent"

// ----------------------
// Combobox Input
// ----------------------
type ComboboxInputProps = React.ComponentPropsWithoutRef<typeof CommandInput>

const ComboboxInput = React.forwardRef<HTMLInputElement, ComboboxInputProps>(
	({ className, ...props }, ref) => (
		<CommandInput ref={ref} className={cn("", className)} {...props} />
	)
)
ComboboxInput.displayName = "ComboboxInput"

// ----------------------
// Combobox Empty
// ----------------------
type ComboboxEmptyProps = React.ComponentPropsWithoutRef<typeof CommandEmpty>

const ComboboxEmpty = React.forwardRef<HTMLDivElement, ComboboxEmptyProps>(
	({ className, ...props }, ref) => (
		<CommandEmpty ref={ref} className={cn("py-6 text-center text-sm", className)} {...props} />
	)
)
ComboboxEmpty.displayName = "ComboboxEmpty"

// ----------------------
// Combobox Group
// ----------------------
type ComboboxGroupProps = React.ComponentPropsWithoutRef<typeof CommandGroup>

const ComboboxGroup = React.forwardRef<HTMLDivElement, ComboboxGroupProps>(
	({ className, ...props }, ref) => (
		<CommandGroup ref={ref} className={cn("", className)} {...props} />
	)
)
ComboboxGroup.displayName = "ComboboxGroup"

// ----------------------
// Combobox Item
// ----------------------
type ComboboxItemProps = React.ComponentPropsWithoutRef<typeof CommandItem> & {
	selected?: boolean
	children?: React.ReactNode
}

const ComboboxItem = React.forwardRef<HTMLDivElement, ComboboxItemProps>(
	({ className, children, selected, ...props }, ref) => (
		<CommandItem ref={ref} className={cn("", className)} {...props}>
			{children}
			<Check
				className={cn("ml-auto h-4 w-4", selected ? "opacity-100" : "opacity-0")}
			/>
		</CommandItem>
	)
)
ComboboxItem.displayName = "ComboboxItem"

// ----------------------
// Export
// ----------------------
export {
	Combobox,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxGroup,
	ComboboxInput,
	ComboboxItem,
	ComboboxTrigger,
}
