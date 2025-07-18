import { Category } from "@/payload-types"
import { CategoryDropdown } from "./category-dropdown"

interface Props {
    data: any
}

export const Categories = ({ data }: Props) => {
    return (
        <div className=" relative w-full">
            <div className="flex flex-nowrap items-center">
                {
                    data?.map((cat: Category) => (
                        <div key={cat?.id}>
                            <CategoryDropdown
                                category={cat}
                                isActive={false}
                                isNavigationHovered={false}
                            />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}