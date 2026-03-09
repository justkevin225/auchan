import { Metadata } from "next";

import { OtpForm } from "@/components/auth/OtpForm";

export const metadata: Metadata = {
  title: "Auchan | Code OTP",
};

export default function OtpPage() {
  return <OtpForm />;
}
