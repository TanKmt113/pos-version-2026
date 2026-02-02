"use client";

import React, { useState, useEffect } from "react";
import { Star, StarHalf } from "lucide-react";

// Định nghĩa các thuộc tính mà Component Rating chấp nhận
interface RatingProps {
  initialRating?: number;
  onChange?: (rating: number) => void;
  readonly?: boolean;
  quiet?: boolean; // Thường dùng để chỉ trạng thái không hiển thị hover
  emptySymbol?: React.ReactNode;
  fullSymbol?: React.ReactNode;
  placeholderSymbol?: React.ReactNode;
  direction?: "ltr" | "rtl";
}

export function Rating({
  initialRating = 0,
  onChange,
  readonly = false,
  quiet = false,
  direction = "ltr",
}: RatingProps) {
  const [rating, setRating] = useState<number>(initialRating);
  const [hoverRating, setHoverRating] = useState<number>(0);

  // Cập nhật rating nếu prop initialRating thay đổi từ bên ngoài
  useEffect(() => {
    if (initialRating !== undefined) {
      setRating(initialRating);
    }
  }, [initialRating]);

  const handleRatingChange = (newRating: number) => {
    if (!readonly) {
      setRating(newRating);
      if (onChange) {
        onChange(newRating);
      }
    }
  };

  const renderStar = (starNumber: number) => {
    const currentDisplayRating = hoverRating || rating;
    // Logic xác định sao nửa và sao đầy
    const isHalfStar = starNumber - 0.5 === currentDisplayRating;
    const isFilled = starNumber <= currentDisplayRating;

    return (
      <div
        key={starNumber}
        className={`relative w-6 h-6 ${
          readonly ? "cursor-default" : "cursor-pointer"
        }`}
        onClick={() => handleRatingChange(starNumber)}
        onMouseEnter={() => !readonly && !quiet && setHoverRating(starNumber)}
        onMouseLeave={() => !readonly && !quiet && setHoverRating(0)}
      >
        {/* Sao trống/đầy mặc định */}
        <Star
          className={`absolute w-6 h-6 ${
            isFilled ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          }`}
        />

        {/* Lớp đè sao nửa (nếu có) */}
        {isHalfStar && (
          <StarHalf className="absolute w-6 h-6 text-yellow-400 fill-yellow-400" />
        )}
      </div>
    );
  };

  return (
    <div
      className={`flex items-center gap-1 ${
        direction === "rtl" ? "flex-row-reverse" : "flex-row"
      }`}
      aria-label={`Rating: ${rating} out of 5`}
    >
      {[1, 2, 3, 4, 5].map((num) => renderStar(num))}
    </div>
  );
}
