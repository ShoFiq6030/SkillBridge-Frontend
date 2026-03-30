export default function ManageSlotsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Manage Slots</h1>
        <p className="text-muted-foreground">
          Set your availability and manage your tutoring schedule.
        </p>
      </div>

      <div className="rounded-lg border bg-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Weekly Schedule</h2>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
            Add Time Slot
          </button>
        </div>

        <div className="space-y-4">
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-3">Monday</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="flex items-center justify-between p-2 bg-green-50 border border-green-200 rounded">
                <span className="text-sm">9:00 AM - 10:00 AM</span>
                <div className="flex space-x-1">
                  <button className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600">
                    Edit
                  </button>
                  <button className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600">
                    Delete
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between p-2 bg-green-50 border border-green-200 rounded">
                <span className="text-sm">2:00 PM - 4:00 PM</span>
                <div className="flex space-x-1">
                  <button className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600">
                    Edit
                  </button>
                  <button className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-3">Tuesday</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="flex items-center justify-between p-2 bg-green-50 border border-green-200 rounded">
                <span className="text-sm">10:00 AM - 12:00 PM</span>
                <div className="flex space-x-1">
                  <button className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600">
                    Edit
                  </button>
                  <button className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600">
                    Delete
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between p-2 bg-yellow-50 border border-yellow-200 rounded">
                <span className="text-sm">3:00 PM - 5:00 PM (Booked)</span>
                <span className="px-2 py-1 text-xs bg-gray-500 text-white rounded">
                  Booked
                </span>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-3">Wednesday</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="flex items-center justify-between p-2 bg-green-50 border border-green-200 rounded">
                <span className="text-sm">1:00 PM - 3:00 PM</span>
                <div className="flex space-x-1">
                  <button className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600">
                    Edit
                  </button>
                  <button className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-3">Thursday</h3>
            <p className="text-sm text-muted-foreground">No slots available</p>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-3">Friday</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="flex items-center justify-between p-2 bg-green-50 border border-green-200 rounded">
                <span className="text-sm">11:00 AM - 1:00 PM</span>
                <div className="flex space-x-1">
                  <button className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600">
                    Edit
                  </button>
                  <button className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg border bg-card p-6">
        <h2 className="text-xl font-semibold mb-4">Add New Time Slot</h2>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label htmlFor="day" className="text-sm font-medium">
                Day
              </label>
              <select
                id="day"
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="monday">Monday</option>
                <option value="tuesday">Tuesday</option>
                <option value="wednesday">Wednesday</option>
                <option value="thursday">Thursday</option>
                <option value="friday">Friday</option>
                <option value="saturday">Saturday</option>
                <option value="sunday">Sunday</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="startTime" className="text-sm font-medium">
                Start Time
              </label>
              <input
                id="startTime"
                type="time"
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="endTime" className="text-sm font-medium">
                End Time
              </label>
              <input
                id="endTime"
                type="time"
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              id="recurring"
              type="checkbox"
              defaultChecked
              className="rounded border-gray-300"
            />
            <label htmlFor="recurring" className="text-sm font-medium">
              Recurring weekly
            </label>
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Add Time Slot
          </button>
        </form>
      </div>
    </div>
  );
}
