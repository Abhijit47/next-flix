import Paginate from "@/components/Paginate";
import Link from "next/link";

async function getComments(page) {
  try {
    const res = await fetch(
      `http://localhost:3000/api/v1/comments?page=${page ?? 1}&limit=20`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-cache",
      },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch comments");
    }

    return res.json();
  } catch (err) {
    return new Error("Something went wrong in fetch request");
    // throw new Error("Something went wrong in fetch request");
  }
}

export default async function CommentsPage({ searchParams }) {
  const { data, currentPage, currentResult, totalPage, totalRecord } =
    await getComments(searchParams.page);

  return (
    <section>
      <div className="bg-white px-4 pb-20 pt-16 sm:px-6 lg:px-8 lg:pb-28 lg:pt-24">
        <div className="relative mx-auto max-w-lg divide-y-2 divide-gray-200 lg:max-w-7xl">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Comments
            </h2>
            <div className="mt-3 sm:mt-4 lg:grid lg:grid-cols-2 lg:items-center lg:gap-5">
              <p className="text-xl text-gray-500">
                Get All Comments
                {/* Get weekly articles in your inbox on how to grow your business. */}
              </p>
              <form className="mt-6 flex flex-col sm:flex-row lg:mt-0 lg:justify-end">
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email-address"
                    type="email"
                    autoComplete="email"
                    required
                    className="w-full appearance-none rounded-md border border-gray-300 bg-white px-4 py-2 text-base text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 lg:max-w-xs"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="mt-2 flex w-full flex-shrink-0 rounded-md shadow-sm sm:ml-3 sm:mt-0 sm:inline-flex sm:w-auto">
                  <button
                    type="button"
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:inline-flex sm:w-auto"
                  >
                    Notify me
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* comments */}
          <div className="mt-6 grid gap-16 pt-10 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-12">
            {data?.map((comment) => (
              <div
                key={comment?._id}
                className="grid gap-y-2 rounded-md p-4 hover:shadow-md"
              >
                <p className="text-sm text-gray-500">
                  <span className="inline-flex items-center rounded bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-800">
                    <time dateTime={comment?.date}>
                      {new Date(comment?.date).toDateString("en-IN", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </span>
                </p>
                <Link href={`comments/${comment?._id}`} className="">
                  <p className="text-xl font-semibold text-gray-900">
                    {comment?.name}
                  </p>
                  <p className="mt-3 line-clamp-1 text-base text-gray-500">
                    {comment?.text}
                  </p>
                </Link>
                <Link href={`mailto:${comment?.email}`}>
                  Email:{" "}
                  <span className="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800">
                    <svg
                      className="-ml-0.5 mr-1.5 h-2 w-2 text-indigo-400"
                      fill="currentColor"
                      viewBox="0 0 8 8"
                    >
                      <circle cx={4} cy={4} r={3} />
                    </svg>
                    {comment?.email}
                  </span>
                </Link>
                {/* <Link href={`movies/${comment?.movie_id}`}>
                  Movie: <span className="text-indigo-500">&rarr;</span>
                </Link> */}

                <div className="justify-self-end">
                  <Link
                    href={`comments/${comment?._id}`}
                    className="text-sm font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Read full comment
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Paginate
          currentPage={currentPage}
          currentResult={currentResult}
          totalPage={totalPage}
          totalRecord={totalRecord}
        />
      </div>
    </section>
  );
}
