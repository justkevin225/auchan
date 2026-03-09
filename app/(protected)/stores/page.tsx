import { StoresContent } from "@/components/stores/StoresContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auchan | Magasins",
};

export default function StoresPage() {
  return <StoresContent />;
}
