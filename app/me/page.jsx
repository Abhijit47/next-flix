import { UserProfile } from "@clerk/nextjs";

export default function Profile() {
  return <UserProfile path="/profile" routing="virtual" />;
}
