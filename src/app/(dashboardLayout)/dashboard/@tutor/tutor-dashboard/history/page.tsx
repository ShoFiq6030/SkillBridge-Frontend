export default function HistoryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Session History</h1>
        <p className="text-muted-foreground">
          View your past tutoring sessions and performance metrics.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total Sessions
              </p>
              <p className="text-2xl font-bold">156</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total Earnings
              </p>
              <p className="text-2xl font-bold">$7,800</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Avg. Rating
              </p>
              <p className="text-2xl font-bold">4.8 ⭐</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Completion Rate
              </p>
              <p className="text-2xl font-bold">98%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg border bg-card">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Recent Sessions</h2>
            <div className="flex space-x-2">
              <select className="px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring">
                <option value="all">All Time</option>
                <option value="month">This Month</option>
                <option value="week">This Week</option>
                <option value="today">Today</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 p-4 border rounded-lg">
              <div>
                <p className="font-medium">Emma Davis</p>
                <p className="text-sm text-muted-foreground">Mathematics</p>
              </div>
              <div>
                <p className="text-sm">Dec 12, 2024</p>
                <p className="text-xs text-muted-foreground">
                  2:00 PM - 3:00 PM
                </p>
              </div>
              <div>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                  Completed
                </span>
              </div>
              <div>
                <p className="text-sm">$50.00</p>
              </div>
              <div>
                <div className="flex items-center space-x-1">
                  <span className="text-yellow-400">⭐</span>
                  <span className="text-sm">5.0</span>
                </div>
              </div>
              <div>
                <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
                  View Details
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 p-4 border rounded-lg">
              <div>
                <p className="font-medium">Michael Chen</p>
                <p className="text-sm text-muted-foreground">Physics</p>
              </div>
              <div>
                <p className="text-sm">Dec 10, 2024</p>
                <p className="text-xs text-muted-foreground">
                  4:00 PM - 5:30 PM
                </p>
              </div>
              <div>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                  Completed
                </span>
              </div>
              <div>
                <p className="text-sm">$75.00</p>
              </div>
              <div>
                <div className="flex items-center space-x-1">
                  <span className="text-yellow-400">⭐</span>
                  <span className="text-sm">4.8</span>
                </div>
              </div>
              <div>
                <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
                  View Details
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 p-4 border rounded-lg">
              <div>
                <p className="font-medium">Sarah Johnson</p>
                <p className="text-sm text-muted-foreground">Chemistry</p>
              </div>
              <div>
                <p className="text-sm">Dec 8, 2024</p>
                <p className="text-xs text-muted-foreground">
                  10:00 AM - 11:00 AM
                </p>
              </div>
              <div>
                <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                  Cancelled
                </span>
              </div>
              <div>
                <p className="text-sm">$0.00</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">No rating</span>
              </div>
              <div>
                <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
                  View Details
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 p-4 border rounded-lg">
              <div>
                <p className="font-medium">David Wilson</p>
                <p className="text-sm text-muted-foreground">Mathematics</p>
              </div>
              <div>
                <p className="text-sm">Dec 5, 2024</p>
                <p className="text-xs text-muted-foreground">
                  1:00 PM - 2:00 PM
                </p>
              </div>
              <div>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                  Completed
                </span>
              </div>
              <div>
                <p className="text-sm">$50.00</p>
              </div>
              <div>
                <div className="flex items-center space-x-1">
                  <span className="text-yellow-400">⭐</span>
                  <span className="text-sm">4.9</span>
                </div>
              </div>
              <div>
                <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg border bg-card p-6">
        <h2 className="text-xl font-semibold mb-4">Monthly Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">24</p>
            <p className="text-sm text-muted-foreground">Sessions This Month</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">$1,200</p>
            <p className="text-sm text-muted-foreground">Earnings This Month</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-600">4.9</p>
            <p className="text-sm text-muted-foreground">Average Rating</p>
          </div>
        </div>
      </div>
    </div>
  );
}
