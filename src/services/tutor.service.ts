//* No Dynamic and No { cache: no-store } : SSG -> Static Page
//* { cache: no-store } : SSR -> Dynamic Page
//* next: { revalidate: 10 } : ISR -> Mix between static and dynamic

interface ServiceOptions {
  cache?: RequestCache;
  revalidate?: number;
}

interface GetTutorsParams {
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
  getTutors: async function (
    params?: GetTutorsParams,
    options?: ServiceOptions,
  ) {
    try {
      const url = new URL(`${process.env.API_URL}/api/tutor-profile/list`);

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
      const res = await fetch(`${process.env.API_URL}/api/tutor-profile/${id}`);

      const data = await res.json();

      return { data: data.tutorProfile, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },
};
