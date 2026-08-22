"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";

const SignInPage = dynamic(
  () => import("@/components/ui/sign-in-flow-1").then((mod) => mod.SignInPage),
  { ssr: false, loading: () => <div className="min-h-dvh w-full bg-black" /> }
);

function SignInFallback() {
  return <div className="min-h-dvh w-full bg-black" />;
}

export default function SignInRoute() {
  return (
    <Suspense fallback={<SignInFallback />}>
      <SignInPage initialMode="signin" />
    </Suspense>
  );
}
