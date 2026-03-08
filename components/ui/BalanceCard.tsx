'use client';

import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const BALANCE_PLACEHOLDER = '9 231 000';
const MASK_DOTS_COUNT = 8;
const AMOUNT_LOAD_DELAY_MS = 400;

export default function BalanceCard() {
  const [isBalanceVisible, setIsBalanceVisible] = useState(false);
  const [isAmountLoaded, setIsAmountLoaded] = useState(false);
  const [isAmountFadedIn, setIsAmountFadedIn] = useState(false);
  const [hoveredDot, setHoveredDot] = useState<number | null>(null);

  useEffect(() => {
    if (!isBalanceVisible) return;
    const t = setTimeout(() => setIsAmountLoaded(true), AMOUNT_LOAD_DELAY_MS);
    return () => clearTimeout(t);
  }, [isBalanceVisible]);

  useEffect(() => {
    if (!isAmountLoaded) return;
    const frame = requestAnimationFrame(() => setIsAmountFadedIn(true));
    return () => cancelAnimationFrame(frame);
  }, [isAmountLoaded]);

  const getDotScale = (index: number) => {
    if (hoveredDot === null) return 1;
    if (index === hoveredDot) return 1.35;
    if (index === hoveredDot - 1 || index === hoveredDot + 1) return 1.15;
    return 1;
  };

  return (
    <div
      className="relative max-h-[330px] w-full max-w-[350px] mx-auto bg-primary rounded-xl sm:rounded-2xl md:rounded-card overflow-hidden"
    >
      <Image
        src="/images/bird.png"
        alt=""
        width={657}
        height={532}
        draggable={false}
        onDragStart={(e) => e.preventDefault()}
        className="w-full h-full opacity-20 -translate-x-1/5 origin-top"
        aria-hidden
        role="presentation"
      />

      <header className="absolute left-[8vw] top-[7vw] xs:top-[8%] xs:left-[10%] flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <h2
            id="balance-card-title"
            className="text-white text-fluid-2xl font-sana-bold whitespace-nowrap"
          >
            Solde globale
          </h2>
          <button
            type="button"
            onClick={() => {
              const next = !isBalanceVisible;
              setIsBalanceVisible(next);
              if (!next) {
                setIsAmountLoaded(false);
                setIsAmountFadedIn(false);
              }
            }}
            className="w-[8vw] h-[8vw] max-w-10 max-h-10 bg-primary rounded-full relative cursor-pointer border-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
            aria-label={isBalanceVisible ? 'Masquer le solde' : 'Afficher le solde'}
            aria-pressed={isBalanceVisible}
          >
            <span
              className={`absolute w-2 h-2 xs:w-3 xs:h-3 sm:w-4 sm:h-4 bg-white rounded-full transition-all duration-200 ease-in-out ${isBalanceVisible ? 'bottom-0 left-0 translate-x-1/4 -translate-y-1/4' : 'top-0 right-0 -translate-x-1/4 translate-y-1/4'}`}
            />
          </button>
        </div>
        <p className="text-white text-fluid-base font-sana-regular max-w-[85%]">
          {isBalanceVisible
            ? 'Touchez l\'oeil pour masquer le solde'
            : 'Touchez l\'oeil pour afficher le solde'}
        </p>
      </header>

      <div className="absolute left-[8vw] xs:left-[10%] bottom-[7vw] xs:bottom-[8%]">
        {isBalanceVisible ? (
          <div className="min-h-7 sm:min-h-8 md:min-h-9 flex flex-col justify-center">
            {!isAmountLoaded ? (
              <Skeleton
                className="h-7 sm:h-8 md:h-9 w-28 sm:w-36 md:w-40 bg-white/30 rounded-lg"
                aria-hidden
              />
            ) : (
              <p
                className={`text-white text-3xl font-sana-heavy tabular-nums transition-opacity duration-200 ease-out ${isAmountFadedIn ? 'opacity-100' : 'opacity-0'}`}
              >
                {BALANCE_PLACEHOLDER}
              </p>
            )}
          </div>
        ) : (
          <div
            className="flex items-center gap-2 py-2 transition-opacity duration-200 ease-out opacity-100"
            role="img"
            aria-label="Solde masqué"
            onMouseLeave={() => setHoveredDot(null)}
          >
            {Array.from({ length: MASK_DOTS_COUNT }, (_, i) => (
              <span
                key={i}
                className="w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-full shrink-0 transition-transform duration-200 ease-out origin-center"
                style={{ transform: `scale(${getDotScale(i)})` }}
                onMouseEnter={() => setHoveredDot(i)}
              />
            ))}
          </div>
        )}
        <p className="text-white text-3xl font-sana-heavy mt-0.5">FCFA</p>
      </div>
    </div>
  );
}
