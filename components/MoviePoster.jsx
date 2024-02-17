"use client";

import { useState } from "react";
import Image from "next/image";

export default function MoviePoster({ poster = "", title }) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = (e) => {
    setImageError(true);
  };

  return (
    <div>
      {imageError ? (
        <Image
          src="/no-image-placeholder.svg"
          alt={title}
          width={900}
          height={1000}
          className="h-full w-full object-cover object-center"
          // priority={false}
        />
      ) : (
        <Image
          src={poster}
          alt={title}
          width={500}
          height={500}
          className="h-full w-full object-cover object-center"
          onError={handleImageError}
          // priority={false}
        />
      )}
    </div>
  );
}
