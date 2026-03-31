"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tutor } from "@/types";

import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { deleteSubject } from "@/actions/tutor.action";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

export default function TutorSubjects({ tutorData }: { tutorData: Tutor }) {
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [subjectToDelete, setSubjectToDelete] = useState<string | null>(null);

  const handleDeleteClick = (subjectId: string) => {
    setSubjectToDelete(subjectId);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!subjectToDelete) return;

    try {
      const deleteSubjectResult = await deleteSubject(subjectToDelete);
      if (deleteSubjectResult.error) {
        toast.error(
          deleteSubjectResult.error.message || "Failed to delete subject",
        );
      }
      if (deleteSubjectResult.data) {
        toast.success("Subject deleted successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while deleting the subject");
    } finally {
      setDeleteConfirmOpen(false);
      setSubjectToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirmOpen(false);
    setSubjectToDelete(null);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Your Subjects</CardTitle>
            <CardDescription>
              Subjects you are currently tutoring
            </CardDescription>
          </div>
          {/* <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Subject
            </Button> */}
        </div>
      </CardHeader>
      <CardContent>
        {tutorData.subjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tutorData.subjects.map((tutorSubject) => (
              <div key={tutorSubject.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-lg">
                    {tutorSubject.category.name}
                  </h3>
                  <Badge
                    variant="default"
                    className="bg-green-500 hover:bg-green-600"
                  >
                    Active
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Added on{" "}
                  {new Date(tutorSubject.createdAt).toLocaleDateString()}
                </p>
                <div className="flex space-x-2">
                  {/* <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="mr-2 h-3 w-3" />
                      Edit
                    </Button> */}
                  <Button
                    onClick={() => handleDeleteClick(tutorSubject.id)}
                    variant="destructive"
                    size="sm"
                    className="flex-1"
                  >
                    <Trash2 className="mr-2 h-3 w-3" />
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No subjects added yet</p>
            {/* <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Your First Subject
              </Button> */}
          </div>
        )}
      </CardContent>

      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              subject from your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancelDelete}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}