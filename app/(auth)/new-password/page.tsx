import { Metadata } from "next";

import { NewPasswordForm } from "@/components/auth/NewPasswordForm";

export const metadata: Metadata = {
  title: "Auchan | Nouveau mot de passe",
};

export default function NewPasswordPage() {
  return <NewPasswordForm />;
}
