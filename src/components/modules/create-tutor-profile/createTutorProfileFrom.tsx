"use client";

import { useForm } from "@tanstack/react-form";

import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createTutorProfileAction } from "@/actions/tutor.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { FieldError } from "@/components/ui/field";

const tutorProfileSchema = z.object({
  headline: z.string().min(5, "Headline must be at least 5 characters"),
  bio: z.string().min(10, "Bio must be at least 10 characters"),
  hourlyRate: z.number().min(1, "Hourly rate must be at least 1"),
  currency: z.string().min(1, "Currency is required"),
  language: z.string().min(1, "Language is required"),
  experienceYears: z.number().min(0, "Experience years cannot be negative"),
});

export default function CreateTutorProfileForm() {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      headline: "",
      bio: "",
      hourlyRate: 10,
      currency: "USD",
      language: "ENGLISH",
      experienceYears: 1,
    },
    validators: {
      onSubmit: tutorProfileSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating your tutor profile...");
      try {
        const result = await createTutorProfileAction(value);
        if (result.error) {
          toast.error(result.error.message, { id: toastId });
        } else {
          toast.success("Tutor profile created successfully!", { id: toastId });
          router.push("/dashboard/tutor-dashboard");
        }
      } catch (error) {
        toast.error("An unexpected error occurred", { id: toastId });
      }
    },
  });

  return (
    <CardContent>
             <form
               onSubmit={(e) => {
                 e.preventDefault();
                 e.stopPropagation();
                 form.handleSubmit();
               }}
               className="space-y-6"
             >
               {/* Headline */}
               <form.Field
                 name="headline"
                 children={(field) => {
                   const isInvalid =
                     field.state.meta.isTouched && !field.state.meta.isValid;
                   return (
                     <div className="space-y-2">
                       <Label htmlFor={field.name}>Headline</Label>
                       <Input
                         id={field.name}
                         name={field.name}
                         value={field.state.value}
                         onBlur={field.handleBlur}
                         onChange={(e) => field.handleChange(e.target.value)}
                         placeholder="e.g. Senior Web Developer | React Expert"
                       />
                       {isInvalid && (
                         <FieldError errors={field.state.meta.errors} />
                       )}
                     </div>
                   );
                 }}
               />
   
               {/* Bio */}
               <form.Field
                 name="bio"
                 children={(field) => {
                   const isInvalid =
                     field.state.meta.isTouched && !field.state.meta.isValid;
                   return (
                     <div className="space-y-2">
                       <Label htmlFor={field.name}>Bio</Label>
                       <Textarea
                         id={field.name}
                         name={field.name}
                         value={field.state.value}
                         onBlur={field.handleBlur}
                         onChange={(e) => field.handleChange(e.target.value)}
                         placeholder="Tell potential students about your experience and teaching style..."
                         className="min-h-30"
                       />
                       {isInvalid && (
                         <FieldError errors={field.state.meta.errors} />
                       )}
                     </div>
                   );
                 }}
               />
   
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {/* Hourly Rate */}
                 <form.Field
                   name="hourlyRate"
                   children={(field) => {
                     const isInvalid =
                       field.state.meta.isTouched && !field.state.meta.isValid;
                     return (
                       <div className="space-y-2">
                         <Label htmlFor={field.name}>Hourly Rate</Label>
                         <Input
                           id={field.name}
                           type="number"
                           name={field.name}
                           value={field.state.value}
                           onBlur={field.handleBlur}
                           onChange={(e) =>
                             field.handleChange(Number(e.target.value))
                           }
                         />
                         {isInvalid && (
                           <FieldError errors={field.state.meta.errors} />
                         )}
                       </div>
                     );
                   }}
                 />
   
                 {/* Currency */}
                 <form.Field
                   name="currency"
                   children={(field) => {
                     const isInvalid =
                       field.state.meta.isTouched && !field.state.meta.isValid;
                     return (
                       <div className="space-y-2">
                         <Label htmlFor={field.name}>Currency</Label>
                         <Select
                           value={field.state.value}
                           onValueChange={(value) => field.handleChange(value)}
                         >
                           <SelectTrigger id={field.name}>
                             <SelectValue placeholder="Select currency" />
                           </SelectTrigger>
                           <SelectContent>
                             <SelectItem value="USD">USD</SelectItem>
                             <SelectItem value="EUR">EUR</SelectItem>
                             <SelectItem value="GBP">GBP</SelectItem>
                             <SelectItem value="BDT">BDT</SelectItem>
                           </SelectContent>
                         </Select>
                         {isInvalid && (
                           <FieldError errors={field.state.meta.errors} />
                         )}
                       </div>
                     );
                   }}
                 />
               </div>
   
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {/* Language */}
                 <form.Field
                   name="language"
                   children={(field) => {
                     const isInvalid =
                       field.state.meta.isTouched && !field.state.meta.isValid;
                     return (
                       <div className="space-y-2">
                         <Label htmlFor={field.name}>Language</Label>
                         <Select
                           value={field.state.value}
                           onValueChange={(value) => field.handleChange(value)}
                         >
                           <SelectTrigger id={field.name}>
                             <SelectValue placeholder="Select language" />
                           </SelectTrigger>
                           <SelectContent>
                             <SelectItem value="ENGLISH">ENGLISH</SelectItem>
                             <SelectItem value="SPANISH">SPANISH</SelectItem>
                             <SelectItem value="FRENCH">FRENCH</SelectItem>
                             <SelectItem value="BENGALI">BENGALI</SelectItem>
                           </SelectContent>
                         </Select>
                         {isInvalid && (
                           <FieldError errors={field.state.meta.errors} />
                         )}
                       </div>
                     );
                   }}
                 />
   
                 {/* Experience Years */}
                 <form.Field
                   name="experienceYears"
                   children={(field) => {
                     const isInvalid =
                       field.state.meta.isTouched && !field.state.meta.isValid;
                     return (
                       <div className="space-y-2">
                         <Label htmlFor={field.name}>Years of Experience</Label>
                         <Input
                           id={field.name}
                           type="number"
                           name={field.name}
                           value={field.state.value}
                           onBlur={field.handleBlur}
                           onChange={(e) =>
                             field.handleChange(Number(e.target.value))
                           }
                         />
                         {isInvalid && (
                           <FieldError errors={field.state.meta.errors} />
                         )}
                       </div>
                     );
                   }}
                 />
               </div>
   
               <form.Subscribe
                 selector={(state) => [state.canSubmit, state.isSubmitting]}
                 children={([canSubmit, isSubmitting]) => (
                   <Button
                     type="submit"
                     className="w-full"
                     disabled={!canSubmit || isSubmitting}
                   >
                     {isSubmitting ? (
                       <>
                         <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                         Creating Profile...
                       </>
                     ) : (
                       "Create Profile"
                     )}
                   </Button>
                 )}
               />
             </form>
           </CardContent>
  );
}
