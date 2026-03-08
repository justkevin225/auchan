import Image from "next/image";

import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-9999 flex flex-col items-center justify-center gap-3 backdrop-blur-sm">
      <Image
        src="/images/logo-icon.png"
        alt=""
        width={120}
        height={48}
        className="h-12 w-auto"
      />

      <div className="flex items-center gap-2">
        <Spinner className="size-6 text-primary" />
        <p className="text-sm text-muted-foreground">Un instant...</p>

      </div>
    </div>
  );
}
