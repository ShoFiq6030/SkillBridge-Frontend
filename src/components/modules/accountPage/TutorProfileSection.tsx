"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { EditModal } from "./EditModal";

import { useState } from "react";

export interface TutorProfileSectionProps {
  tutor: {
    id: string;
    userId: string;
    headline: string;
    bio: string;
    hourlyRate: number;
    currency: string;
    language: string;
    experienceYears: number;
    avgRating: number;
    totalReviews: number;
    user: {
      id: string;
      email: string;
      name: string;
      image: string;
    };
    subjects: Array<{
      id: string;
      category: {
        name: string;
      };
    }>;
  };
  isModalOpen: boolean;
}

export function TutorProfileSection({
  tutor,
  isModalOpen = false,
}: TutorProfileSectionProps) {
  const initials = tutor.user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
    const [openModal, setOpenModal] = useState(isModalOpen);
  
  const router = useRouter();
  const handleClose = () => {
  setOpenModal(false);
  };
  
  return (
    <>
    {openModal && <EditModal tutor={tutor} isModalOpen={openModal} onClose={handleClose} />}
      {/* <EditModal tutor={tutor} isModalOpen={isModalOpen} onClose={handleClose} /> */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Tutor Profile
          </CardTitle>
          <CardDescription>Your tutoring profile information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
            <Avatar className="h-24 w-24">
              <AvatarImage src={tutor.user.image} alt={tutor.user.name} />
              <AvatarFallback className="text-lg">{initials}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <h3 className="text-xl font-semibold">{tutor.user.name}</h3>
              <p className="text-muted-foreground">{tutor.headline}</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500">★</span>
                  <span className="font-medium">
                    {tutor.avgRating?.toFixed(1) || "New"}
                  </span>
                  <span className="text-muted-foreground">
                    ({tutor.totalReviews} reviews)
                  </span>
                </div>
                <div className="text-muted-foreground">
                  {tutor.experienceYears} years experience
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="mb-2 font-semibold">Bio</h4>
            <p className="text-muted-foreground">{tutor.bio}</p>
          </div>

          <Separator />

          <div>
            <h4 className="mb-3 font-semibold">Subjects</h4>
            <div className="flex flex-wrap gap-2">
              {tutor.subjects?.map((subject) => (
                <span
                  key={subject.id}
                  className="inline-flex items-center rounded-md bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
                >
                  {subject.category.name}
                </span>
              ))}
            </div>
          </div>

          <Separator />

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <h4 className="mb-1 font-semibold">Hourly Rate</h4>
              <p className="text-2xl font-bold text-primary">
                ${tutor.hourlyRate}/{tutor.currency}
              </p>
            </div>
            <div>
              <h4 className="mb-1 font-semibold">Languages</h4>
              <p className="text-muted-foreground">{tutor.language}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link href={`/tutors/${tutor.userId}`}>View Public Profile</Link>
            </Button>
            <Button asChild>
              <button className="cursor-pointer" onClick={() => setOpenModal(true)}>
                Edit Profile
              </button>
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}