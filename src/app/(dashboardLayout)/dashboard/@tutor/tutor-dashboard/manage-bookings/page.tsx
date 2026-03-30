export default function ManageBookingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Manage Bookings</h1>
        <p className="text-muted-foreground">
          View and manage your tutoring session bookings.
        </p>
      </div>

      <div className="rounded-lg border bg-card">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Upcoming Sessions</h2>
            <div className="flex space-x-2">
              <select className="px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring">
                <option value="all">All Status</option>
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 p-4 border rounded-lg">
              <div>
                <p className="font-medium">John Doe</p>
                <p className="text-sm text-muted-foreground">Mathematics</p>
              </div>
              <div>
                <p className="text-sm">Tomorrow</p>
                <p className="text-xs text-muted-foreground">
                  2:00 PM - 3:00 PM
                </p>
              </div>
              <div>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                  Confirmed
                </span>
              </div>
              <div>
                <p className="text-sm">$50.00</p>
              </div>
              <div>
                <p className="text-sm">Online</p>
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
                  Join
                </button>
                <button className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600">
                  Cancel
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 p-4 border rounded-lg">
              <div>
                <p className="font-medium">Jane Smith</p>
                <p className="text-sm text-muted-foreground">Physics</p>
              </div>
              <div>
                <p className="text-sm">Dec 15, 2024</p>
                <p className="text-xs text-muted-foreground">
                  4:00 PM - 5:30 PM
                </p>
              </div>
              <div>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                  Confirmed
                </span>
              </div>
              <div>
                <p className="text-sm">$75.00</p>
              </div>
              <div>
                <p className="text-sm">In-person</p>
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
                  Join
                </button>
                <button className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600">
                  Cancel
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 p-4 border rounded-lg">
              <div>
                <p className="font-medium">Bob Johnson</p>
                <p className="text-sm text-muted-foreground">Chemistry</p>
              </div>
              <div>
                <p className="text-sm">Dec 18, 2024</p>
                <p className="text-xs text-muted-foreground">
                  10:00 AM - 11:00 AM
                </p>
              </div>
              <div>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                  Pending
                </span>
              </div>
              <div>
                <p className="text-sm">$50.00</p>
              </div>
              <div>
                <p className="text-sm">Online</p>
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600">
                  Accept
                </button>
                <button className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600">
                  Decline
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg border bg-card p-6">
        <h2 className="text-xl font-semibold mb-4">Past Sessions</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 border rounded-lg">
            <div>
              <p className="font-medium">Alice Brown</p>
              <p className="text-sm text-muted-foreground">Mathematics</p>
            </div>
            <div>
              <p className="text-sm">Dec 10, 2024</p>
              <p className="text-xs text-muted-foreground">3:00 PM - 4:00 PM</p>
            </div>
            <div>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                Completed
              </span>
            </div>
            <div>
              <p className="text-sm">$50.00</p>
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
                View Details
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 border rounded-lg">
            <div>
              <p className="font-medium">Charlie Wilson</p>
              <p className="text-sm text-muted-foreground">Physics</p>
            </div>
            <div>
              <p className="text-sm">Dec 8, 2024</p>
              <p className="text-xs text-muted-foreground">1:00 PM - 2:30 PM</p>
            </div>
            <div>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                Completed
              </span>
            </div>
            <div>
              <p className="text-sm">$75.00</p>
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
