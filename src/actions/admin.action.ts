"use server";

import { adminService } from "@/services/admin.service";
import { bookingService } from "@/services/booking.service";
import { revalidatePath } from "next/cache";

export const getUsersAction = async () => {
  return await adminService.getUsers();
};

export const updateUserStatusAction = async (
  userId: string,
  status: "ACTIVE" | "BANNED",
) => {
  const result = await adminService.updateUserStatus(userId, status);
  revalidatePath("/dashboard/admin-dashboard/user-management");
  return result;
};

export const updateUserRoleAction = async (
  userId: string,
  role: "USER" | "TUTOR" | "ADMIN",
) => {
  const result = await adminService.updateUserRole(userId, role);
  revalidatePath("/dashboard/admin-dashboard/user-management");
  return result;
};

export const createCategoryAction = async (name: string, slug: string) => {
  const result = await adminService.createCategory(name, slug);
  revalidatePath("/dashboard/admin-dashboard/manage-category");
  return result;
};

export const deleteCategoryAction = async (categoryId: string) => {
  const result = await adminService.deleteCategory(categoryId);
  revalidatePath("/dashboard/admin-dashboard/manage-category");
  return result;
};

export const updateCategoryAction = async (
  categoryId: string,
  name: string,
  slug: string,
) => {
  const result = await adminService.updateCategory(categoryId, name, slug);
  revalidatePath("/dashboard/admin-dashboard/manage-category");
  return result;
};

export const updateBookingStatusAction = async (
  bookingId: string,
  status: "CONFIRMED" | "COMPLETED" | "CANCELLED",
) => {
  const result = await bookingService.updateBookingStatus(bookingId, status);
  revalidatePath("/dashboard/admin-dashboard/manage-bookings");
  return result;
};
