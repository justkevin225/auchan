"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { login } from "@/lib/api/auth";
import { getSafeRedirectFrom } from "@/lib/auth";
import { AlertCircle, Info, X } from "lucide-react";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = useCallback(
    async (event: { preventDefault(): void }) => {
      event.preventDefault();
      if (isLoading) return;
      setIsLoading(true);
      setErrorMessage(null);

      try {
        await login({ username, password });
        document.cookie = "auth=true; path=/;";
        const redirectTo = getSafeRedirectFrom(searchParams.get("from"));
        router.push(redirectTo ?? "/dashboard");
      } catch (error: unknown) {
        if (
          typeof error === "object" &&
          error !== null &&
          "message" in error &&
          typeof (error as { message: unknown }).message === "string"
        ) {
          setErrorMessage((error as { message: string }).message);
        } else {
          setErrorMessage("Une erreur est survenue. Veuillez réessayer.");
        }
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, username, password, searchParams, router],
  );

  const isError = Boolean(errorMessage);

  const infoContent = errorMessage ? (
    <p>
      {errorMessage}. Utilisez l’identifiant <b>admin</b> et le mot de passe{" "}
      <b>admin</b>.
    </p>
  ) : (
    <p>
      Pour vous connecter, utilisez l’identifiant <b>admin</b> et le mot de
      passe <b>admin</b>.
    </p>
  );

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-primary">
      {/* Oiseau en arrière-plan */}
      <div className="pointer-events-none absolute right-0 w-screen h-[110vh] bottom-[-30%]">
        <Image
          src="/images/bird-bg.png"
          alt="Bird background"
          fill
          className="object-contain opacity-[0.3] w-full h-full"
          priority
          draggable={false}
        />
      </div>

      {/* Carte de connexion */}
      <div className="relative z-10 w-[90%] max-w-[380px] rounded-[24px] bg-white p-8 shadow-[10px_10px_0px_0px_var(--primary-muted)]">
        <h1 className="font-sana-heavy tracking-tight text-black text-2xl sm:text-3xl">
          Connexion
        </h1>
        <p className=" font-sana-regular text-black/90 text-base">
          Saisissez vos identifiants pour vous connecter
        </p>

        <form className="mt-8 flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="identifiant"
              className="text-sm font-medium text-black"
            >
              Identifiant
            </label>
            <Input
              id="identifiant"
              type="text"
              autoComplete="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="h-11 rounded-xl border-[#CCCCCC] bg-white text-black placeholder:text-black/40 focus-visible:border-muted focus-visible:ring-muted/50"
              size="lg"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-black"
            >
              Mot de passe
            </label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="h-11 rounded-xl border-[#CCCCCC] bg-white text-black placeholder:text-black/40 focus-visible:border-muted focus-visible:ring-muted/50"
              size="lg"
            />
            <div className="flex justify-end">
              <Link
                href="/login/forgot"
                className="text-xs font-medium text-primary hover:underline sm:text-sm"
              >
                Mot de passe oublié
              </Link>
            </div>
          </div>

          {/* Canva d'information / erreur */}
          <div
            className={`w-full rounded-lg text-sm px-3 py-2 ${isError
              ? "bg-destructive/10 text-destructive border border-destructive/30"
              : "bg-muted/40 border border-muted/30"
              }`}
          >
            <div className="flex items-center justify-between">
              <span
                className={`flex items-center gap-2 font-semibold ${isError ? "text-destructive" : ""
                  }`}
              >
                {isError ? (
                  <AlertCircle className="size-4 shrink-0" aria-hidden />
                ) : (
                  <Info className="size-4 shrink-0" aria-hidden />
                )}
                {isError ? "Erreur" : "Information"}
              </span>

              {
                errorMessage && (
                  <X className="size-4 shrink-0 cursor-pointer" aria-hidden onClick={() => setErrorMessage(null)} />
                )
              }

            </div>
            {infoContent}
          </div>

          <div className="flex flex-wrap gap-2 font-sana-bold">
            <Link
              href="/otp"
              className="text-xs font-medium text-primary hover:underline sm:text-sm"
            >
              OTP
            </Link>
            <Link
              href="/new-password"
              className="text-xs font-medium text-primary hover:underline sm:text-sm"
            >
              Nouveau mot de passe
            </Link>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="h-11 w-full gap-2 rounded-xl bg-primary font-semibold text-white hover:bg-primary/80 focus-visible:ring-primary/30 disabled:pointer-events-none disabled:opacity-70"
          >
            {isLoading ? (
              <>
                <Spinner className="size-5 text-white" />
                Connexion...
              </>
            ) : (
              "Se connecter"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
