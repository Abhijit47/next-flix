import Link from "next/link";
import {
  HeroiconsOutlineArrowSmUp,
  HeroiconsOutlinePaperClip,
} from "@/assets/icons";

const API_URL = process.env.API_URL;

async function getComment(id) {
  try {
    const res = await fetch(`${API_URL}/comments/${id}`, {
      cache: "no-cache",
    });

    if (!res.ok) {
      return `Failed to fetch comment with this ${id}`;
    }

    return res.json();
  } catch (err) {
    return "Something went in server";
  }
}

export default async function CommentPage({ params }) {
  const { status, message, data } = await getComment(params.id);

  const { comment, movie } = data;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
      <div className="mx-auto grid h-[90dvh] max-w-3xl place-items-center">
        <div className="grid justify-items-start overflow-hidden bg-white pb-4 shadow xs:pb-2 sm:rounded-lg md:pb-3">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Comment ({comment?._id})
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Comment details
            </p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Full name</dt>
                <dd className="mt-1 text-sm text-gray-900">{comment?.name}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">
                  Comment on
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {movie?.title ?? "N/A"}
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">
                  Email address
                </dt>
                <dd className="mt-1 text-sm text-gray-900">{comment?.email}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Go to</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {movie === null ? (
                    <Link href="#">
                      <HeroiconsOutlineArrowSmUp className="h-6 w-6 rotate-45 rounded-full p-1 text-indigo-600 ring-1 ring-indigo-500" />
                    </Link>
                  ) : (
                    <Link href={`/movies/${movie?._id}`}>
                      <HeroiconsOutlineArrowSmUp className="h-6 w-6 rotate-45 rounded-full p-1 text-indigo-600 ring-1 ring-indigo-500" />
                    </Link>
                  )}
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">Comment</dt>
                <dd className="mt-1 text-sm text-gray-900">{comment?.text}</dd>
              </div>

              {/* <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">
                  Attachments
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  <ul className="divide-y divide-gray-200 rounded-md border border-gray-200">
                    <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                      <div className="flex w-0 flex-1 items-center">
                        <HeroiconsOutlinePaperClip
                          className="h-5 w-5 flex-shrink-0 text-gray-400"
                          aria-hidden="true"
                        />
                        <span className="ml-2 w-0 flex-1 truncate">
                          resume_back_end_developer.pdf
                        </span>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <a
                          href="#"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Download
                        </a>
                      </div>
                    </li>
                    <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                      <div className="flex w-0 flex-1 items-center">
                        <HeroiconsOutlinePaperClip
                          className="h-5 w-5 flex-shrink-0 text-gray-400"
                          aria-hidden="true"
                        />
                        <span className="ml-2 w-0 flex-1 truncate">
                          coverletter_back_end_developer.pdf
                        </span>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <a
                          href="#"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Download
                        </a>
                      </div>
                    </li>
                  </ul>
                </dd>
              </div> */}
            </dl>
          </div>
          <Link
            className="justify-self-center rounded-lg bg-indigo-500 px-4 py-2 text-sm font-normal text-white"
            href={"/comments"}
          >
            Go back
          </Link>
        </div>
      </div>
    </div>
  );
}
