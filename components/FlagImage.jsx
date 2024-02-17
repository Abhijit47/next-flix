"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const fallBackSrc = "https://flagcdn.com/32x24/us.webp";

export default function FlagImage({ src = "", altName = "" }) {
  const [imgSource, setImageSource] = useState(src);

  useEffect(() => {
    setImageSource(src);
  }, [src]);

  return (
    <Image
      src={imgSource}
      alt={altName}
      width={16}
      height={12}
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
