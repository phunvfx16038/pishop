import "./App.css";
import Header from "./Components/Header/Header";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useEffect } from "react";
import {
  getAllProducts,
  getProductSilder,
} from "./Components/ProductLists/productSlice";
import { useDispatch, useSelector } from "react-redux";
import Cart from "./pages/Cart";
import Men from "./pages/Men";
import Women from "./pages/Women";
import Boy from "./pages/Boy";
import Girls from "./pages/Girls";
import Profile from "./pages/Profile";
import NotFound from "./Components/NotFound/NotFound";
import "@splidejs/splide/css/core";
import Footer from "./Components/Footer";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import CheckOutAddress from "./pages/CheckoutAddress";
import OrderDatail from "./pages/OrderDatail";
import Orders from "./pages/Orders";
import UpdatePasswordPage from "./pages/ResetPassword/UpdateResetPassword";
import ResetPasswordPage from "./pages/ResetPassword/ResetPassword";

function App() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.product.items.products);
  const PAYPAL_CLIENT_ID =
    "AVVMyuQbHTC0qUEMj0nb9aQwQgVDUzo6LUIM9Ahyj19dKydGPJtvI6XGbBNqp7tTdGl05PouvmZ5V3lG";
  useEffect(() => {
    dispatch(getProductSilder());
    dispatch(getAllProducts());
  }, [dispatch]);

  const girlsProd = productList.filter((product) => {
    return product.categories === "girl";
  });

  const boyProd = productList.filter((product) => {
    return product.categories === "boy";
  });

  const menProd = productList.filter((product) => {
    return product.categories === "men";
  });

  const womenProd = productList.filter((product) => {
    return product.categories === "women";
  });

  return (
    <PayPalScriptProvider options={{ "client-id": PAYPAL_CLIENT_ID }}>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home productList={productList} />} />
          <Route path="/products/men" element={<Men menProd={menProd} />} />
          <Route path="/products/boy" element={<Boy boyProd={boyProd} />} />
          <Route
            path="/products/women"
            element={<Women womenProd={womenProd} />}
          />
          <Route
            path="/products/girl"
            element={<Girls girlsProd={girlsProd} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orderlist" element={<Orders />} />
          <Route path="/order/chekoutAddress" element={<CheckOutAddress />} />
          <Route path="/order/:id" element={<OrderDatail />} />
          <Route path="/reset" element={<ResetPasswordPage />} />
          <Route path="/reset/:token" element={<UpdatePasswordPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </PayPalScriptProvider>
  );
}

export default App;
