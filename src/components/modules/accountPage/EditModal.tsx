"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { TutorEditForm } from "@/components/modules/accountPage/TutorEditForm";

interface EditModalProps {
  tutor: {
    id: string;
    headline: string;
    bio: string;
    hourlyRate: number;
    currency: string;
    language: string;
    experienceYears: number;
  };
  isModalOpen: boolean;
  onClose: () => void;
}

export function EditModal({ tutor, isModalOpen, onClose }: EditModalProps) {
  // // Handle close by navigating back
  // const handleClose = () => {
  //   redirect("/account?section=tutor-profile");
  // };
  // console.log(tutor);

  return (
    <Sheet open={isModalOpen} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className=" w-full sm:max-w-2xl overflow-y-auto"
      >
        <SheetHeader>
          {/* <SheetTitle>Edit Tutor Profile</SheetTitle> */}
        </SheetHeader>
        <div className="mt-6">
          <TutorEditForm
            tutor={{
              id: tutor.id,
              headline: tutor.headline,
              bio: tutor.bio,
              hourlyRate: tutor.hourlyRate,
              currency: tutor.currency,
              language: tutor.language,
              experienceYears: tutor.experienceYears,
            }}
            isModalOpen={isModalOpen}
            onClose={onClose}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
