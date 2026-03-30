export default function CreateCategoryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create Category</h1>
        <p className="text-muted-foreground">
          Create new subject categories for tutors to offer their services.
        </p>
      </div>

      <div className="rounded-lg border bg-card p-6">
        <form className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="categoryName" className="text-sm font-medium">
              Category Name
            </label>
            <input
              id="categoryName"
              type="text"
              placeholder="e.g., Mathematics, Physics, English"
              className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <textarea
              id="description"
              placeholder="Describe what this category covers..."
              rows={4}
              className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="icon" className="text-sm font-medium">
              Icon (Optional)
            </label>
            <input
              id="icon"
              type="text"
              placeholder="Icon name or URL"
              className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              id="isActive"
              type="checkbox"
              defaultChecked
              className="rounded border-gray-300"
            />
            <label htmlFor="isActive" className="text-sm font-medium">
              Active (visible to users)
            </label>
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
              Create Category
            </button>
            <button
              type="button"
              className="px-4 py-2 border border-input rounded-md hover:bg-accent"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      <div className="rounded-lg border bg-card p-6">
        <h2 className="text-xl font-semibold mb-4">Existing Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-medium">Mathematics</h3>
            <p className="text-sm text-muted-foreground">
              Algebra, Calculus, Geometry
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-medium">Physics</h3>
            <p className="text-sm text-muted-foreground">
              Mechanics, Thermodynamics, Electromagnetism
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-medium">Chemistry</h3>
            <p className="text-sm text-muted-foreground">
              Organic, Inorganic, Physical Chemistry
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-medium">English</h3>
            <p className="text-sm text-muted-foreground">
              Literature, Grammar, Writing
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-medium">Computer Science</h3>
            <p className="text-sm text-muted-foreground">
              Programming, Algorithms, Data Structures
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
