import { Metadata } from "next";
import Image from "next/image";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return { title: `Auchan | Magasin ${id}` };
}

export default async function StorePage({ params }: Props) {
  const { id } = await params;
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <Image
        src="/images/logo-icon.png"
        alt="Auchan"
        width={100}
        height={100}
      />
      <h1>Magasin {id}</h1>
    </div>
  );
}
