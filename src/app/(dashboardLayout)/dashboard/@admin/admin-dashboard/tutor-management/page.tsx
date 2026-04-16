import { adminService } from "@/services/admin.service";
import { TutorList } from "@/components/modules/adminPage/TutorList";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function TutorManagementPage() {
  const { data: tutors, error } = await adminService.getTutors();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tutor Management</h1>
        <p className="text-muted-foreground">
          Manage and oversee all tutors on the platform.
        </p>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-800">{error.message}</p>
        </div>
      )}

      <div className="rounded-lg border bg-card">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Tutors</h2>
            {/* <Button className="px-4 py-2">Add Tutor</Button> */}
          </div>

          {tutors ? (
            <TutorList tutors={tutors} />
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No tutors available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
