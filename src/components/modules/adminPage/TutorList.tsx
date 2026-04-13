"use client";

import { Tutor } from "@/types/tutor.type";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

import { Star } from "lucide-react";
import Link from "next/link";

interface TutorListProps {
  tutors: Tutor[];
}

export function TutorList({ tutors }: TutorListProps) {
  if (!tutors || tutors.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No tutors found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="hidden md:grid grid-cols-6 gap-4 p-4 bg-muted font-semibold rounded-lg">
        <div>Name</div>
        <div>Subject</div>
        <div>Status</div>
        <div>Rating</div>
        <div>Rate</div>
        <div>Actions</div>
      </div>

      {tutors.map((tutor) => (
        <div
          key={tutor.id}
          className="grid grid-cols-1 md:grid-cols-6 gap-4 p-4 border rounded-lg hover:bg-muted/50 transition"
        >
          <div className="md:col-span-1">
            <p className="font-medium">{tutor.user?.name || "Unknown"}</p>
            <p className="text-sm text-muted-foreground">{tutor.headline}</p>
          </div>

          <div className="md:col-span-1">
            {tutor.subjects && tutor.subjects.length > 0 ? (
              <div className="space-y-1">
                {tutor.subjects.slice(0, 2).map((subject) => (
                  <p key={subject.id} className="text-sm">
                    {subject.category?.name || "Unknown"}
                  </p>
                ))}
                {tutor.subjects.length > 2 && (
                  <p className="text-xs text-muted-foreground">
                    +{tutor.subjects.length - 2} more
                  </p>
                )}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">-</p>
            )}
          </div>

          <div className="md:col-span-1">
            <Badge
              variant={
                tutor.user?.status === "ACTIVE" ? "default" : "secondary"
              }
            >
              {tutor.user?.status || "UNKNOWN"}
            </Badge>
          </div>

          <div className="md:col-span-1">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">
                {tutor.avgRating?.toFixed(1) || "0"}
              </span>
              <span className="text-xs text-muted-foreground">
                ({tutor.totalReviews || 0})
              </span>
            </div>
          </div>

          <div className="md:col-span-1">
            <p className="text-sm font-medium">
              ${tutor.hourlyRate || "0"}/{tutor.currency || "USD"}
            </p>
          </div>

          <div className="md:col-span-1 flex gap-2">
            <Button variant="outline" asChild>
              <Link href={`/tutors/${tutor.id}`}>View</Link>
            </Button>

            {/* <Button
              size="sm"
              variant="outline"
              onClick={() => {
                // Edit tutor
              }}
            >
              Edit
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button size="sm" variant="destructive">
                  Suspend
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Suspend Tutor?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to suspend{" "}
                    <span className="font-medium">{tutor.user?.name}</span>?
                    This action can be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                    Suspend
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog> */}
          </div>
        </div>
      ))}
    </div>
  );
}
