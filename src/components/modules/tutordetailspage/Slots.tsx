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

interface SlotsProps {
  slots: TutorSlot[];
  subjects: TutorSubject[];
}

const Slots: React.FC<SlotsProps> = ({ slots, subjects }) => {
  const [selectedSubject, setSelectedSubject] = useState<TutorSubject | null>(
    subjects[0] || null
  );
  const [selectedSlot, setSelectedSlot] = useState<TutorSlot | null>(null);

  const availableSlots = slots.filter((slot) => !slot.isBooked);

  const handleBookSlot = () => {
    if (!selectedSlot || !selectedSubject) {
      alert("Please select a subject and a slot");
      return;
    }
    alert(
      `Booking confirmed!\nSubject: ${selectedSubject.category.name}\nSlot: ${new Date(
        selectedSlot.startAt
      ).toLocaleString()} - ${new Date(selectedSlot.endAt).toLocaleString()}`
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Available Slots</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Subject</label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  {selectedSubject ? selectedSubject.category.name : "Select subject"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="start">
                {subjects.map((subject) => (
                  <DropdownMenuItem
                    key={subject.id}
                    onClick={() => setSelectedSubject(subject)}
                  >
                    {subject.category.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Available Time Slots
            </label>
            {availableSlots.length === 0 ? (
              <p className="text-muted-foreground">No available slots</p>
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
                    onClick={() => setSelectedSlot(slot)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">
                          {new Date(slot.startAt).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(slot.startAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}{" "}
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

          <Button
            className="w-full"
            onClick={handleBookSlot}
            disabled={!selectedSlot || !selectedSubject}
          >
            Book Slot
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Slots;