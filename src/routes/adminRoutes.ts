import { Route } from "@/types";

export const adminRoutes: Route[] = [
  {
    title: "Admin Dashboard",
    items: [
      {
        title: "Analytics",
        url: "/dashboard/admin-dashboard",
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
        title: "Manage Bookings",
        url: "/dashboard/admin-dashboard/manage-bookings",
      },
      {
        title: "Manage Category",
        url: "/dashboard/admin-dashboard/manage-category",
      },
      // {
      //   title: "System Settings",
      //   url: "/dashboard/admin-dashboard/system-settings",
      // }
    ],
  },
];
