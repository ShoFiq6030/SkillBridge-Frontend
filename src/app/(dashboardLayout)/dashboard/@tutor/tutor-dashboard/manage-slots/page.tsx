import { tutorService } from "@/services/tutor.service";
import { userService } from "@/services/user.service";
import { Tutor, TutorSlot } from "@/types/tutor.type";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import { format, parseISO } from "date-fns";
import { Suspense } from "react";
import SlotsList from "@/components/modules/manageSlotPage/SlotsList";

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  );
}

export const dynamic = "force-dynamic";

export default async function ManageSlotsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Manage Slots</h1>
        <p className="text-muted-foreground">
          Set your availability and manage your tutoring schedule.
        </p>
      </div>

      <Suspense fallback={<LoadingSpinner />}>
        <SlotsContent />
      </Suspense>
    </div>
  );
}

async function SlotsContent() {
  const session = await userService.getSession();
  const userInfo = session.data?.user;

  if (!userInfo) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <p className="text-muted-foreground mb-4">
            Please log in to manage slots
          </p>
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
          <p className="text-muted-foreground mb-2">Error loading slots</p>
          <p className="text-sm text-red-500">
            {tutorDataResult.error?.message || "Unknown error"}
          </p>
        </CardContent>
      </Card>
    );
  }

  const tutorData: Tutor = tutorDataResult.data;

  return (
    <>
      {/* Schedule by Date */}
      <SlotsList tutorData={tutorData} />
    </>
  );
}
