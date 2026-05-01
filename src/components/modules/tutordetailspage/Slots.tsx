"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TutorSlot, TutorSubject } from "@/types/tutor.type";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import * as z from "zod";
import { FieldError } from "@/components/ui/field";
import { bookSlotAction, processPaymentAction } from "@/actions/booking.action";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Booking } from "@/types/booking";
// import {loadStripe} from '@stripe/stripe-js';

interface SlotsProps {
  slots: TutorSlot[];
  subjects: TutorSubject[];
  bookedSlotsOfThisTutor: Booking[];
}

const formSchema = z.object({
  slotId: z.string().uuid("Invalid slot ID"),
  tutorSubjectId: z.string().uuid("Invalid tutor subject ID"),
  note: z.string().trim().max(200),
});

const Slots: React.FC<SlotsProps> = ({
  slots,
  subjects,
  bookedSlotsOfThisTutor,
}) => {
  const [selectedSubject, setSelectedSubject] = useState<TutorSubject | null>(
    null,
  );
  const [selectedSlot, setSelectedSlot] = useState<TutorSlot | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingValue, setPendingValue] = useState<any>(null);
  const [pendingFormApi, setPendingFormApi] = useState<any>(null);

  const availableSlots = slots.filter((slot) => !slot.isBooked);
  // const getBookedSlotsOfThisTutor = ;

  const {
    data: session,
    isPending, //loading state
    error, //error object
    refetch, //refetch the session
  } = authClient.useSession();

  const router = useRouter();

  const handleConfirmBooking = async () => {
    if (!pendingValue || !pendingFormApi) return;
    const { value, formApi } = { value: pendingValue, formApi: pendingFormApi };
    const toastId = toast.loading("Posting your booking...");
    try {
      // console.log("Form Data:", value);
      if (!session?.user) {
        toast.error("Unauthorized....Please Login...", { id: toastId });
        router.push("/login");
        return;
      }
      const res = await bookSlotAction(value);
      // console.log(res);
      if (res.error) {
        toast.error(
          res.error.message || "Something went wrong, please try again.",
          {
            id: toastId,
          },
        );
        return;
      }
      if (res.data.success === true) {
        toast.success("Booking confirmed!", { id: toastId });
        // window.location.replace(res.data.url);
      } else {
        toast.error(res.data.message || "Booking failed, please try again.", {
          id: toastId,
        });
        return;
      }

      formApi.reset();

      setSelectedSlot(null);
      setSelectedSubject(null);
    } catch (err) {
      toast.error("Something went wrong, please try again.", { id: toastId });
    } finally {
      setShowConfirmModal(false);
      setPendingValue(null);
      setPendingFormApi(null);
    }
  };

  const form = useForm({
    defaultValues: {
      slotId: "",
      tutorSubjectId: "",
      note: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value, formApi }) => {
      setPendingValue(value);
      setPendingFormApi(formApi);
      setShowConfirmModal(true);
    },
  });
  const handlePayment = async (booking: Booking) => {
    try {
      const res = await processPaymentAction(booking.id);

      window.location.href = res.data.url;
    } catch (err) {
      toast.error("Something went wrong, please try again.");
    }
  };

  return (
    <>
      <Card>
        {bookedSlotsOfThisTutor.length > 0 && (
          <>
            <CardHeader>
              <CardTitle>Your Booked Slots</CardTitle>
            </CardHeader>
            <CardContent>
              {bookedSlotsOfThisTutor.length === 0 ? (
                <p className="text-muted-foreground">
                  You have no booked slots.
                </p>
              ) : (
                <div className="space-y-4">
                  {bookedSlotsOfThisTutor.map((booking) => (
                    <div
                      key={booking.id}
                      className={`p-3 border rounded-md flex items-center justify-between`}
                    >
                      <div>
                        {" "}
                        <p className="font-medium flex gap-2">
                          <span> {booking.tutorSubject.category.name}</span>
                          <span
                            className={` border rounded-3xl px-2 ${booking.status === "PENDING" ? "text-yellow-500" : booking.status === "CONFIRMED" ? "text-green-500" : "text-red-500"}`}
                          >
                            {booking.status}
                          </span>
                          {booking.status === "PENDING" && <span>{booking.price}$</span>}
                          
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(booking.slot.startAt).toLocaleDateString()}{" "}
                          -{" "}
                          {new Date(booking.slot.startAt).toLocaleTimeString(
                            [],
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            },
                          )}{" "}
                          -{" "}
                          {new Date(booking.slot.endAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>

                      <div className="mt-2 flex items-center justify-end space-x-4">
                        {" "}
                        {booking.status === "PENDING" && (
                          <Button
                            className=""
                            onClick={() => handlePayment(booking)}
                          >
                            {" "}
                            Pay Now
                          </Button>
                        )}
                        {booking.status === "CONFIRMED" && <span className="text-green-500">PAID</span>}
                          
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </>
        )}

        <CardHeader>
          <CardTitle>Available Slots</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            className="space-y-4"
            id="booking-form"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <form.Field
              name="tutorSubjectId"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Subject
                    </label>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-between"
                        >
                          {selectedSubject
                            ? selectedSubject.category.name
                            : "Select subject"}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56" align="start">
                        {subjects.map((subject) => (
                          <DropdownMenuItem
                            key={subject.id}
                            onClick={() => {
                              setSelectedSubject(subject);
                              form.setFieldValue("tutorSubjectId", subject.id);
                            }}
                          >
                            {subject.category.name}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                );
              }}
            />

            <form.Field
              name="slotId"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Available Time Slots
                    </label>
                    {availableSlots.length === 0 ? (
                      <p className="text-muted-foreground">
                        No available slots
                      </p>
                    ) : (
                      <div className="space-y-2">
                        {availableSlots.map((slot) => (
                          <div
                            key={slot.id}
                            className={`p-3 border rounded-md cursor-pointer transition-colors ${
                              selectedSlot?.id === slot.id
                                ? "border-primary bg-primary/10"
                                : "hover:border-primary/50"
                            }`}
                            onClick={() => {
                              setSelectedSlot(slot);
                              form.setFieldValue("slotId", slot.id);
                            }}
                          >
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-medium">
                                  {new Date(slot.startAt).toLocaleDateString()}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {new Date(slot.startAt).toLocaleTimeString(
                                    [],
                                    {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    },
                                  )}{" "}
                                  -{" "}
                                  {new Date(slot.endAt).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </p>
                              </div>
                              <div
                                className={`w-4 h-4 rounded-full border ${
                                  selectedSlot?.id === slot.id
                                    ? "border-primary bg-primary"
                                    : "border-gray-300"
                                }`}
                              >
                                {selectedSlot?.id === slot.id && (
                                  <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }}
            />

            <form.Field
              name="note"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Note
                    </label>
                    <textarea
                      placeholder="Add note (optional)"
                      className="w-full border rounded-md p-2"
                      value={form.state.values.note}
                      onChange={(e) =>
                        form.setFieldValue("note", e.target.value)
                      }
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </div>
                );
              }}
            />

            <Button
              type="submit"
              form="booking-form"
              className="w-full"
              disabled={!selectedSlot || !selectedSubject}
            >
              Book Slot
            </Button>
          </form>
        </CardContent>
      </Card>

      <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Booking</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to book this slot?</p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowConfirmModal(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleConfirmBooking}>Book</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Slots;
