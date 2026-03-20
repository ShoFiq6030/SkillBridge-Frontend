"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";

interface Review {
  id: string;
  rating: number;
  comment: string;
  userName: string;
  userImage?: string;
  createdAt: string;
}

interface ReviewsProps {
  reviews: Review[];
}

const Reviews: React.FC<ReviewsProps> = ({ reviews }) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating
            ? "fill-yellow-400 text-yellow-400"
            : "text-gray-300"
        }`}
      />
    ));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (reviews.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-4">
            No reviews yet. Be the first to book a session!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reviews ({reviews.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="border-b pb-4 last:border-b-0">
              <div className="flex items-start gap-3">
                {review.userImage ? (
                  <img
                    src={review.userImage}
                    alt={review.userName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-medium">
                      {review.userName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium">{review.userName}</h4>
                    <span className="text-sm text-muted-foreground">
                      {formatDate(review.createdAt)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    {renderStars(review.rating)}
                  </div>
                  <p className="text-sm text-muted-foreground">{review.comment}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Reviews;

// Dummy data for testing 
export const dummyReviews: Review[] = [
  {
    id: "1",
    rating: 5,
    comment: "Excellent tutor! Very knowledgeable and patient. Highly recommended.",
    userName: "John Doe",
    createdAt: "2025-03-15T10:30:00.000Z",
  },
  {
    id: "2",
    rating: 4,
    comment: "Great session! Helped me understand complex concepts easily.",
    userName: "Jane Smith",
    createdAt: "2025-03-10T14:20:00.000Z",
  },
  {
    id: "3",
    rating: 5,
    comment: "Very professional and thorough. Will definitely book again!",
    userName: "Mike Johnson",
    createdAt: "2025-03-05T09:15:00.000Z",
  },
];