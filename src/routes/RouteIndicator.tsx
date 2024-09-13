import { Outlet, useLocation } from "react-router-dom";
import DesktopLayout from "@/layouts/DesktopLayout";

export default function RouteIndicator() {
  const { pathname } = useLocation();
  return <>{pathname !== "/guests" ? <DesktopLayout /> : <Outlet />}</>;
}
