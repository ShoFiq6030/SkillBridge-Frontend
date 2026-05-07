import { Route } from "@/types";

export const userRoutes: Route[] = [
  {
    title: "User Dashboard",
    items: [
      {
        title: "Dashboard Home",
        url: "/dashboard/user-dashboard",
      },
      {
        title: "Chats",
        url: "/dashboard/user-dashboard/chat",
      },
     
    ],
  },
];
