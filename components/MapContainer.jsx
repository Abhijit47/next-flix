"use client";

import { SvgSpinners3DotsScale } from "@/assets/icons";
import dynamic from "next/dynamic";

const LazyMap = dynamic(
  () =>
    import("./MapComponent/Map", {
      ssr: false,
      loading: () => (
        <div>
          <SvgSpinners3DotsScale className="h-10 w-10" />
        </div>
      ),
    }),
);

export default function MapContainer({ data }) {
  if (typeof window === "undefined") {
    return (
      <div>
        <SvgSpinners3DotsScale className="h-10 w-10" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <LazyMap />
    </div>
  );
}
