import { adminService } from "@/services/admin.service";

export const dynamic = "force-dynamic";

export default async function AnalyticsPage() {
  const { data, error } = await adminService.getAnalytics();

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <p className="text-red-500">{error.message}</p>
        </div>
      </div>
    );
  }

  console.log(data);
  const { users, bookings, revenue, reviews } = data;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">
          View detailed analytics and insights for your platform.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total Users
              </p>
              <p className="text-2xl font-bold">{users.total}</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Active Tutors
              </p>
              <p className="text-2xl font-bold">{users.tutors}</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total Bookings
              </p>
              <p className="text-2xl font-bold">{bookings.total}</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Revenue
              </p>
              <p className="text-2xl font-bold">${revenue.total.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg border bg-card p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium">New user registration</p>
              <p className="text-xs text-muted-foreground">2 minutes ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium">Booking completed</p>
              <p className="text-xs text-muted-foreground">5 minutes ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium">Tutor profile updated</p>
              <p className="text-xs text-muted-foreground">10 minutes ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
