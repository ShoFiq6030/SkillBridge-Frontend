"use client";

import { useState, useTransition } from "react";
import { Category } from "@/types/tutor.type";
import {
  createCategoryAction,
  deleteCategoryAction,
  updateCategoryAction,
} from "@/actions/admin.action";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { toast } from "sonner";
import { PlusCircle, Trash2, Edit } from "lucide-react";

interface CategoryManagerProps {
  initialCategories: Category[];
}

export default function CategoryManager({
  initialCategories,
}: CategoryManagerProps) {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [isPending, startTransition] = useTransition();
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [categorySlug, setCategorySlug] = useState("");
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
    null,
  );
  const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null);

  const handleOpenCreate = () => {
    setCategoryName("");
    setCategorySlug("");
    setCreateOpen(true);
  };

  const handleCloseCreate = () => {
    setCreateOpen(false);
    setCategoryName("");
    setCategorySlug("");
  };

  const handleOpenEdit = (category: Category) => {
    setCategoryToEdit(category);
    setCategoryName(category.name);
    setCategorySlug(category.slug);
    setEditOpen(true);
  };

  const handleCloseEdit = () => {
    setEditOpen(false);
    setCategoryToEdit(null);
    setCategoryName("");
    setCategorySlug("");
  };

  const handleCreateCategory = async () => {
    if (!categoryName.trim() || !categorySlug.trim()) {
      toast.error("Both name and slug are required");
      return;
    }

    startTransition(async () => {
      try {
        const result = await createCategoryAction(
          categoryName.trim(),
          categorySlug.trim(),
        );

        if (result.error) {
          toast.error(result.error.message || "Failed to create category");
          return;
        }

        if (result.data) {
          setCategories((prev) => [...prev, result.data]);
          toast.success("Category created successfully");
          handleCloseCreate();
        }
      } catch (error) {
        toast.error("An error occurred while creating the category");
      }
    });
  };

  const handleUpdateCategory = async () => {
    if (!categoryToEdit) return;
    if (!categoryName.trim() || !categorySlug.trim()) {
      toast.error("Both name and slug are required");
      return;
    }

    startTransition(async () => {
      try {
        const result = await updateCategoryAction(
          categoryToEdit.id,
          categoryName.trim(),
          categorySlug.trim(),
        );

        if (result.error) {
          toast.error(result.error.message || "Failed to update category");
          return;
        }

        if (result.data) {
          setCategories((prev) =>
            prev.map((category) =>
              category.id === categoryToEdit.id
                ? { ...category, name: categoryName, slug: categorySlug }
                : category,
            ),
          );
          toast.success("Category updated successfully");
          handleCloseEdit();
        }
      } catch (error) {
        toast.error("An error occurred while updating the category");
      }
    });
  };

  const handleDeleteCategory = async () => {
    if (!categoryToDelete) {
      return;
    }

    const id = categoryToDelete.id;
    startTransition(async () => {
      try {
        const result = await deleteCategoryAction(id);
        if (result.error) {
          toast.error(result.error.message || "Failed to delete category");
          return;
        }

        setCategories((prev) => prev.filter((category) => category.id !== id));
        toast.success("Category deleted successfully");
        setDeleteOpen(false);
        setCategoryToDelete(null);
      } catch (error) {
        toast.error("An error occurred while deleting the category");
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-end">
        <Button onClick={handleOpenCreate} size="sm">
          <PlusCircle className="mr-2 h-4 w-4" /> Create Category
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {categories.length > 0 ? (
          categories.map((category) => (
            <Card key={category.id} className="border">
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {category.slug}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <span>
                    Created {new Date(category.createdAt).toLocaleDateString()}
                  </span>
                  <span>•</span>
                  <span>
                    Updated {new Date(category.updatedAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleOpenEdit(category)}
                  >
                    <Edit className="mr-2 h-4 w-4" /> Edit
                  </Button>
                  <AlertDialog
                    open={deleteOpen && categoryToDelete?.id === category.id}
                    onOpenChange={setDeleteOpen}
                  >
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          setCategoryToDelete(category);
                          setDeleteOpen(true);
                        }}
                      >
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Category?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will remove the category from the platform.
                          Tutors using this category may need to update their
                          subjects.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel
                          onClick={() => {
                            setDeleteOpen(false);
                            setCategoryToDelete(null);
                          }}
                        >
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleDeleteCategory}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="rounded-lg border border-dashed border-muted p-8 text-center text-muted-foreground">
            No categories are available. Create one to get started.
          </div>
        )}
      </div>

      {/* Create Dialog */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Category</DialogTitle>
            <DialogDescription>
              Add a new category to the system. Both name and slug are required.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="adminCategoryName">Name</Label>
              <Input
                id="adminCategoryName"
                placeholder="e.g. Mathematics"
                value={categoryName}
                onChange={(event) => setCategoryName(event.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="adminCategorySlug">Slug</Label>
              <Input
                id="adminCategorySlug"
                placeholder="e.g. mathematics"
                value={categorySlug}
                onChange={(event) => setCategorySlug(event.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleCloseCreate}>
              Cancel
            </Button>
            <Button disabled={isPending} onClick={handleCreateCategory}>
              Create Category
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription>
              Update the category details. Both name and slug are required.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="editCategoryName">Name</Label>
              <Input
                id="editCategoryName"
                placeholder="e.g. Mathematics"
                value={categoryName}
                onChange={(event) => setCategoryName(event.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="editCategorySlug">Slug</Label>
              <Input
                id="editCategorySlug"
                placeholder="e.g. mathematics"
                value={categorySlug}
                onChange={(event) => setCategorySlug(event.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleCloseEdit}>
              Cancel
            </Button>
            <Button disabled={isPending} onClick={handleUpdateCategory}>
              Update Category
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
