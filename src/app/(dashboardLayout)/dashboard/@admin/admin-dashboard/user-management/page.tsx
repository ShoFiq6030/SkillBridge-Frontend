import { getUsersAction } from "@/actions/admin.action";
import { UserList } from "@/components/modules/adminPage/UserList";

export default async function UserManagementPage() {
  const { data: users, error } = await getUsersAction();

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground">
            Manage and monitor all users on the platform.
          </p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <p className="text-red-500">Error loading users: {error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
        <p className="text-muted-foreground">
          Manage and monitor all users on the platform.
        </p>
      </div>

      <UserList initialUsers={users || []} />
    </div>
  );
}
