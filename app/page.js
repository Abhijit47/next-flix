import Image from "next/image";
import imgSrc from "@/public/hero.jpeg";

import { SignedOut, SignInButton } from "@clerk/nextjs";
import Button from "@/components/Button";

export default function Home() {
  return (
    <section className="my-16 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
      <div className="grid content-center justify-items-center gap-y-2 xs:p-2 sm:gap-y-4 sm:p-4 md:gap-y-4 md:p-6 lg:gap-y-6 xl:p-8">
        <h1 className="grid gap-y-4 self-center justify-self-center text-center font-bold text-stone-800">
          <span className="block xs:text-4xl lg:text-5xl">
            Welcome to NextFlix
          </span>
          <span className="block xs:text-3xl lg:text-4xl">
            "Your Ultimate Entertainment Companion"
          </span>
        </h1>
        <p className="self-center text-center font-semibold leading-6 text-stone-700 xs:text-base sm:text-lg lg:text-xl">
          "At NextFlix, we bring you a world of entertainment at your
          fingertips. Explore a vast library of movies, TV shows, and more, all
          tailored to your preferences. Start streaming your favorites today and
          immerse yourself in endless entertainment possibilities."
        </p>

        <div className="self-center">
          <SignedOut>
            <SignInButton
              afterSignInUrl="/movies"
              redirectUrl="/sign-in"
              mode="modal"
            >
              <Button>Sign in to get access</Button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
      <div className="aspect-h-1 aspect-w-1">
        <Image
          src={imgSrc}
          placeholder="blur"
          blurDataURL={imgSrc.blurDataURL}
          alt="hero-image"
          priority
          className="h-full w-full rounded-lg object-cover"
        />
      </div>
    </section>
  );
}
