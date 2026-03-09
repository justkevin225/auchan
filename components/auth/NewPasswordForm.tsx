"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewPasswordForm() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-primary">
      {/* Oiseau en arrière-plan */}
      <div className="pointer-events-none absolute right-0 h-[110vh] w-screen bottom-[-30%]">
        <Image
          src="/images/bird-bg.png"
          alt=""
          fill
          className="object-contain opacity-[0.3] w-full h-full"
          priority
          draggable={false}
        />
      </div>

      {/* Carte du formulaire */}
      <div className="relative z-10 w-[90%] max-w-[380px] rounded-[24px] bg-white p-8 shadow-[10px_10px_0px_0px_var(--primary-muted)]">
        <h1 className="font-sana-heavy text-black text-2xl sm:text-3xl tracking-tight">
          Nouveau mot de passe
        </h1>
        <p className="mt-2 font-sana-regular text-black/90 text-base">
          Définis ton nouveau mot de passe pour terminer
        </p>

        <form className="mt-8 flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="new-password"
              className="text-sm font-medium text-black"
            >
              Nouveau mot de passe
            </label>
            <Input
              id="new-password"
              type="password"
              autoComplete="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="h-11 rounded-xl border-[#CCCCCC] bg-white text-black placeholder:text-black/40 focus-visible:border-muted focus-visible:ring-muted/50"
              size="lg"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="confirm-password"
              className="text-sm font-medium text-black"
            >
              Confirmer le mot de passe
            </label>
            <Input
              id="confirm-password"
              type="password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="h-11 rounded-xl border-[#CCCCCC] bg-white text-black placeholder:text-black/40 focus-visible:border-muted focus-visible:ring-muted/50"
              size="lg"
            />
          </div>

          <Button
            type="submit"
            className="mt-2 h-11 w-full rounded-xl bg-primary font-semibold text-white hover:bg-primary/80 focus-visible:ring-primary/30"
          >
            Valider
          </Button>
        </form>

        <p className="mt-6 text-center">
          <Link
            href="/login"
            className="text-sm font-medium text-primary hover:underline"
          >
            Retour à la connexion
          </Link>
        </p>
      </div>
    </div>
  );
}
