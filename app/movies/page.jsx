import GoBackButton from "@/components/GoBackButton";
import MovieCover from "@/components/MovieCover";
import Paginate from "@/components/Paginate";
import { calcMovieRuntime } from "@/lib/helpers";
import Link from "next/link";
import { Suspense } from "react";

const API_URL = process.env.API_URL;

async function getMovies(page) {
  try {
    const res = await fetch(`${API_URL}/movies?page=${page ?? 1}&limit=${40}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    });

    if (!res.ok) {
      throw Error("Failed to fetch movies");
    }

    return res.json();
  } catch (err) {
    return "Something going wrong in server";
    // throw new Error("Something going wrong in server");
  }
}

const products = [
  {
    id: 1,
    name: "Leather Long Wallet",
    color: "Natural",
    price: "$75",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-04-trending-product-01.jpg",
    imageAlt: "Hand stitched, orange leather long wallet.",
  },
  {
    id: 2,
    name: "Leather Long Wallet",
    color: "Natural",
    price: "$75",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-04-trending-product-02.jpg",
    imageAlt: "Hand stitched, orange leather long wallet.",
  },
  {
    id: 3,
    name: "Leather Long Wallet",
    color: "Natural",
    price: "$75",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-04-trending-product-03.jpg",
    imageAlt: "Hand stitched, orange leather long wallet.",
  },
  {
    id: 4,
    name: "Leather Long Wallet",
    color: "Natural",
    price: "$75",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-04-trending-product-04.jpg",
    imageAlt: "Hand stitched, orange leather long wallet.",
  },
];

export default async function MoviesPage({ searchParams }) {
  const { data, currentPage, currentResult, totalPage, totalRecord } =
    await getMovies(searchParams.page);
  // console.log(data);
  // console.log(searchParams);

  return (
    <section>
      <div className="bg-white">
        <div className="relative mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
              Trending movies
            </h2>
            <Link
              href="/movies"
              className="hidden text-sm font-medium text-indigo-600 hover:text-indigo-500 md:block"
            >
              View collection<span aria-hidden="true"> &rarr;</span>
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-10 xs:grid-cols-1 sm:grid-cols-2 sm:gap-x-6 md:grid-cols-3 md:gap-y-4 lg:grid-cols-4 lg:gap-x-8">
            <Suspense fallback={<div>Loading...</div>}>
              <MovieCard data={data} />
            </Suspense>
          </div>

          <GoBackButton />

          <Paginate
            currentPage={currentPage}
            currentResult={currentResult}
            totalPage={totalPage}
            totalRecord={totalRecord}
          />
        </div>
      </div>
    </section>
  );
}

function MovieCard({ data }) {
  return (
    <>
      {data?.map((movie) => (
        <div key={movie?._id} className="group relative">
          <div className="h-full w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-72 xl:h-80">
            <MovieCover poster={movie?.poster} title={movie?.title} />
          </div>
          <h3 className="mt-4 text-sm text-gray-700">
            <Link href={`movies/${movie?._id}`}>
              <span className="absolute inset-0 truncate" />
              {movie?.title}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Runtime: {calcMovieRuntime(movie?.runtime)}
          </p>
          <p className="mt-1 text-sm font-medium text-gray-900">
            Released: {movie?.year}
          </p>
        </div>
      ))}
    </>
  );
}
