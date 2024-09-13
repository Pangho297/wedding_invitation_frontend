import { RouterProvider } from "react-router-dom";
import router from "./routes";
import useAxiosInterceptor from "./hooks/useAxiosInterseptor";

export default function App() {
  useAxiosInterceptor();
  return <RouterProvider router={router} />;
}
