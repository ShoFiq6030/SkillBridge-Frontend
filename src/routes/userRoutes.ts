import { Route } from "@/types";

export const userRoutes: Route[] = [
  {
    title: "User Dashboard",
    items: [
      {
        title: "Create Blog",
        url: "/dashboard/create-blog",
      },
      {
        title: "History",
        url: "/dashboard/history",
      },
    ],
  },
];
