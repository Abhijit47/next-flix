"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const fallBackSrc = "/no-image-placeholder.svg";

export default function MovieCover({ poster = "", title = "" }) {
  const [imgSource, setImageSource] = useState(poster);

  useEffect(() => {
    setImageSource(poster);
  }, [poster]);

  return (
    <Image
      src={imgSource}
      alt={title}
      width={800}
      height={500}
      className="h-full w-full object-cover object-center"
      // priority={false}
      priority={false}
      onLoad={(e) => {
        // console.log(e.target.naturalWidth, e.target.naturalHeight);
        if (e.target.naturalWidth === 0) {
          setImageSource(fallBackSrc);
        }
      }}
      onError={() => setImageSource(fallBackSrc)}
    />
  );
}
