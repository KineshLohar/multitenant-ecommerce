import { AppRouter } from "@/trpc/routers/_app";
import { inferRouterOutputs } from "@trpc/server";


export type CategoriesGetManyOutputTypes = inferRouterOutputs<AppRouter>["categories"]["getMany"]