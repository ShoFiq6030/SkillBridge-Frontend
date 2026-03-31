//* No Dynamic and No { cache: no-store } : SSG -> Static Page
//* { cache: no-store } : SSR -> Dynamic Page
//* next: { revalidate: 10 } : ISR -> Mix between static and dynamic

import { env } from "@/env";
import { Tutor } from "@/types/tutor.type";
import { cookies } from "next/headers";

interface ServiceOptions {
  cache?: RequestCache;
  revalidate?: number;
}

export interface TutorsParams {
  search?: string;
  category?: string;
  minHourlyRate?: number;
  maxHourlyRate?: number;
  experienceYears?: number;
  sortBy?:
    | "hourlyRate"
    | "experienceYears"
    | "avgRating"
    | "createdAt"
    | "updatedAt"
    | "totalReviews";
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
  skip?: number;
}

export const tutorService = {
  getTutors: async function (params?: TutorsParams, options?: ServiceOptions) {
    try {
      const url = new URL(`${env.API_URL}/api/tutor-profile/list`);

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, value);
          }
        });
      }

      const config: RequestInit = {};

      if (options?.cache) {
        config.cache = options.cache;
      }

      if (options?.revalidate) {
        config.next = { revalidate: options.revalidate };
      }

      const res = await fetch(url.toString(), config);

      const data = await res.json();

      // This is an example
      //   if(data.success) {
      //     return
      //   }

      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },

  getTutorById: async function (id: string) {
    try {
      const res = await fetch(`${env.API_URL}/api/tutor-profile/tutor/${id}`, {
        cache: "no-store",
        next: {
          tags: ["tutor-profile"],
        },
      });

      const data = await res.json();

      return { data: data.tutorProfile, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },

  getTutorByUserId: async function (userId: string) {
    try {
      const url = new URL(`${env.API_URL}/api/tutor-profile/${userId}`);

      const res = await fetch(url.toString(), {
        cache: "no-store",
      });

      const data = await res.json();
      // console.log(data);

      if (data?.tutorProfile) {
        return { data: data.tutorProfile, error: null };
      }
      return { data: null, error: { message: "No tutor profile found" } };
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },
  getTutorByUserIdAuth: async function (userId: string) {
    try {
      const cookieStore = await cookies();
      const url = new URL(
        `${env.API_URL}/api/tutor-profile/tutor/auth/${userId}`,
      );

      const res = await fetch(url.toString(), {
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        next: {
          tags: ["tutor-profile-auth"],
        },
      });

      const data = await res.json();
      console.log(data);

      if (data?.tutorProfile) {
        return { data: data.tutorProfile, error: null };
      }
      return { data: null, error: { message: "No tutor profile found" } };
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },

  getCategories: async function () {
    try {
      const res = await fetch(`${env.API_URL}/api/categories`, {
        cache: "force-cache",
        next: { revalidate: 60, tags: ["categories"] },
      });

      const data = await res.json();
      if (!data.success) {
        return { data: null, error: { message: "Failed to fetch categories" } };
      }
      console.log(data);
      return { data: data.data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },

  updateTutor: async function (id: string, data: Partial<Tutor>) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${env.API_URL}/api/tutor-profile/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(data),
        cache: "no-store",
      });

      const responseData = await res.json();

      if (!responseData.success) {
        return {
          data: null,
          error: {
            message: responseData.message || "Failed to update tutor profile",
          },
        };
      }

      return { data: responseData.tutorProfile, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },

  deleteSubject: async function (id: string) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${env.API_URL}/api/tutor-subject/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });
      const responseData = await res.json();

      if (!responseData.success) {
        return {
          data: null,
          error: {
            message: responseData.message || "Something Went Wrong",
          },
        };
      }
      return { data: true, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },
  addSubject: async function (id: string) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${env.API_URL}/api/tutor-subject`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify({ categoryId: id }),
      });
      const responseData = await res.json();

      if (!responseData.success) {
        return {
          data: null,
          error: {
            message: responseData.message || "Something Went Wrong",
          },
        };
      }
      return { data: true, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },

  createCategory: async function (name: string, slug: string) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${env.API_URL}/api/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify({ name, slug }),
      });
      const responseData = await res.json();

      if (!responseData.success) {
        return {
          data: null,
          error: {
            message: responseData.message || "Failed to create category",
          },
        };
      }
      return { data: responseData.data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },
};