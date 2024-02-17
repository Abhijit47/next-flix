"use client";

import { useCallback, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Paginate({
  currentPage,
  currentResult,
  totalPage,
  totalRecord,
}) {
  const [search, setSearch] = useState(1);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (query = "", value = "") => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(query, value);

      return params.toString();
    },
    [searchParams],
  );

  function handleNext() {
    if (currentPage === 534) {
      router.push("?" + createQueryString("page", 1));
    } else {
      router.push("?" + createQueryString("page", search));
      setSearch((search) => search + 1);
    }
  }

  function handlePrev() {
    if (currentPage === 1) {
      return alert("You are in current page");
    } else {
      router.push("?" + createQueryString("page", search));
      setSearch((search) => search - 1);
    }
  }

  return (
    <div className="sticky bottom-0 w-full bg-white">
      <div className="flex items-center justify-between p-8">
        <button
          className="group relative inline-block text-sm font-medium text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
          type="button"
          onClick={handlePrev}
        >
          <span className="absolute inset-0 translate-x-0.5 translate-y-0.5 bg-indigo-600 transition-transform delay-75 duration-500 ease-in-out group-hover:translate-x-0 group-hover:translate-y-0"></span>

          <span className="relative block border border-current bg-white px-8 py-3">
            {" "}
            Prev{" "}
          </span>
        </button>
        <p className="text-wrap text-center">
          Showing page {currentPage} of {totalPage}
        </p>
        <button
          className="group relative inline-block text-sm font-medium text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
          type="button"
          // onClick={() => {
          //   router.push("?" + createQueryString("page", search));
          //   setSearch(search + 1);
          // }}
          onClick={handleNext}
        >
          <span className="absolute inset-0 translate-x-0.5 translate-y-0.5 bg-indigo-600 transition-transform delay-75 duration-500 ease-in-out group-hover:translate-x-0 group-hover:translate-y-0"></span>

          <span className="relative block border border-current bg-white px-8 py-3">
            {" "}
            Next{" "}
          </span>
        </button>
      </div>
    </div>
  );
}
