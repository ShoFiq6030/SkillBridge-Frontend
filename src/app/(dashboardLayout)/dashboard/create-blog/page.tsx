export default function CreateBlogPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create Blog Post</h1>
        <p className="text-muted-foreground">
          Share your learning experiences and insights with the community.
        </p>
      </div>

      <div className="rounded-lg border bg-card p-6">
        <form className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Blog Title
            </label>
            <input
              id="title"
              type="text"
              placeholder="Enter an engaging title for your blog post"
              className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="category" className="text-sm font-medium">
              Category
            </label>
            <select
              id="category"
              className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Select a category</option>
              <option value="learning-tips">Learning Tips</option>
              <option value="study-techniques">Study Techniques</option>
              <option value="subject-help">Subject Help</option>
              <option value="tutor-reviews">Tutor Reviews</option>
              <option value="success-stories">Success Stories</option>
              <option value="general">General</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="tags" className="text-sm font-medium">
              Tags (Optional)
            </label>
            <input
              id="tags"
              type="text"
              placeholder="e.g., mathematics, calculus, study-tips (comma separated)"
              className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="content" className="text-sm font-medium">
              Content
            </label>
            <textarea
              id="content"
              placeholder="Write your blog post content here..."
              rows={15}
              className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="excerpt" className="text-sm font-medium">
              Excerpt (Optional)
            </label>
            <textarea
              id="excerpt"
              placeholder="A short summary of your blog post (150 characters max)"
              rows={3}
              maxLength={150}
              className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              id="isPublished"
              type="checkbox"
              className="rounded border-gray-300"
            />
            <label htmlFor="isPublished" className="text-sm font-medium">
              Publish immediately
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <input
              id="allowComments"
              type="checkbox"
              defaultChecked
              className="rounded border-gray-300"
            />
            <label htmlFor="allowComments" className="text-sm font-medium">
              Allow comments on this post
            </label>
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
              Publish Blog Post
            </button>
            <button
              type="button"
              className="px-6 py-2 border border-input rounded-md hover:bg-accent"
            >
              Save as Draft
            </button>
            <button
              type="button"
              className="px-6 py-2 border border-input rounded-md hover:bg-accent"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      <div className="rounded-lg border bg-card p-6">
        <h2 className="text-xl font-semibold mb-4">Writing Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium mb-2">📝 Content Guidelines</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Share your genuine learning experiences</li>
              <li>• Be specific about challenges and solutions</li>
              <li>• Include practical tips for other students</li>
              <li>• Keep it engaging and easy to read</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-2">✨ Best Practices</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Use clear, descriptive titles</li>
              <li>• Add relevant tags for discoverability</li>
              <li>• Proofread before publishing</li>
              <li>• Include images or examples when helpful</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
