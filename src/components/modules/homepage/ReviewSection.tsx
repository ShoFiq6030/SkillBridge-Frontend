"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaQuoteLeft } from "react-icons/fa";

interface Student {
  id: string;
  name: string;
  email: string;
  image: string;
}

interface Review {
  id: string;
  rating: number;
  comment: string;
  bookingId: string;
  createdAt: string;
  updatedAt: string;
  student: Student;
}

const reviews: Review[] = [
  {
    id: "008b8331-62cf-4ab5-b3e9-082fc0190adc",
    rating: 5,
    comment: "he is a professional with this subject.",
    bookingId: "2b2c87ba-fa9c-4eff-b024-a080e87a19ac",
    createdAt: "2026-04-08T17:38:36.662Z",
    updatedAt: "2026-04-08T19:47:07.441Z",
    student: {
      id: "doxR4sUZZvgvs089qlaXqh6dFN9r305b",
      name: "Shofiq3",
      email: "shofiq3@gmail.com",
      image:
        "https://res.cloudinary.com/dfz4ek2ub/image/upload/v1766300704/PH/PH-10/ladaenosgqi8pdhgyd9l.png",
    },
  },
  {
    id: "2",
    rating: 5,
    comment: "Very clear explanation and helpful sessions!",
    bookingId: "x",
    createdAt: "",
    updatedAt: "",
    student: {
      id: "2",
      name: "Rahim",
      email: "",
      image: "https://i.pravatar.cc/100?img=2",
    },
  },
  {
    id: "3",
    rating: 4,
    comment: "Good teaching style, easy to understand.",
    bookingId: "x",
    createdAt: "",
    updatedAt: "",
    student: {
      id: "3",
      name: "Karim",
      email: "",
      image: "https://i.pravatar.cc/100?img=3",
    },
  },
];

const Card: React.FC<{ review: Review; active?: boolean }> = ({
  review,
  active,
}) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: active ? 1 : 0.4, scale: active ? 1 : 0.9 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className={`rounded-2xl p-6 max-w-sm w-full shadow-lg
        ${
          active
            ? "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
            : "bg-white/70 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400"
        }`}
    >
      <p className="text-lg italic leading-relaxed mb-6 capitalize ">
        <span className="text-orange-400 text-6xl mb-4">
          <FaQuoteLeft />
        </span>
        {review.comment}
      </p>

      <div className="flex items-center gap-3 mt-4">
        <img
          src={review.student.image}
          alt={review.student.name}
          className="w-10 h-10 rounded-full"
        />
        <div>
          <h4 className="font-semibold">{review.student.name}</h4>
          <p className="text-xs">Student</p>
        </div>
      </div>
    </motion.div>
  );
};

const ReviewSection: React.FC = () => {
  const [[index, direction], setIndex] = useState<[number, number]>([0, 0]);

  const next = () => setIndex(([prev]) => [(prev + 1) % reviews.length, 1]);
  const prev = () =>
    setIndex(([prev]) => [(prev - 1 + reviews.length) % reviews.length, -1]);

  const prevIndex = (index - 1 + reviews.length) % reviews.length;
  const nextIndex = (index + 1) % reviews.length;

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 100 : -100, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -100 : 100, opacity: 0 }),
  };

  return (
    <div className="bg-green-900 dark:bg-gray-900 py-16 px-4 text-white rounded-2xl overflow-hidden">
      <h2 className="text-3xl font-semibold text-center mb-12">
        Feedback from {" "}
        <span className="text-yellow-400 italic">Student</span>
      </h2>

      <div className="flex items-center justify-center gap-6 relative">
        {/* Previous */}
        <Card review={reviews[prevIndex]} />

        {/* Active with slide animation */}
        <div className="w-87.5">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={reviews[index].id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5 }}
            >
              <Card review={reviews[index]} active />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Next */}
        <Card review={reviews[nextIndex]} />
      </div>

      <div className="flex justify-center gap-4 mt-10">
        <button
          onClick={prev}
          className="w-12 h-12 rounded-full border border-white flex items-center justify-center hover:bg-white hover:text-green-900 transition"
        >
          <FaArrowLeftLong />
        </button>
        <button
          onClick={next}
          className="w-12 h-12 rounded-full border border-white flex items-center justify-center hover:bg-white hover:text-green-900 transition"
        >
          <FaArrowRightLong />
        </button>
      </div>
    </div>
  );
};

export default ReviewSection;
