import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Auchan | Login",
};

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <Image src="/images/logo-icon.png" alt="Auchan" width={100} height={100} />
      <h1>Login</h1>
      <Button asChild>
        <Link href="/dashboard">Aller au dashboard</Link>
      </Button>
    </div>
  );
}
