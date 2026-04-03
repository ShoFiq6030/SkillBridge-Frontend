import { Route } from "@/types";

export const tutorRoutes: Route[] = [
  {
    title: "Tutor Dashboard",
    items: [
      {
        title: "Dashboard Home",
        url: "/dashboard/tutor-dashboard",
      },
      {
        title: "Manage Subjects",
        url: "/dashboard/tutor-dashboard/manage-subjects",
      },
      {
        title: "Manage Slots",
        url: "/dashboard/tutor-dashboard/manage-slots",
      },
      {
        title: "Manage Bookings",
        url: "/dashboard/tutor-dashboard/manage-bookings",
      },

    ],
  },
];

