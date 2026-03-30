export default function TutorManagementPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tutor Management</h1>
        <p className="text-muted-foreground">
          Manage and oversee all tutors on the platform.
        </p>
      </div>

      <div className="rounded-lg border bg-card">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Tutors</h2>
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
              Add Tutor
            </button>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 border rounded-lg">
              <div>
                <p className="font-medium">Dr. Sarah Wilson</p>
                <p className="text-sm text-muted-foreground">Mathematics</p>
              </div>
              <div>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                  Verified
                </span>
              </div>
              <div>
                <p className="text-sm">4.8 ⭐ (156 reviews)</p>
              </div>
              <div>
                <p className="text-sm">$50/hour</p>
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
                  View
                </button>
                <button className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600">
                  Edit
                </button>
                <button className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600">
                  Suspend
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 border rounded-lg">
              <div>
                <p className="font-medium">Prof. Michael Chen</p>
                <p className="text-sm text-muted-foreground">Physics</p>
              </div>
              <div>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                  Verified
                </span>
              </div>
              <div>
                <p className="text-sm">4.9 ⭐ (89 reviews)</p>
              </div>
              <div>
                <p className="text-sm">$60/hour</p>
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
                  View
                </button>
                <button className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600">
                  Edit
                </button>
                <button className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600">
                  Suspend
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 border rounded-lg">
              <div>
                <p className="font-medium">Ms. Emily Davis</p>
                <p className="text-sm text-muted-foreground">
                  English Literature
                </p>
              </div>
              <div>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                  Pending
                </span>
              </div>
              <div>
                <p className="text-sm">4.7 ⭐ (43 reviews)</p>
              </div>
              <div>
                <p className="text-sm">$40/hour</p>
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
                  View
                </button>
                <button className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600">
                  Approve
                </button>
                <button className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600">
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
