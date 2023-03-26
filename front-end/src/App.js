import "./styles.css";
import { HelmetProvider } from "react-helmet-async";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Root from "./pages/Root";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/productDetails/productDetails";
import NotFound from "pages/NotFoundPage";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Home />} />
      <Route path="cart" element={<Cart />} />
      <Route path="productdetails/:id" element={<ProductDetails />} />
      <Route path="*" element={<NotFound />} />
      {/* ... etc. */}
    </Route>
  )
);

export default function App() {
  return (
    <HelmetProvider>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </HelmetProvider>
  );
}
