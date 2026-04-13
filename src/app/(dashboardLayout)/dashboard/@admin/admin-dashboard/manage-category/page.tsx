import { adminService } from "@/services/admin.service";
import CategoryManager from "@/components/modules/adminPage/CategoryManager";

export default async function CreateCategoryPage() {
  const categoriesResult = await adminService.getCategories();
  const categories = categoriesResult.data || [];
  const error = categoriesResult.error;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Manage Categories</h1>
        <p className="text-muted-foreground">
          Create and manage subject categories available to tutors.
        </p>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-800">{error.message}</p>
        </div>
      )}

      <CategoryManager initialCategories={categories} />
    </div>
  );
}
