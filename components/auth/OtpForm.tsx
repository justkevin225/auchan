"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const OTP_LENGTH = 4;
const RESEND_COOLDOWN_SECONDS = 60;

function formatCountdown(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function OtpForm() {
  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [secondsRemaining, setSecondsRemaining] = useState(RESEND_COOLDOWN_SECONDS);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const resetTimer = useCallback(() => {
    setSecondsRemaining(RESEND_COOLDOWN_SECONDS);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setSecondsRemaining((prev) => (prev <= 0 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      const chars = value.replace(/\D/g, "").slice(0, OTP_LENGTH).split("");
      const next = [...digits];
      chars.forEach((char, i) => {
        if (index + i < OTP_LENGTH) next[index + i] = char;
      });
      setDigits(next);
      const nextFocus = Math.min(index + chars.length, OTP_LENGTH - 1);
      inputRefs.current[nextFocus]?.focus();
      return;
    }
    const char = value.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[index] = char;
    setDigits(next);
    if (char && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    const chars = pasted.split("");
    const next = Array(OTP_LENGTH).fill("").map((_, i) => chars[i] ?? "");
    setDigits(next);
    const nextFocus = Math.min(pasted.length, OTP_LENGTH - 1);
    inputRefs.current[nextFocus]?.focus();
  };

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
          Code OTP
        </h1>
        <p className="mt-2 font-sana-regular text-black/90 text-base">
          Veuillez saisir le code OTP reçu par message sur votre adresse email
        </p>

        <form className="mt-8 flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col gap-2">
            <div className="flex gap-3 justify-center" onPaste={handlePaste}>
              {digits.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={OTP_LENGTH}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className={cn(
                    "h-12 w-12 rounded-xl border text-center text-lg font-semibold text-black",
                    "border-[#CCCCCC] bg-white focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                  )}
                  aria-label={`Chiffre ${index + 1} du code OTP`}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-1.5 text-sm">
            <span className="text-black">Pas encore reçu ?</span>
            <span className="text-muted-foreground">
              {formatCountdown(secondsRemaining)}
            </span>
            <button
              type="button"
              onClick={resetTimer}
              disabled={secondsRemaining > 0}
              className={cn(
                "font-medium",
                secondsRemaining > 0
                  ? "cursor-not-allowed text-muted-foreground"
                  : "text-primary hover:underline"
              )}
            >
              Renvoyez
            </button>
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
