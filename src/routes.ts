import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { Home } from "./components/sections/Home";
import { About } from "./components/sections/About";
import { Resume } from "./components/sections/Resume";
import { Portfolio } from "./components/sections/Portfolio";
import { Blog } from "./components/sections/Blog";
import { Contact } from "./components/sections/Contact";
import { SnakeArena } from "./components/sections/SnakeArena";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "resume", Component: Resume },
      { path: "portfolio", Component: Portfolio },
      { path: "blog", Component: Blog },
      { path: "contact", Component: Contact },
      { path: "snake", Component: SnakeArena },
    ],
  },
]);
