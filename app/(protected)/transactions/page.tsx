import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Auchan | Transactions",
};

export default async function Transactions() {
  await new Promise(resolve => setTimeout(resolve, 1000)); // intentionnelle
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <Image
        src="/images/logo-icon.png"
        alt="Auchan"
        width={100}
        height={100}
      />
      <h1>Transactions</h1>
    </div>
  );
}
