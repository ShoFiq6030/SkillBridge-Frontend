import { getUserBookingsAction } from "@/actions/booking.action";
import { UserDashboardClient } from "@/components/modules/userDashboard/UserDashboardClient";
import LoadingPage from '../../../../loadingpage';

export const dynamic = "force-dynamic";

export default async function UserDashboard() {
  const { data: bookingResponse, error } = await getUserBookingsAction();

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-100 text-center space-y-4">
        <div className="p-4 bg-destructive/10 text-destructive rounded-lg max-w-md">
          <p className="font-semibold">Error Loading Dashboard</p>
          <p className="text-sm">{error.message}</p>
        </div>
      </div>
    );
  } 
  
  const bookings = bookingResponse?.data || [];

  return (
    <div>
      <LoadingPage />
      <UserDashboardClient bookings={bookings} />
    </div>
  );
}