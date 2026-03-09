import { LoginForm } from "@/components/auth/LoginForm";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Auchan | Connexion",
};

function LoginFormFallback() {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-primary">
      <div className="relative z-10 w-[90%] max-w-[380px] rounded-[24px] bg-white p-8 shadow-[10px_10px_0px_0px_var(--primary-muted)] animate-pulse">
        <div className="h-9 w-48 bg-muted rounded" />
        <div className="mt-2 h-5 w-72 bg-muted rounded" />
        <div className="mt-8 flex flex-col gap-5">
          <div className="h-11 bg-muted rounded-xl" />
          <div className="h-11 bg-muted rounded-xl" />
          <div className="mt-2 h-11 bg-muted rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginFormFallback />}>
      <LoginForm />
    </Suspense>
  );
}
