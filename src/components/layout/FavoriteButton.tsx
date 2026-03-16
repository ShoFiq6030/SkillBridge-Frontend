"use client";

import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { is } from "zod/v4/locales";

export default function FavoriteButton() {
  const [isFavorite, setIsFavorite] = useState(false);
  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };
  return (
    <>
      {isFavorite ? (
        <button className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm z-10">
          <FaHeart
            className="text-red-500 cursor-pointer"
            onClick={toggleFavorite}
          />
        </button>
      ) : (
        <button className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm z-10">
          <FaHeart
            className="text-gray-400 cursor-pointer"
            onClick={toggleFavorite}
          />
        </button>
      )}
    </>
  );
}
