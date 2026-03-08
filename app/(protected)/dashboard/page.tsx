import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Auchan | Dashboard",
};

export default async function Dashboard() {
  // await new Promise((r) => setTimeout(r, 3000));
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <Image
        src="/images/logo-mobile.png"
        alt="Auchan"
        width={100}
        height={100}
      />
      <h1>Tableau de bord</h1>
    </div>
  );
}
