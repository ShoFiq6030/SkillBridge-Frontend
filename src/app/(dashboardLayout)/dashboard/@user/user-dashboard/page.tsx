export default function UserDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">User Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Track your learning progress and manage your sessions.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total Sessions
              </p>
              <p className="text-2xl font-bold">23</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Upcoming
              </p>
              <p className="text-2xl font-bold">3</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total Spent
              </p>
              <p className="text-2xl font-bold">$1,150</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Favorite Subject
              </p>
              <p className="text-2xl font-bold">Math</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-xl font-semibold mb-4">Upcoming Sessions</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Mathematics - Calculus</p>
                <p className="text-sm text-muted-foreground">
                  Tutor: Dr. Sarah Wilson
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">Tomorrow</p>
                <p className="text-xs text-muted-foreground">2:00 PM</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Physics - Mechanics</p>
                <p className="text-sm text-muted-foreground">
                  Tutor: Prof. Michael Chen
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">Dec 15</p>
                <p className="text-xs text-muted-foreground">4:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Session completed</p>
                <p className="text-xs text-muted-foreground">
                  Mathematics with Dr. Wilson - 2 hours ago
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">New booking confirmed</p>
                <p className="text-xs text-muted-foreground">
                  Physics session - Tomorrow at 4:00 PM
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Review submitted</p>
                <p className="text-xs text-muted-foreground">
                  5-star rating for Chemistry session
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
