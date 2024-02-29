import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <>
      <div className="mt-10 mx-auto   ">
        <SignIn routing="path" redirectUrl="/browse" />
      </div>
    </>
  );
}
