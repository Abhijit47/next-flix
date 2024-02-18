import MovieCover from "@/components/MovieCover";
import { features } from "@/constants";
import { calcMovieRuntime } from "@/lib/helpers";
import Link from "next/link";
// import GaugeChart from "react-gauge-chart";

const API_URL = process.env.API_URL;

async function getMovie(id) {
  try {
    const res = await fetch(`${API_URL}/movies/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  } catch (err) {
    throw new Error("Something going wrong in server");
  }
}

export default async function MoviePage({ params }) {
  const { data } = await getMovie(params.id);

  return (
    <div className="mt-8 bg-white">
      <div aria-hidden="true" className="relative">
        <MovieCover poster={data?.poster} title={data?.title} />

        <div className="absolute inset-0 bg-gradient-to-t from-white" />
      </div>

      <div className="relative mx-auto -mt-12 max-w-7xl px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
        <div className="mx-auto max-w-2xl text-center lg:max-w-4xl">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {data?.title}
          </h2>
          <p className="mt-4 text-gray-500">{data?.fullplot}</p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <span className="inline-flex items-center rounded bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800">
              {data?.released === undefined || null
                ? "N/A"
                : new Date(data?.released).toDateString()}
            </span>

            <span className="inline-flex items-center rounded bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
              Runtime: {calcMovieRuntime(data?.runtime)}
            </span>

            <span className="inline-flex items-center rounded bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-800">
              Released: {data?.year === undefined || null ? "N/A" : data?.year}
            </span>

            <span className="inline-flex items-center rounded bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-800">
              DVD:{" "}
              {data?.tomatoes?.dvd === undefined || null
                ? "N/A"
                : new Date(data?.tomatoes?.dvd).toDateString()}
            </span>

            <span className="inline-flex items-center rounded bg-blue-100 px-2 py-0.5 text-xs font-medium capitalize text-blue-800">
              Type: {data?.type === undefined || null ? "N/A" : data?.type}
            </span>

            <span className="inline-flex items-center rounded bg-pink-100 px-2 py-0.5 text-xs font-medium text-pink-800">
              Rated: {data?.rated === undefined || null ? "N/A" : data?.rated}
            </span>

            <span className="inline-flex items-center rounded bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-800">
              Comments:{" "}
              {data?.num_mflix_comments === undefined || null
                ? "N/A"
                : data?.num_mflix_comments}
            </span>
          </div>
        </div>

        <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:max-w-none lg:grid-cols-3 lg:gap-x-8">
          <div className="border-t border-gray-200 pt-4">
            <dt className="font-medium text-gray-900">Directors</dt>
            {data?.directors === undefined || null
              ? "N/A"
              : data?.directors?.map((director, idx) => (
                  <dd key={idx} className="mt-2 text-sm text-gray-500">
                    {director}
                  </dd>
                ))}
          </div>
          <div className="border-t border-gray-200 pt-4">
            <dt className="font-medium text-gray-900">Writers</dt>
            {data?.writers === undefined || null
              ? "N/A"
              : data?.writers?.map((writer, idx) => (
                  <dd key={idx} className="mt-2 text-sm text-gray-500">
                    {writer}
                  </dd>
                ))}
          </div>
          <div className="border-t border-gray-200 pt-4">
            <dt className="font-medium text-gray-900">Genres</dt>
            {data?.genres === undefined || null
              ? "N/A"
              : data?.genres?.map((genre, idx) => (
                  <dd key={idx} className="mt-2 text-sm text-gray-500">
                    {genre}
                  </dd>
                ))}
          </div>
          <div className="border-t border-gray-200 pt-4">
            <dt className="font-medium text-gray-900">Released in</dt>
            {data?.countries === undefined || null
              ? "N/A"
              : data?.countries?.map((country, idx) => (
                  <dd key={idx} className="mt-2 text-sm text-gray-500">
                    {country}
                  </dd>
                ))}
          </div>
          <div className="border-t border-gray-200 pt-4">
            <dt className="font-medium text-gray-900">Cast & Crew</dt>
            {data?.cast === undefined || null
              ? "N/A"
              : data?.cast?.map((actor, idx) => (
                  <dd key={idx} className="mt-2 text-sm text-gray-500">
                    {actor}
                  </dd>
                ))}
          </div>
          <div className="border-t border-gray-200 pt-4">
            <dt className="font-medium text-gray-900">Languages</dt>
            {data?.languages === undefined || null
              ? "N/A"
              : data?.languages?.map((language, idx) => (
                  <dd key={idx} className="mt-2 text-sm text-gray-500">
                    {language}
                  </dd>
                ))}
          </div>
          <div className="border-t border-gray-200 pt-4">
            <dt className="font-medium text-gray-900">Awards</dt>
            {data?.awards === undefined || null
              ? "N/A"
              : Object?.entries(data?.awards)?.map(([key, value]) => (
                  <dd key={key} className="mt-2 text-sm text-gray-500">
                    <span className="capitalize">
                      {key === "text" ? "message" : key}:{" "}
                    </span>
                    {value}
                  </dd>
                ))}
          </div>
          <div className="border-t border-gray-200 pt-4">
            <dt className="font-medium text-gray-900">IMDB info</dt>
            {data?.imdb === undefined
              ? "N/A"
              : Object?.entries(data?.imdb)?.map(([key, value]) => (
                  <dd key={key} className="mt-2 text-sm text-gray-500">
                    <span className="capitalize">{key}: </span>
                    {value}
                  </dd>
                ))}
          </div>

          <div className="border-t border-gray-200 pt-4">
            <dt className="font-medium text-gray-900">{"feature"}</dt>
            <dd className="mt-2 text-sm text-gray-500">{"description"}</dd>
          </div>
          {/* <div className="border-t border-gray-200 pt-4">
            <dt className="font-medium text-gray-900">{"feature"}</dt>
            <dd className="mt-2 text-sm text-gray-500">{"description"}</dd>
          </div>
          <div className="border-t border-gray-200 pt-4">
            <dt className="font-medium text-gray-900">{"feature"}</dt>
            <dd className="mt-2 text-sm text-gray-500">{"description"}</dd>
          </div> */}
          {/* {features.map((feature) => (
            <div key={feature.name} className="border-t border-gray-200 pt-4">
              <dt className="font-medium text-gray-900">{feature.name}</dt>
              <dd className="mt-2 text-sm text-gray-500">
                {feature.description}
              </dd>
            </div>
          ))} */}
        </dl>
      </div>
      <div className="flex items-center justify-center py-4">
        <Link
          href={"/movies"}
          className="rounded-md bg-indigo-500 px-4 py-2 text-white shadow-md"
        >
          Go back
        </Link>
      </div>
      {/* <GaugeChart /> */}
    </div>
  );
}
