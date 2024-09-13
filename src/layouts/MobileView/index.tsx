import { ReactNode } from "react";

import "./style.scss";

export default function MobileView({ children }: { children: ReactNode }) {
  return <div className="mobile-container">{children}</div>;
}
