'use client'

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Poppins } from "next/font/google"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { NavbarSidebar } from "./navbar-sidebar"
import { useState } from "react"
import { MenuIcon } from "lucide-react"

const poppins = Poppins({
    subsets: ['latin'],
    weight: "700"
})

const navs = [
    { href: '/', children: 'Home' },
    { href: '/about', children: 'About' },
    { href: '/pricing', children: 'Pricing' },
    { href: '/feaures', children: 'Features' }
]


const NavItem = ({ href, children, isActive }: { href: string; children: React.ReactNode; isActive: boolean }) => {
    return (
        <Button
            asChild
            className={cn("bg-transparent hover:bg-transparent rounded-full hover:border-primary border-transparent  text-black px-3.5 text-lg",
                isActive && 'bg-black text-white hover:bg-black hover:text-white'
            )}
        >
            <Link href={href}>
                {children}
            </Link>
        </Button>
    )
}

export const Navbar = () => {
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    return (
        <nav className="h-20 flex justify-between font-medium bg-white border-b">
            <Link href='/' className="pl-6 flex items-center">
                <span className={cn("text-5xl font-semibold", poppins.className)}>
                    FunRoad
                </span>
            </Link>
            <div className="hidden lg:flex items-center gap-4">
                {
                    navs?.map((item) => (
                        <NavItem
                            key={item?.href}
                            href={item?.href}
                            isActive={pathname === item?.href}
                        >
                            {item?.children}
                        </NavItem>
                    ))
                }
            </div>
            <div className="hidden lg:flex">
                <Button asChild className="h-full px-12 text-lg text-black bg-white border-l border-y-0 border-r-0 rounded-none hover:bg-pink-400 transition-colors">
                    <Link href='/sign-in'>
                        Log In
                    </Link>
                </Button>
                <Button asChild className="h-full px-12 text-lg bg-black text-white border-l border-y-0 border-r-0 rounded-none hover:bg-pink-400 hover:text-black transition-colors">
                    <Link href='/sign-up'>
                        Start Selling
                    </Link>
                </Button>
            </div>
            <div className="flex lg:hidden items-center justify-center">
                <Button variant='ghost'
                    className="size-12 border-transparent bg-white p-0"
                    onClick={() => setIsSidebarOpen(true)}
                >
                    <MenuIcon />
                </Button>

            </div>
            <NavbarSidebar open={isSidebarOpen} onOpenChange={setIsSidebarOpen} items={navs} />
        </nav>
    )
}