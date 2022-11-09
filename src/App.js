import "./App.css";
import Header from "./Components/Header/Header";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useEffect } from "react";
import { getProductSilder } from "./Components/ProductLists/productSlice";
import { useDispatch } from "react-redux";
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
import Orders from "./pages/Orders";
import UpdatePasswordPage from "./pages/ResetPassword/UpdateResetPassword";
import ResetPasswordPage from "./pages/ResetPassword/ResetPassword";
import OrderDatail from "./pages/OrderDetail";
import CheckOut from "./pages/CheckOut";

function App() {
  const dispatch = useDispatch();
  const PAYPAL_CLIENT_ID =
    "AVVMyuQbHTC0qUEMj0nb9aQwQgVDUzo6LUIM9Ahyj19dKydGPJtvI6XGbBNqp7tTdGl05PouvmZ5V3lG";
  useEffect(() => {
    dispatch(getProductSilder());
  }, [dispatch]);

  return (
    <PayPalScriptProvider options={{ "client-id": PAYPAL_CLIENT_ID }}>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/men" element={<Men />} />
          <Route path="/products/boy" element={<Boy />} />
          <Route path="/products/women" element={<Women />} />
          <Route path="/products/girl" element={<Girls />} />
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
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </PayPalScriptProvider>
  );
}

export default App;
