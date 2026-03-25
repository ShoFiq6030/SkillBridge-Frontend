import { getUserInServer } from "@/actions/auth-server";
import { Roles } from "@/constants/roles";
import { redirect } from "next/navigation";
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

// Main Account Page Component
export default async function AccountPage({
  searchParams,
}: {
  searchParams: Promise<{ section?: string | undefined }>;
}) {
  const session = await getUserInServer();
  const params = await searchParams;
  let section = params.section;
  if (!section) {
    section = "profile";
  }

  if (!session?.user) {
    redirect("/login");
  }

  // Map session user to expected format
  const user = {
    name: session.user.name || "User",
    email: session.user.email || "",
    emailVerified: session.user.emailVerified || false,
    image: session.user.image || "",
    createdAt: session.user.createdAt || new Date().toISOString(),
    updatedAt: session.user.updatedAt || new Date().toISOString(),
    role: session.user.role || "USER",
    status: session.user.status || "ACTIVE",
    id: session.user.id,
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
            <TutorProfileSection tutor={tutorData} />
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
