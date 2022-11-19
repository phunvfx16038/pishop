import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import { useMatch } from "react-router-dom";
import Sidebar from "./Components/Sidebar/Sidebar";
import Header from "./Components/Header/Header";
import DashBoard from "./pages/Dashboard/DashBoard";
import User from "./pages/User/User";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Register from "./pages/Register/Register";
import UpdataInfor from "./pages/User/UpdateInfor";
import { useSelector } from "react-redux";
import ProductsList from "./pages/Products/ProductsList";
import ProductDetail from "./pages/Products/ProductDetail";
import CreateProduct from "./pages/Products/CreateProduct";
import CreateUser from "./pages/User/CreateUser";
import OrderList from "./pages/Orders/OrderList";
import OrderDatail from "./pages/Orders/OrderDetail";
import Profile from "./pages/User/Profile";
import ResetPasswordPage from "./pages/ResetPassword/ResetPassword";
import UpdatePasswordPage from "./pages/ResetPassword/UpdateResetPassword";
import NotFound from "./NotFound/NotFound";

function App() {
  const isLoginRoute = useMatch("/");
  const isRegisterRoute = useMatch("/register");
  const currentUser = useSelector((state) => state.auth.login.user);

  return (
    <div>
      {isLoginRoute !== null ? (
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      ) : currentUser.isAdmin ? (
        <Container fluid style={{ backgroundColor: "#f8f9fc" }}>
          <Row>
            <Col xs={2} className="sidebar-wrapper">
              <Sidebar />
            </Col>
            <Col xs={10} className="page-content-wrapper">
              <Header currentUser={currentUser} />
              <Routes>
                <Route exact path="/main" element={<DashBoard />} />
                <Route exact path="/main/users" element={<User />} />
                <Route
                  exact
                  path="/main/user/createUser"
                  element={<CreateUser />}
                />
                <Route exact path="/main/products" element={<ProductsList />} />
                <Route
                  exact
                  path="/main/user/profile/:id"
                  element={<UpdataInfor />}
                />
                <Route
                  exact
                  path="/main/products/detail/:id"
                  element={<ProductDetail />}
                />
                <Route
                  exact
                  path="/main/products/newProduct"
                  element={<CreateProduct />}
                />
                <Route exact path="/main/orders" element={<OrderList />} />
                <Route
                  exact
                  path="/main/order/detail/:id"
                  element={<OrderDatail />}
                />
                <Route path="/main/profile" element={<Profile />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Col>
          </Row>
        </Container>
      ) : (
        <Routes>
          <Route exact path="/reset" element={<ResetPasswordPage />} />
          <Route path="/reset/:token" element={<UpdatePasswordPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
