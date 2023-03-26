import "./styles.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Root from "./pages/Root";
import Cart from "./pages/Cart";
import ProductDetails from './pages/productDetails/productDetails'
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Home />} />
      <Route path="cart" element={<Cart />} />
      <Route path="productdetails/:id" element={<ProductDetails />} />
      {/* ... etc. */}
    </Route>
  )
);

export default function App() {
  return (
    <div className="App">
     <RouterProvider router={router} />
    </div>
  );
}
