import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import Link from "next/link";

interface NavbarItem {
    href: string;
    children: React.ReactNode
}

interface Props {
    items: NavbarItem[];
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const NavbarSidebar = ({
    open, items, onOpenChange
}: Props) => {
    return (
        <Sheet open={open} onOpenChange={onOpenChange} >
            <SheetContent
                side='left'
                className="p-0 transition-none"
            >
                <SheetHeader className="p-4 border-b">
                    <SheetTitle>
                        Menu
                    </SheetTitle>
                </SheetHeader>
                <ScrollArea className="flex flex-col overflow-y-auto pb-2">
                    {
                        items?.map(item => (
                            <Link
                                href={item?.href}
                                key={item?.href}
                                className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center font-medium text-base"
                                onClick={() => onOpenChange(false)}
                            >
                                {item?.children}
                            </Link>
                        ))
                    }
                    <div className="border-t">
                        <Link href='/sign-in'
                            onClick={() => onOpenChange(false)}
                            className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center font-medium text-base"
                        >
                            Log In
                        </Link>
                        <Link href='/sign-up'
                            onClick={() => onOpenChange(false)}
                            className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center font-medium text-base"
                        >
                            Start Selling
                        </Link>
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    )
}