import { getUserBookingsAction } from "@/actions/booking.action";
import { UserDashboardClient } from "@/components/modules/userDashboard/UserDashboardClient";

export default async function UserDashboard() {
  const { data: bookingResponse, error } = await getUserBookingsAction();

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-4">
        <div className="p-4 bg-destructive/10 text-destructive rounded-lg max-w-md">
          <p className="font-semibold">Error Loading Dashboard</p>
          <p className="text-sm">{error.message}</p>
        </div>
      </div>
    );
  } 

  const bookings = bookingResponse?.data || [];

  return <UserDashboardClient bookings={bookings} />;
}
