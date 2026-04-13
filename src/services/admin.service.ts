import { env } from "@/env";
import { cookies } from "next/headers";

export const adminService = {
  getAnalytics: async function () {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${env.API_URL}/api/admin/analytics`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });
      const data = await res.json();
      if (data.success === false) {
        return {
          data: null,
          error: { message: data.message || "Failed to fetch analytics" },
        };
      }
      return { data: data.data, error: null };
    } catch (error) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },

  getUsers: async function () {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${env.API_URL}/api/admin/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });
      const data = await res.json();
      if (data.success === false) {
        return {
          data: null,
          error: { message: data.message || "Failed to fetch users" },
        };
      }
      return { data: data.data, error: null };
    } catch (error) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },

  updateUserStatus: async function (
    userId: string,
    status: "ACTIVE" | "BANNED",
  ) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(
        `${env.API_URL}/api/admin/users/${userId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Cookie: cookieStore.toString(),
          },
          body: JSON.stringify({ status }),
          cache: "no-store",
        },
      );
      const data = await res.json();
      if (data.success === false) {
        return {
          data: null,
          error: { message: data.message || "Failed to update user status" },
        };
      }
      return { data: data.data, error: null };
    } catch (error) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },

  updateUserRole: async function (
    userId: string,
    role: "USER" | "TUTOR" | "ADMIN",
  ) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${env.API_URL}/api/admin/users/${userId}/role`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify({ role }),
        cache: "no-store",
      });
      const data = await res.json();
      if (data.success === false) {
        return {
          data: null,
          error: { message: data.message || "Failed to update user role" },
        };
      }
      return { data: data.data, error: null };
    } catch (error) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },

  getTutors: async function () {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${env.API_URL}/api/admin/tutors`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });
      const data = await res.json();
      if (data.success === false) {
        return {
          data: null,
          error: { message: data.message || "Failed to fetch tutors" },
        };
      }
      return { data: data.data, error: null };
    } catch (error) {
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
      if (data.success === false) {
        return {
          data: null,
          error: { message: data.message || "Failed to fetch categories" },
        };
      }
      return { data: data.data, error: null };
    } catch (error) {
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
        cache: "no-store",
      });
      const data = await res.json();
      if (data.success === false) {
        return {
          data: null,
          error: { message: data.message || "Failed to create category" },
        };
      }
      return { data: data.data, error: null };
    } catch (error) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },

  deleteCategory: async function (categoryId: string) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${env.API_URL}/api/categories/${categoryId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });
      const data = await res.json();
      if (data.success === false) {
        return {
          data: null,
          error: { message: data.message || "Failed to delete category" },
        };
      }
      return { data: data.data || true, error: null };
    } catch (error) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },

  updateCategory: async function (
    categoryId: string,
    name: string,
    slug: string,
  ) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${env.API_URL}/api/categories/${categoryId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify({ name, slug }),
        cache: "no-store",
      });
      const data = await res.json();
      if (data.success === false) {
        return {
          data: null,
          error: { message: data.message || "Failed to update category" },
        };
      }
      return { data: data.data, error: null };
    } catch (error) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },
};
