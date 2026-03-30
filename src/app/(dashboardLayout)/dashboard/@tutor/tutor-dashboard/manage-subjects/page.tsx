export default function ManageSubjectsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Manage Subjects</h1>
        <p className="text-muted-foreground">
          Add or remove subjects you can tutor in.
        </p>
      </div>

      <div className="rounded-lg border bg-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Your Subjects</h2>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
            Add Subject
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium">Mathematics</h3>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                Active
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Algebra, Calculus, Geometry
            </p>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
                Edit
              </button>
              <button className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600">
                Remove
              </button>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium">Physics</h3>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                Active
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Mechanics, Thermodynamics
            </p>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
                Edit
              </button>
              <button className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600">
                Remove
              </button>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium">Chemistry</h3>
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                Pending
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Organic Chemistry
            </p>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
                Edit
              </button>
              <button className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600">
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg border bg-card p-6">
        <h2 className="text-xl font-semibold mb-4">Add New Subject</h2>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium">
                Subject Category
              </label>
              <select
                id="subject"
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Select a subject</option>
                <option value="mathematics">Mathematics</option>
                <option value="physics">Physics</option>
                <option value="chemistry">Chemistry</option>
                <option value="biology">Biology</option>
                <option value="english">English</option>
                <option value="history">History</option>
                <option value="computer-science">Computer Science</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="hourlyRate" className="text-sm font-medium">
                Hourly Rate ($)
              </label>
              <input
                id="hourlyRate"
                type="number"
                placeholder="50"
                min="10"
                max="200"
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="specializations" className="text-sm font-medium">
              Specializations
            </label>
            <textarea
              id="specializations"
              placeholder="List specific topics you specialize in..."
              rows={3}
              className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="experience" className="text-sm font-medium">
              Years of Experience
            </label>
            <input
              id="experience"
              type="number"
              placeholder="3"
              min="0"
              max="50"
              className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Add Subject
          </button>
        </form>
      </div>
    </div>
  );
}
