"use server";

import { adminService } from "@/services/admin.service";
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
