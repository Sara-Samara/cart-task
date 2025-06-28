import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/errorpage/ErrorPage";
import Register from "./pages/register/Register";
import SecondaryLayout from "./layout/SecondaryLayout";
import Login from "./pages/login/Login";
import ForgetPassword from "./pages/forgetpassword/ForgetPassword";
import VerificationPage from "./pages/validate/VerificationPage";
import NewPassword from "./pages/newpassword/NewPassword";
import Home from "./pages/home/Home";
import MainLayout from "./layout/MainLayout";
import Catgories from "./component/catgories/Catgories";
import ProductDetails from "./pages/productDetails/ProductDetails";
import Cart from "./pages/cart/Cart";
import Product from "./component/product/Product"; // انتبهي لحرف P

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "categories", element: <Catgories /> },
      { path: "product", element: <Product /> }, // ✅ أضفنا الفاصلة
      { path: "productDetails/:id", element: <ProductDetails /> },
      { path: "cart", element: <Cart /> },
    ],
  },
  {
    element: <SecondaryLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "forgot-password", element: <ForgetPassword /> },
      { path: "validate", element: <VerificationPage /> },
      { path: "new-password", element: <NewPassword /> },
    ],
  },
]);

export default router;
