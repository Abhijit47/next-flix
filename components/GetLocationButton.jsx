"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function GetLocationButton({ cityName, coordinates, onToggle }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function handleClick() {
    router.push(
      pathname.replace("/theaters", "/theaters") +
        "?" +
        createQueryString("lat", coordinates[0]) +
        "&" +
        createQueryString("lng", coordinates[1]),
    );
    onToggle();
  }

  const createQueryString = useCallback(
    (name = "", value = "") => {
      const params = new URLSearchParams(searchParams.toString());
      if (searchParams.getAll("lat") && searchParams.getAll("lng")) {
        params.delete("lat");
        params.delete("lng");
        params.set(name, value);
      } else params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  return (
    <button
      className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
      onClick={handleClick}
    >
      Get Location
      <span className="sr-only">{cityName} of theater</span>
    </button>
  );
}
