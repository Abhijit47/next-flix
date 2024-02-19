import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <section>
      <div className="grid h-svh place-items-center">
        <SignIn />
      </div>
    </section>
  );
}
