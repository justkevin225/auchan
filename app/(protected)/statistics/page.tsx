import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Auchan | Statistiques",
};

export default function Statistics() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <Image
        src="/images/logo-icon.png"
        alt="Auchan"
        width={100}
        height={100}
      />
      <h1>Statistiques</h1>
    </div>
  );
}
