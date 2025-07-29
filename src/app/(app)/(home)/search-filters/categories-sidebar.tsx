import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { CategoriesGetManyOutputTypes } from "@/modules/categories/types";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const CategoriesSidebar = ({ open, onOpenChange }: Props) => {


    const trpc = useTRPC();
    const { data } = useQuery(trpc.categories.getMany.queryOptions())

    const router = useRouter();
    const [parentCategories, setParentCategories] = useState<CategoriesGetManyOutputTypes | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<CategoriesGetManyOutputTypes[1] | null>(null);

    const currentCategories = parentCategories ?? data ?? [];

    const handleOpenChange = (open: boolean) => {
        setParentCategories(null);
        setSelectedCategory(null)
        onOpenChange(false)
    }

    const handleCategoryClick = (category: CategoriesGetManyOutputTypes[1]) => {

        if (category.subcategories && category?.subcategories?.length > 0) {
            setParentCategories(category.subcategories as CategoriesGetManyOutputTypes);
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