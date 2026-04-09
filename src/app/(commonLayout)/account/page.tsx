import { Roles } from "@/constants/roles";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ProfileSection,
  PasswordResetSection,
  TutorProfileSection,
  SidebarNav,
} from "@/components/modules/accountPage";
import { tutorService } from "@/services/tutor.service";
import Link from "next/link";
import { userService } from "@/services/user.service";

// Main Account Page Component
export default async function AccountPage({
  searchParams,
}: {
  searchParams: Promise<{ section?: string | undefined; editModal?: boolean }>;
}) {
  const session = await userService.getSession();
  console.log(session);
  const userInfo =session.data?.user;
  const params = await searchParams;
  let section = params.section;
  const isModalOpen = params.editModal || false;
  if (!section) {
    section = "profile";
  }

  

  // Map session user to expected format
  const user = {
    name: userInfo?.name || "User",
    email: userInfo?.email || "",
    emailVerified: userInfo?.emailVerified || false,
    image: userInfo?.image || "",
    createdAt: userInfo?.createdAt || new Date().toISOString(),
    updatedAt: userInfo?.updatedAt || new Date().toISOString(),
    role: userInfo.role || "USER",
    status: userInfo.status || "ACTIVE",
    id: userInfo.id,
  };

  // Determine active section from search params or default to profile

  const isTutor = user.role === Roles.tutor;

  // Fetch tutor data if user is a tutor and viewing tutor profile section
  let tutorData = null;
  if (isTutor && section === "tutor-profile") {
    const result = await tutorService.getTutorByUserId(user.id);
    if (result.error) {
      console.error("Failed to fetch tutor profile:", result.error);
    } else {
      tutorData = result.data;
    }
  }
  // console.log(isModalOpen);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Navigation</CardTitle>
            </CardHeader>
            <CardContent>
              <SidebarNav activeSection={section} isTutor={isTutor} />
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {section === "profile" && <ProfileSection user={user} />}
          {section === "password" && <PasswordResetSection />}
          {section === "tutor-profile" && isTutor && tutorData && (
            <TutorProfileSection 
              tutor={tutorData} 
              isModalOpen={isModalOpen} 
            />
          )}
          {section === "tutor-profile" && isTutor && !tutorData && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Tutor Profile
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  No tutor profile found. Become a tutor to start teaching!
                </p>
                <Button className="mt-4" asChild>
                  <Link href="/tutors/become-tutor">Create Tutor Profile</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
