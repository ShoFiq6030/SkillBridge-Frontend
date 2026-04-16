"use client";

import { useState, useTransition } from "react";
import { User } from "@/types/tutor.type";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  updateUserStatusAction,
  updateUserRoleAction,
} from "@/actions/admin.action";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface UserListProps {
  initialUsers: User[];
}

interface PendingChanges {
  status?: "ACTIVE" | "BANNED";
  role?: "USER" | "TUTOR" | "ADMIN";
}

export function UserList({ initialUsers }: UserListProps) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [isPending, startTransition] = useTransition();
  const [pendingChanges, setPendingChanges] = useState<
    Record<string, PendingChanges>
  >({});
  const [confirmUserId, setConfirmUserId] = useState<string | null>(null);

  const updateStatusLocally = (userId: string, status: "ACTIVE" | "BANNED") => {
    setPendingChanges((prev) => ({
      ...prev,
      [userId]: { ...prev[userId], status },
    }));
  };

  const updateRoleLocally = (
    userId: string,
    role: "USER" | "TUTOR" | "ADMIN",
  ) => {
    setPendingChanges((prev) => ({
      ...prev,
      [userId]: { ...prev[userId], role },
    }));
  };

  const confirmUpdate = async (userId: string) => {
    const changes = pendingChanges[userId];
    if (!changes) return;

    startTransition(async () => {
      let statusResult, roleResult;

      if (changes.status) {
        statusResult = await updateUserStatusAction(userId, changes.status);
      }

      if (changes.role) {
        roleResult = await updateUserRoleAction(userId, changes.role);
      }

      const hasError = statusResult?.error || roleResult?.error;
      const hasSuccess = statusResult?.data || roleResult?.data;

      if (hasError) {
        toast.error(
          statusResult?.error?.message ||
            roleResult?.error?.message ||
            "Update failed",
        );
      } else if (hasSuccess) {
        toast.success("User updated successfully");
        // Update local state
        setUsers((prev) =>
          prev.map((user) => {
            if (user.id === userId) {
              return {
                ...user,
                status: changes.status || user.status,
                role: changes.role || user.role,
              };
            }
            return user;
          }),
        );
        // Clear pending changes
        setPendingChanges((prev) => {
          const newChanges = { ...prev };
          delete newChanges[userId];
          return newChanges;
        });
      }

      setConfirmUserId(null);
    });
  };

  const cancelChanges = (userId: string) => {
    setPendingChanges((prev) => {
      const newChanges = { ...prev };
      delete newChanges[userId];
      return newChanges;
    });
    setConfirmUserId(null);
  };

  const getCurrentValue = (userId: string, field: "status" | "role") => {
    const changes = pendingChanges[userId];
    if (changes && changes[field]) {
      return changes[field];
    }
    const user = users.find((u) => u.id === userId);
    return user ? user[field] : "";
  };

  const hasChanges = (userId: string) => {
    return !!pendingChanges[userId];
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Active
          </Badge>
        );
      case "BANNED":
        return <Badge variant="destructive">Banned</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "ADMIN":
        return <Badge variant="default">Admin</Badge>;
      case "TUTOR":
        return <Badge variant="secondary">Tutor</Badge>;
      case "USER":
        return <Badge variant="outline">User</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="rounded-lg border bg-card">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Users ({users.length})</h2>
          <Button disabled={isPending}>Refresh</Button>
        </div>

        <div className="space-y-4">
          {users.length === 0 ? (
            <p className="text-muted-foreground">No users found.</p>
          ) : (
            <>
              {/* Table Header */}
              <div className="grid grid-cols-1 md:grid-cols-6 gap-2 p-4 border-b-2 border-border font-semibold text-sm text-muted-foreground">
                <div>User</div>
                <div>Status</div>
                <div>Role</div>
                <div>Email Status</div>
                <div>Update Role</div>
                <div>Actions</div>
              </div>

              {/* User Rows */}
              {users.map((user) => {
              const changes = pendingChanges[user.id];
              const hasPendingChanges = !!changes;

              return (
                <div
                  key={user.id}
                  className="grid grid-cols-1 md:grid-cols-6 gap-2 p-4 border rounded-lg items-center"
                >
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                  <div>{getStatusBadge(user?.status || "UNKNOWN")}</div>
                  <div>{getRoleBadge(user?.role)}</div>
                  <div>{user?.emailVerified ? "Verified" : "Not Verified"}</div>
                  <div>
                    <Select
                      value={getCurrentValue(user.id, "status")}
                      onValueChange={(value) =>
                        updateStatusLocally(
                          user.id,
                          value as "ACTIVE" | "BANNED",
                        )
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ACTIVE">Active</SelectItem>
                        <SelectItem value="BANNED">Banned</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Select
                      value={getCurrentValue(user.id, "role")}
                      onValueChange={(value) =>
                        updateRoleLocally(
                          user.id,
                          value as "USER" | "TUTOR" | "ADMIN",
                        )
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USER">User</SelectItem>
                        <SelectItem value="TUTOR">Tutor</SelectItem>
                        <SelectItem value="ADMIN">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-2 ">
                    {hasPendingChanges && (
                      <>
                        <AlertDialog
                          open={confirmUserId === user.id}
                          onOpenChange={(open) =>
                            !open && setConfirmUserId(null)
                          }
                        >
                          <AlertDialogTrigger asChild>
                            <Button
                              size="sm"
                              onClick={() => setConfirmUserId(user.id)}
                              disabled={isPending}
                            >
                              Update
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Confirm User Update
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to update {user.name}?
                                {changes.status && (
                                  <div>
                                    Status: {user.status} → {changes.status}
                                  </div>
                                )}
                                {changes.role && (
                                  <div>
                                    Role: {user.role} → {changes.role}
                                  </div>
                                )}
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel
                                onClick={() => cancelChanges(user.id)}
                              >
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => confirmUpdate(user.id)}
                                disabled={isPending}
                              >
                                {isPending ? "Updating..." : "Confirm Update"}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => cancelChanges(user.id)}
                          disabled={isPending}
                        >
                          Cancel
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
