"use client"

import { useEffect, useRef } from "react";

export default function ScrollTo({ children }: React.PropsWithChildren) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  }, [ref]);

  return (
    <div ref={ref}>
      {children}
    </div>
  );
}