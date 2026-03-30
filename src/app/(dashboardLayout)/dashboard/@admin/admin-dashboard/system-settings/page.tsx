export default function SystemSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">System Settings</h1>
        <p className="text-muted-foreground">
          Configure global system settings and preferences.
        </p>
      </div>

      <div className="space-y-6">
        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-xl font-semibold mb-4">General Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Site Name</label>
                <p className="text-sm text-muted-foreground">
                  The name displayed on the platform
                </p>
              </div>
              <input
                type="text"
                defaultValue="TutorHub"
                className="px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Contact Email</label>
                <p className="text-sm text-muted-foreground">
                  Primary contact email for support
                </p>
              </div>
              <input
                type="email"
                defaultValue="support@tutorhub.com"
                className="px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Maintenance Mode</label>
                <p className="text-sm text-muted-foreground">
                  Temporarily disable the platform
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-xl font-semibold mb-4">Booking Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">
                  Minimum Booking Duration
                </label>
                <p className="text-sm text-muted-foreground">
                  Minimum session length in minutes
                </p>
              </div>
              <select className="px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring">
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
                <option value="90">1.5 hours</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">
                  Cancellation Policy
                </label>
                <p className="text-sm text-muted-foreground">
                  Hours before session for free cancellation
                </p>
              </div>
              <select className="px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring">
                <option value="24">24 hours</option>
                <option value="48">48 hours</option>
                <option value="72">72 hours</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Platform Fee</label>
                <p className="text-sm text-muted-foreground">
                  Percentage taken from each booking
                </p>
              </div>
              <input
                type="number"
                defaultValue="10"
                min="0"
                max="50"
                className="px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring w-20"
              />
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-xl font-semibold mb-4">Email Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">SMTP Host</label>
                <p className="text-sm text-muted-foreground">
                  Email server hostname
                </p>
              </div>
              <input
                type="text"
                defaultValue="smtp.gmail.com"
                className="px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">SMTP Port</label>
                <p className="text-sm text-muted-foreground">
                  Email server port
                </p>
              </div>
              <input
                type="number"
                defaultValue="587"
                className="px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring w-20"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
