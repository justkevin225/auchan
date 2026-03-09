import { getStoreDetails } from "@/data/stores";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StoreDetailsContent } from "@/components/store-details/StoreDetailsContent";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const store = getStoreDetails(id);
  return {
    title: store ? `Auchan | ${store.storeName}` : "Auchan | Magasin",
  };
}

export default async function StorePage({ params }: Props) {
  const { id } = await params;
  const store = getStoreDetails(id);
  if (!store) notFound();

  return <StoreDetailsContent store={store} />;
}
