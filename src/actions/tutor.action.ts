"use server";
import { tutorService } from "@/services/tutor.service";
import { Tutor } from "@/types/tutor.type";
import { updateTag } from "next/cache";
import { nullish } from "zod";

export const updateTutorProfile = async (
  tutorId: string,
  profileData: Partial<Tutor>,
) => {
  try {
    // console.log(profileData, "server action");
    const res = await tutorService.updateTutor(tutorId, profileData);
    updateTag("tutor-profile");
    if (res.data===null) {
        return { data: null, error: { message: res.error?.message || "Failed to update tutor profile" } };
    }
    return { data: res, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: { message: err.message || "Something Went Wrong" },
    };
  }
};
