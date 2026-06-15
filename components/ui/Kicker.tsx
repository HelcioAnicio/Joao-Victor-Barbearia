import { ReactNode } from "react";

export function Kicker({ children }: { children: ReactNode }) {
  return <div className="djv-kicker">{children}</div>;
}
