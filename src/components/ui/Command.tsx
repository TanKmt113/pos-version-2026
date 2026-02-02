"use client"

import * as React from "react"
import { Command as CommandPrimitive } from "cmdk"
import { Search } from "lucide-react"

import { Dialog, DialogContent, DialogProps } from "@/components/ui/Dialog"
import { cn } from "@/shared/utils/utils"

// ----------------------
// Command Root
// ----------------------
type CommandProps = React.ComponentPropsWithoutRef<typeof CommandPrimitive>

const Command = React.forwardRef<HTMLDivElement, CommandProps>(
	({ className, ...props }, ref) => (
		<CommandPrimitive
			ref={ref}
			className={cn(
				"flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
				className
			)}
			{...props}
		/>
	)
)
Command.displayName = CommandPrimitive.displayName

// ----------------------
// Command Dialog
// ----------------------
type CommandDialogProps = DialogProps & {
	children?: React.ReactNode
}

const CommandDialog: React.FC<CommandDialogProps> = ({ children, ...props }) => (
	<Dialog {...props}>
		<DialogContent className="overflow-hidden p-0 shadow-lg">
			<Command
				className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5"
			>
				{children}
			</Command>
		</DialogContent>
	</Dialog>
)
CommandDialog.displayName = "CommandDialog"

// ----------------------
// Command Input
// ----------------------
type CommandInputProps = React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>

const CommandInput = React.forwardRef<HTMLInputElement, CommandInputProps>(
	({ className, ...props }, ref) => (
		<div className="flex items-center border-b px-3" cmdk-input-wrapper="">
			<Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
			<CommandPrimitive.Input
				ref={ref}
				className={cn(
					"flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
					className
				)}
				{...props}
			/>
		</div>
	)
)
CommandInput.displayName = CommandPrimitive.Input.displayName

// ----------------------
// Command List
// ----------------------
type CommandListProps = React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>

const CommandList = React.forwardRef<HTMLDivElement, CommandListProps>(
	({ className, ...props }, ref) => (
		<CommandPrimitive.List
			ref={ref}
			className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)}
			{...props}
		/>
	)
)
CommandList.displayName = CommandPrimitive.List.displayName

// ----------------------
// Command Empty
// ----------------------
type CommandEmptyProps = React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>

const CommandEmpty = React.forwardRef<HTMLDivElement, CommandEmptyProps>(
	(props, ref) => <CommandPrimitive.Empty ref={ref} className="py-6 text-center text-sm" {...props} />
)
CommandEmpty.displayName = CommandPrimitive.Empty.displayName

// ----------------------
// Command Group
// ----------------------
type CommandGroupProps = React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>

const CommandGroup = React.forwardRef<HTMLDivElement, CommandGroupProps>(
	({ className, ...props }, ref) => (
		<CommandPrimitive.Group
			ref={ref}
			className={cn(
				"overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
				className
			)}
			{...props}
		/>
	)
)
CommandGroup.displayName = CommandPrimitive.Group.displayName

// ----------------------
// Command Separator
// ----------------------
type CommandSeparatorProps = React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>

const CommandSeparator = React.forwardRef<HTMLDivElement, CommandSeparatorProps>(
	({ className, ...props }, ref) => (
		<CommandPrimitive.Separator ref={ref} className={cn("-mx-1 h-px bg-border", className)} {...props} />
	)
)
CommandSeparator.displayName = CommandPrimitive.Separator.displayName

// ----------------------
// Command Item
// ----------------------
type CommandItemProps = React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>

const CommandItem = React.forwardRef<HTMLDivElement, CommandItemProps>(
	({ className, ...props }, ref) => (
		<CommandPrimitive.Item
			ref={ref}
			className={cn(
				"relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
				className
			)}
			{...props}
		/>
	)
)
CommandItem.displayName = CommandPrimitive.Item.displayName

// ----------------------
// Command Shortcut
// ----------------------
type CommandShortcutProps = React.HTMLAttributes<HTMLSpanElement>

const CommandShortcut: React.FC<CommandShortcutProps> = ({ className, ...props }) => (
	<span className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)} {...props} />
)
CommandShortcut.displayName = "CommandShortcut"

// ----------------------
// Export
// ----------------------
export {
	Command,
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut,
}
