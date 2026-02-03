import { Github, Mail, Twitter, Phone, MapPin } from "lucide-react"
import Link from "next/link"

export function Footer() {
	return (
		<footer className="border-t bg-gradient-to-r from-card to-card/80 backdrop-blur-sm">
			<div className="container flex flex-col items-center justify-between gap-6 py-8 md:flex-row md:py-6 max-w-full">
				{/* Left Section - Copyright & Info */}
				<div className="flex flex-col items-center gap-2 md:items-start">
					<p className="text-center text-sm font-semibold text-foreground md:text-left">
						POS Management System
					</p>
					<p className="text-center text-xs text-muted-foreground md:text-left">
						&copy; {new Date().getFullYear()} POS. All rights reserved. Version 1.0.0
					</p>
					<div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
						<div className="flex items-center gap-1">
							<Phone className="h-3 w-3" />
							<span>1900-xxxx</span>
						</div>
						<div className="flex items-center gap-1">
							<MapPin className="h-3 w-3" />
							<span>Hà Nội, Việt Nam</span>
						</div>
					</div>
				</div>

				{/* Center Section - Quick Links */}
				<div className="hidden md:flex items-center gap-6 text-xs">
					<Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
						Về chúng tôi
					</Link>
					<Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
						Chính sách
					</Link>
					<Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
						Điều khoản
					</Link>
					<Link href="/help" className="text-muted-foreground hover:text-foreground transition-colors">
						Trợ giúp
					</Link>
				</div>

				{/* Right Section - Social Links */}
				<div className="flex items-center gap-4">
					<Link 
						href="#" 
						target="_blank" 
						rel="noreferrer" 
						className="text-muted-foreground hover:text-foreground transition-colors hover:scale-110 transform duration-200"
					>
						<Github className="h-4 w-4" />
						<span className="sr-only">GitHub</span>
					</Link>
					<Link 
						href="#" 
						target="_blank" 
						rel="noreferrer" 
						className="text-muted-foreground hover:text-foreground transition-colors hover:scale-110 transform duration-200"
					>
						<Twitter className="h-4 w-4" />
						<span className="sr-only">Twitter</span>
					</Link>
					<Link 
						href="mailto:support@pos.com" 
						className="text-muted-foreground hover:text-foreground transition-colors hover:scale-110 transform duration-200"
					>
						<Mail className="h-4 w-4" />
						<span className="sr-only">Email</span>
					</Link>
				</div>
			</div>
		</footer>
	)
}
