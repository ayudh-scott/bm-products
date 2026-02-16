import { createBrowserRouter } from "react-router";
import { CategoryList } from "./pages/CategoryList";
import { CategoryView } from "./pages/CategoryView";
import { ProductDetail } from "./pages/ProductDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: CategoryList,
  },
  {
    path: "/category/:category",
    Component: CategoryView,
  },
  {
    path: "/product/:id",
    Component: ProductDetail,
  },
]);
