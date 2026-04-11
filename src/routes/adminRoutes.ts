import { Route } from "@/types";

export const adminRoutes: Route[] = [
  {
    title: "Admin Dashboard",
    items: [
      {
        title: "Analytics",
        url: "/dashboard/admin-dashboard/analytics",
      },
      {
        title: "User Management",
        url: "/dashboard/admin-dashboard/user-management",
      },
      {
        title: "Tutor Management",
        url: "/dashboard/admin-dashboard/tutor-management",
      },
      {
        title: "Create Category",
        url: "/dashboard/admin-dashboard/create-category",
      },
      // {
      //   title: "System Settings",
      //   url: "/dashboard/admin-dashboard/system-settings",
      // }

    ],
  },
];
