// routes.ts
import { type RouteConfig, index } from "@react-router/dev/routes";
import Checkout from "./routes/checkout";

export default [
  index("routes/home.tsx"),
  {
    path: "/checkout",
    Component: Checkout, 
  },
] satisfies RouteConfig;
