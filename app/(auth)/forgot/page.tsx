import { Metadata } from "next";

import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Auchan | Mot de passe oublié",
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
