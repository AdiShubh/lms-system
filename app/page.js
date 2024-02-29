
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <p>Home
      <UserButton afterSignOutUrl="/" />
    </p>
  );
}
