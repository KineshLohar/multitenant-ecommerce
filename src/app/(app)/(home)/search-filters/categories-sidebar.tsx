import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { CustomeCategory } from "../../types";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    data: CustomeCategory[];
}

export const CategoriesSidebar = ({ open, onOpenChange, data }: Props) => {

    const router = useRouter();
    const [parentCategories, setParentCategories] = useState<CustomeCategory[] | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<CustomeCategory | null>(null);

    const currentCategories = parentCategories ?? data ?? [];

    const handleOpenChange = (open: boolean) => {
        setParentCategories(null);
        setSelectedCategory(null)
        onOpenChange(false)
    }

    const handleCategoryClick = (category: CustomeCategory) => {

        if (category.subcategories && category?.subcategories?.length > 0) {
            setParentCategories(category.subcategories as CustomeCategory[]);
            setSelectedCategory(category)
        } else {
            if (parentCategories && selectedCategory) {
                router.push(`/${selectedCategory?.slug}/${category?.slug}`)
            } else {
                if (category.slug === 'all') {
                    router.push("/")
                } else {
                    router.push(`/${category?.slug}`)
                }
            }
            handleOpenChange(false)
        }
    }

    const handleBackClick = () => {
        if (parentCategories) {
            setParentCategories(null);
            setSelectedCategory(null);
        }
    }

    const backgroundColor = selectedCategory?.color || 'white'

    return (
        <Sheet open={open} onOpenChange={handleOpenChange}>
            <SheetContent
                side="left"
                className="p-0 transition-none"
                style={{ backgroundColor }}
            >
                <SheetHeader className="p-4 border-b">
                    <SheetTitle>
                        Categories
                    </SheetTitle>
                </SheetHeader>
                <ScrollArea>
                    {
                        parentCategories && (
                            <button
                                onClick={handleBackClick}
                                className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium cursor-pointer"
                            >
                                <ChevronLeft className="size-4 mr-2" />
                                Back
                            </button>
                        )
                    }
                    {
                        currentCategories?.map((category) => (
                            <button
                                key={category?.slug}
                                onClick={() => handleCategoryClick(category)}
                                className="w-full text-left p-4 hover:bg-black hover:text-white flex justify-between items-center text-base font-medium cursor-pointer"
                            >
                                {category?.name}
                                {category?.subcategories && category?.subcategories?.length > 0 && (
                                    <ChevronRight className="size-4" />
                                )}
                            </button>
                        ))
                    }
                </ScrollArea>
            </SheetContent>
        </Sheet>
    )
}