"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function GoBackButton() {
  const router = useRouter();

  return (
    <div className="mt-8 text-sm md:hidden">
      <button
        // href="/movies"
        onClick={() => router.back()}
        className="font-medium text-indigo-600 hover:text-indigo-500"
      >
        View collection<span aria-hidden="true"> &rarr;</span>
      </button>
    </div>
  );
}
