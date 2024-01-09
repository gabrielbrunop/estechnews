"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";

type Props = React.PropsWithChildren<{
  redirectWaitTime?: number
}>

export default function TimeRedirect({ children, redirectWaitTime=0 }: Props) {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => router.push("/"), redirectWaitTime);
  }, [router]);

  return (
    <div>
      {children}
    </div>
  );
}