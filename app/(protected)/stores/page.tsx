import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Auchan | Magasins",
};

export default function Stores() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <Image
        src="/images/logo-mobile.png"
        alt="Auchan"
        width={100}
        height={100}
      />
      <h1>Magasins</h1>
    </div>
  );
}
