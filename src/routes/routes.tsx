import { RouteObject } from "react-router-dom";

import Main from "@/pages/main";
import Story from "@/pages/story";
import Feed from "@/pages/feed";
import WritePost from "@/pages/write";
import Map from "@/pages/map";
import Donation from "@/pages/donation";
import Check from "@/pages/check";
import Guests from "@/pages/guests";
import RouteIndicator from "./RouteIndicator";

export const pages: RouteObject[] = [
  {
    element: <RouteIndicator />,
    children: [
      {
        path: "/",
        element: <Main />,
      },
      {
        path: "/story/:idx",
        element: <Story />,
      },
      {
        path: "/feed/:id",
        element: <Feed />,
      },
      {
        path: "/map",
        element: <Map />,
      },
      {
        path: "/donation",
        element: <Donation />,
      },
      {
        path: "/check",
        element: <Check />,
      },
      {
        path: "/write",
        element: <WritePost />,
      },
      {
        path: "/guests",
        element: <Guests />,
      },
    ],
  },
];
