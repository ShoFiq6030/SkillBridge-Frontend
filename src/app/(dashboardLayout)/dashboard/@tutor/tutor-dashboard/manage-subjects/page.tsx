import { tutorService } from "@/services/tutor.service";
import { userService } from "@/services/user.service";
import { Tutor, Category } from "@/types/tutor.type";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import { Suspense } from "react";
import TutorSubjects from "@/components/modules/manageSubjects/TutorSubjects";
import AddNewSubject from "@/components/modules/manageSubjects/AddNewSubject";

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  );
}

export default async function ManageSubjectsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Manage Subjects</h1>
        <p className="text-muted-foreground">
          Add or remove subjects you can tutor in.
        </p>
      </div>

      <Suspense fallback={<LoadingSpinner />}>
        <SubjectsContent />
      </Suspense>
    </div>
  );
}

async function SubjectsContent() {
  const session = await userService.getSession();
  const userInfo = session.data?.user;

  if (!userInfo) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <p className="text-muted-foreground mb-4">Please log in to manage subjects</p>
          <Button asChild>
            <a href="/login">Log In</a>
          </Button>
        </CardContent>
      </Card>
    );
  }

  const tutorDataResult = await tutorService.getTutorByUserIdAuth(userInfo.id);
  
  if (tutorDataResult.error || !tutorDataResult.data) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <p className="text-muted-foreground mb-2">Error loading subjects</p>
          <p className="text-sm text-red-500">{tutorDataResult.error?.message || "Unknown error"}</p>
        </CardContent>
      </Card>
    );
  }

  const tutorData: Tutor = tutorDataResult.data;

  // Fetch all available categories
  const categoriesResult = await tutorService.getCategories();
  const allCategories: Category[] = categoriesResult.data || [];

  // Get tutor's current subject category IDs
  const tutorCategoryIds = new Set(
    tutorData.subjects.map(subject => subject.categoryId)
  );

  // Filter available categories (not already added)
  const availableCategories = allCategories.filter(
    category => !tutorCategoryIds.has(category.id)
  );

  return (
    <>
      {/* Current Subjects */}
      <TutorSubjects tutorData={tutorData} />

      {/* Add New Subject */}
      <AddNewSubject availableCategories={availableCategories}  />
    </>
  );
}