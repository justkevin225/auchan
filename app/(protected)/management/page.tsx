import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Auchan | Gestions",
};

export default function Management() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <Image
        src="/images/logo-icon.png"
        alt="Auchan"
        width={100}
        height={100}
      />
      <h1>Gestions</h1>
    </div>
  );
}
