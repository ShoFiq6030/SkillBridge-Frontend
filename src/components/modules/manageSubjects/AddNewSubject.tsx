"use client"
import { addSubject, createCategory } from '@/actions/tutor.action';
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function AddNewSubject({ availableCategories }: { availableCategories: { id: string; name: string; slug: string }[] }) {
  const [addConfirmOpen, setAddConfirmOpen] = useState(false);
  const [categoryToAdd, setCategoryToAdd] = useState<string | null>(null);

  const [createCategoryOpen, setCreateCategoryOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  // const [categorySlug, setCategorySlug] = useState("");

  const handleAddClick = (categoryId: string) => {
    setCategoryToAdd(categoryId);
    setAddConfirmOpen(true);
  };

  const handleConfirmAdd = async () => {
    if (!categoryToAdd) return;

    try {
      const res = await addSubject(categoryToAdd);
      if (res.error) {
        toast.error(res.error.message || "Failed to add subject");
      }
      if (res.data) {
        toast.success("Subject added successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while adding the subject");
    } finally {
      setAddConfirmOpen(false);
      setCategoryToAdd(null);
    }
  };

  const handleCancelAdd = () => {
    setAddConfirmOpen(false);
    setCategoryToAdd(null);
  };

  const handleOpenCreateCategory = () => {
    setCreateCategoryOpen(true);
  };

  const handleCloseCreateCategory = () => {
    setCreateCategoryOpen(false);
    setCategoryName("");
    // setCategorySlug("");
  };

  const handleCreateCategory = async () => {
    if (!categoryName.trim() ) {
      toast.error("Name is required");
      return;
    }

    try {
      const res = await createCategory(categoryName.trim());
      if (res.error) {
        toast.error(res.error.message || "Failed to create category");
      }
      if (res.data) {
        toast.success("Category created successfully");
        handleCloseCreateCategory();
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while creating the category");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Subject</CardTitle>
        <CardDescription>Select a subject category to add to your profile</CardDescription>
      </CardHeader>
      <CardContent>
        {availableCategories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableCategories.map((category) => (
              <div key={category.id} className="p-4 border rounded-lg hover:bg-accent transition-colors">
                <h3 className="font-medium mb-2">{category.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Slug: {category.slug}
                </p>
                <Button onClick={() => handleAddClick(category.id)} className="w-full" size="sm">
                  Add Subject
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">All categories have been added</p>
          </div>
        )}
        <div className="mt-6 pt-6 border-t">
          <p className="text-sm text-muted-foreground mb-4">Need a new category?</p>
          <Button onClick={handleOpenCreateCategory} variant="outline" className="w-full">
            Create New Category
          </Button>
        </div>
      </CardContent>

      {/* Add Subject Confirmation Dialog */}
      <AlertDialog open={addConfirmOpen} onOpenChange={setAddConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Add subject?</AlertDialogTitle>
            <AlertDialogDescription>
              This will add the subject to your profile. You can remove it later if needed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancelAdd}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmAdd}>
              Add Subject
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Create Category Dialog */}
      <Dialog open={createCategoryOpen} onOpenChange={setCreateCategoryOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Category</DialogTitle>
            <DialogDescription>
              Add a new subject category. Both name and slug are required.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="categoryName">Name</Label>
              <Input
                id="categoryName"
                placeholder="e.g., English Speaking"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </div>
            {/* <div className="grid gap-2">
              <Label htmlFor="categorySlug">Slug</Label>
              <Input
                id="categorySlug"
                placeholder="e.g., english-speaking"
                value={categorySlug}
                onChange={(e) => setCategorySlug(e.target.value)}
              />
            </div> */}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseCreateCategory}>
              Cancel
            </Button>
            <Button onClick={handleCreateCategory}>
              Create Category
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}