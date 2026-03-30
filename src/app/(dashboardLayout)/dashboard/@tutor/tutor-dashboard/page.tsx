export default function TutorDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tutor Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your tutoring activities.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Today's Sessions
              </p>
              <p className="text-2xl font-bold">3</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                This Week
              </p>
              <p className="text-2xl font-bold">12</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total Students
              </p>
              <p className="text-2xl font-bold">45</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Rating
              </p>
              <p className="text-2xl font-bold">4.8 ⭐</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-xl font-semibold mb-4">Today's Schedule</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Mathematics - Algebra</p>
                <p className="text-sm text-muted-foreground">
                  Student: John Doe
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">2:00 PM</p>
                <p className="text-xs text-muted-foreground">60 min</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Physics - Mechanics</p>
                <p className="text-sm text-muted-foreground">
                  Student: Jane Smith
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">4:00 PM</p>
                <p className="text-xs text-muted-foreground">90 min</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Reviews</h2>
          <div className="space-y-3">
            <div className="p-3 border rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
                <span className="text-sm font-medium">John Doe</span>
              </div>
              <p className="text-sm text-muted-foreground">
                "Excellent tutor! Very patient and explains concepts clearly."
              </p>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
                <span className="text-sm font-medium">Jane Smith</span>
              </div>
              <p className="text-sm text-muted-foreground">
                "Helped me understand physics much better. Highly recommended!"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
