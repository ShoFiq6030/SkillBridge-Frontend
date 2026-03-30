export default function HistoryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Session History</h1>
        <p className="text-muted-foreground">
          Review your past tutoring sessions and track your learning progress.
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
                Hours Learned
              </p>
              <p className="text-2xl font-bold">46</p>
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
                Avg. Rating Given
              </p>
              <p className="text-2xl font-bold">4.9 ⭐</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg border bg-card">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Past Sessions</h2>
            <div className="flex space-x-2">
              <select className="px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring">
                <option value="all">All Sessions</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <select className="px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring">
                <option value="all">All Subjects</option>
                <option value="mathematics">Mathematics</option>
                <option value="physics">Physics</option>
                <option value="chemistry">Chemistry</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 p-4 border rounded-lg">
              <div>
                <p className="font-medium">Dr. Sarah Wilson</p>
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
                  <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
                  <span className="text-xs ml-1">5.0</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
                  Details
                </button>
                <button className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600">
                  Rebook
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 p-4 border rounded-lg">
              <div>
                <p className="font-medium">Prof. Michael Chen</p>
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
                  <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
                  <span className="text-xs ml-1">4.8</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
                  Details
                </button>
                <button className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600">
                  Rebook
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 p-4 border rounded-lg">
              <div>
                <p className="font-medium">Ms. Emily Davis</p>
                <p className="text-sm text-muted-foreground">
                  English Literature
                </p>
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
                <p className="text-xs text-muted-foreground">Refunded</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">No rating</span>
              </div>
              <div>
                <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
                  Details
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 p-4 border rounded-lg">
              <div>
                <p className="font-medium">Dr. Sarah Wilson</p>
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
                  <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
                  <span className="text-xs ml-1">4.9</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
                  Details
                </button>
                <button className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600">
                  Rebook
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg border bg-card p-6">
        <h2 className="text-xl font-semibold mb-4">Learning Progress</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-2xl">📐</span>
            </div>
            <p className="font-medium">Mathematics</p>
            <p className="text-sm text-muted-foreground">
              12 sessions • 24 hours
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: "75%" }}
              ></div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">75% progress</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-2xl">⚛️</span>
            </div>
            <p className="font-medium">Physics</p>
            <p className="text-sm text-muted-foreground">
              8 sessions • 20 hours
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-green-600 h-2 rounded-full"
                style={{ width: "60%" }}
              ></div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">60% progress</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-2xl">🧪</span>
            </div>
            <p className="font-medium">Chemistry</p>
            <p className="text-sm text-muted-foreground">
              3 sessions • 6 hours
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-purple-600 h-2 rounded-full"
                style={{ width: "30%" }}
              ></div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">30% progress</p>
          </div>
        </div>
      </div>
    </div>
  );
}
