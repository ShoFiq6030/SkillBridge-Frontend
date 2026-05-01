import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CreateTutorProfileForm from "@/components/modules/create-tutor-profile/createTutorProfileFrom";
import { tutorService } from "@/services/tutor.service";
import { userService } from "@/services/user.service";
import Link from "next/link";
export const dynamic = "force-dynamic";

export default async function CreateTutorProfilePage() {
  const session = await userService.getSession();
  const userInfo = session.data?.user;

  const tutorDataResult = await tutorService.getTutorByUserIdAuth(userInfo.id);

  if (tutorDataResult.data) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <p className="text-muted-foreground">Already Have Tutor Profile</p>

          <Link href="/dashboard/tutor-dashboard"> Go to Dashboard </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-2xl py-10">
      <Card className="border-none shadow-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">
            Create Tutor Profile
          </CardTitle>
          <CardDescription>
            Fill in the details below to start your journey as a tutor on
            SkillBridge.
          </CardDescription>
        </CardHeader>
        <CreateTutorProfileForm />
      </Card>
    </div>
  );
}
