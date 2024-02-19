"use client";

import {
  HeroiconsSolidSearch,
  HeroiconsOutlineMenuAlt2,
  HeroiconsOutlineX,
} from "@/assets/icons";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";

import { Disclosure } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { classNames } from "@/lib/helpers";
import { usePathname } from "next/navigation";
import Button from "./Button";

export default function Navbar() {
  const { isSignedIn, user, isLoaded } = useUser();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50">
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="flex items-center px-2 lg:px-0">
                  <div className="flex-shrink-0">
                    <Link href={"/"}>
                      <Image
                        className="block h-8 w-auto object-cover lg:hidden"
                        src="/logo.svg"
                        alt="next-flix logo"
                        width={233}
                        height={89}
                        priority
                      />
                    </Link>
                    <Link href={"/"}>
                      <Image
                        className="hidden h-12 w-auto object-cover lg:block"
                        src="/logo.svg"
                        alt="next-flix logo"
                        width={233}
                        height={89}
                        priority
                      />
                    </Link>
                  </div>
                  <div className="hidden lg:ml-6 lg:block">
                    <div className="flex space-x-4">
                      {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                      <Link
                        href="/movies"
                        className={classNames(
                          pathname === "/movies"
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium",
                        )}
                      >
                        Movies
                      </Link>
                      <Link
                        href="/theaters"
                        className={classNames(
                          pathname === "/theaters"
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium",
                        )}
                      >
                        Theaters
                      </Link>
                      <Link
                        href="/comments"
                        className={classNames(
                          pathname === "/comments"
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium",
                        )}
                      >
                        Comments
                      </Link>
                      <Link
                        href="/contact"
                        className={classNames(
                          pathname === "#"
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium",
                        )}
                      >
                        Contact
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="flex flex-1 justify-center px-2 lg:ml-6 lg:justify-end">
                  <div className="w-full max-w-lg lg:max-w-xs">
                    <label htmlFor="search" className="sr-only">
                      Search
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <HeroiconsSolidSearch
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </div>
                      <input
                        id="search"
                        name="search"
                        className="block w-full rounded-md border border-transparent bg-gray-700 py-2 pl-10 pr-3 leading-5 text-gray-300 placeholder-gray-400 focus:border-white focus:bg-white focus:text-gray-900 focus:outline-none focus:ring-white sm:text-sm"
                        placeholder="Search"
                        type="search"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex lg:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <HeroiconsOutlineX
                        className="block h-6 w-6"
                        aria-hidden="true"
                      />
                    ) : (
                      <HeroiconsOutlineMenuAlt2
                        className="block h-6 w-6"
                        aria-hidden="true"
                      />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="hidden lg:ml-4 lg:block">
                  <div className="flex items-center">
                    <SignedIn>
                      {/* Mount the UserButton component */}
                      <UserButton afterSignOutUrl="/" />
                    </SignedIn>
                    <SignedOut>
                      {/* Signed out users get sign in button */}
                      <SignInButton
                        afterSignInUrl="/"
                        redirectUrl="/sign-in"
                        mode="modal"
                      >
                        {/* <Button>Sign in to get access</Button> */}
                        <button className="rounded-md bg-blue-800 px-4 py-2 text-sm text-white">
                          Sign in
                        </button>
                      </SignInButton>
                    </SignedOut>
                  </div>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="lg:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                <Disclosure.Button
                  as="a"
                  href="/movies"
                  className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"
                >
                  Movies
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href="/theaters"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  Theaters
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href="/comments"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  Comments
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href="/contact"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  Contact
                </Disclosure.Button>
              </div>
              <div className="border-t border-gray-700 pb-3 pt-4">
                <div className="flex items-center gap-x-4 px-5">
                  <SignedIn>
                    {/* Mount the UserButton component */}
                    <UserButton afterSignOutUrl="/" />
                  </SignedIn>
                  <SignedOut>
                    {/* Signed out users get sign in button */}
                    <SignInButton
                      afterSignInUrl="/movies"
                      redirectUrl="/sign-in"
                      mode="modal"
                    >
                      <button className="rounded-md bg-blue-800 px-4 py-2 text-xs text-white">
                        Sign in
                      </button>
                    </SignInButton>
                  </SignedOut>

                  {isSignedIn && (
                    <div>
                      <span className="inline-flex items-center rounded-md bg-indigo-100 px-2.5 py-0.5 text-sm font-medium text-indigo-800">
                        <svg
                          className="-ml-0.5 mr-1.5 h-2 w-2 text-indigo-400"
                          fill="currentColor"
                          viewBox="0 0 8 8"
                        >
                          <circle cx={4} cy={4} r={3} />
                        </svg>
                        {user?.firstName}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </header>
  );
}
