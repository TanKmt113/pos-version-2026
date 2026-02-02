"use client"

import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/Tooltip"
import { cn } from "@/shared/utils/utils" 
import { Gift, HelpCircle, PlusCircle, Wallet, Zap } from "lucide-react"
import Link from "next/link"

export function QuickActions({ mobile, onItemClick, isCollapsed }) {
	const actions = [
		{
			name: "Add New Wallet",
			href: "/add-wallet",
			icon: PlusCircle,
			variant: "default",
			highlight: true,
		},
		{
			name: "My Wallets",
			href: "/wallets",
			icon: Wallet,
			variant: "outline",
			badge: "3",
		},
		// {
		// 	name: "Rewards",
		// 	href: "/rewards",
		// 	icon: Gift,
		// 	variant: "outline",
		// 	badge: "New",
		// 	badgeVariant: "success",
		// },
		// {
		// 	name: "Help & Support",
		// 	href: "/help",
		// 	icon: HelpCircle,
		// 	variant: "outline",
		// },
	]

	return (
		<TooltipProvider>
			<div className="grid gap-2">
				{actions.map((action) =>
					isCollapsed && !mobile ? (
						<Tooltip key={action.href} delayDuration={0}>
							<TooltipTrigger asChild>
								<Button
									variant={action.variant}
									size="icon"
									className={cn(
										"h-9 w-9 rounded-md relative",
										action.highlight && "bg-primary hover:bg-primary/90 text-primary-foreground",
										action.variant === "outline" && "border-border/50 hover:bg-accent/50 hover:border-border",
									)}
									asChild
								>
									<Link href={action.href} onClick={onItemClick}>
										<action.icon className="h-4 w-4" />
										{action.badge && (
											<Badge
												variant={action.badgeVariant || "default"}
												className={cn(
													"absolute -top-1.5 -right-1.5 px-1 min-w-[18px] h-[18px] text-[10px] font-medium",
													action.badgeVariant === "success" && "bg-emerald-500 hover:bg-emerald-500/90",
												)}
											>
												{action.badge}
											</Badge>
										)}
									</Link>
								</Button>
							</TooltipTrigger>
							<TooltipContent side="right" className="font-medium">
								{action.name}
							</TooltipContent>
						</Tooltip>
					) : (
						<Button
							key={action.href}
							variant={action.variant}
							size="sm"
							className={cn(
								"justify-start h-9 relative",
								action.highlight && "bg-primary hover:bg-primary/90 text-primary-foreground",
								action.variant === "outline" && "border-border/50 hover:bg-accent/50 hover:border-border",
							)}
							asChild
						>
							<Link href={action.href} onClick={onItemClick}>
								<action.icon className="h-4 w-4 mr-2 flex-shrink-0" />
								<span className="truncate">{action.name}</span>
								{action.badge && (
									<Badge
										variant={action.badgeVariant || "default"}
										className={cn(
											"ml-auto text-[10px] px-1 min-w-[18px] h-[18px]",
											action.badgeVariant === "success" && "bg-emerald-500 hover:bg-emerald-500/90",
										)}
									>
										{action.badge}
									</Badge>
								)}
							</Link>
						</Button>
					),
				)}
			</div>
		</TooltipProvider>
	)
}
