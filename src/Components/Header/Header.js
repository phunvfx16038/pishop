//imports
import {
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
  UncontrolledDropdown,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { NavLink as NLink, useNavigate } from "react-router-dom";
import "./header.css";
import { IoMdCart, IoIosSearch, IoMdHome } from "react-icons/io";
import { IoPersonCircle } from "react-icons/io5";
import { logoutUser } from "../User/userSlice";
import { getCart, resetCart, updateCart } from "../CartItem/cartSlice";
import { searchProduct } from "../ProductLists/productSlice";

// Main Code
const Header = () => {
  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => setCollapsed(!collapsed);
  const currentUser = useSelector((state) => state.user.login.user);
  const listCart = useSelector((state) => state.cart);
  const userId = currentUser._id;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = `Bear ${currentUser.accessToken}`;
  const [search, setSearch] = useState(null);
  const [screen, setScreen] = useState(window.innerWidth);
  const user = {
    userId,
    name: currentUser.userName,
  };
  //status of cart
  const status = "pending";
  useEffect(() => {
    if (JSON.stringify(currentUser) !== "{}") {
      dispatch(getCart({ token, userId }));
    }
    setScreen(window.innerWidth);
  }, [dispatch, token, userId, currentUser]);

  const handleSearch = () => {
    dispatch(searchProduct(search));
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSearch();
    }
  };

  const handleUpdateCart = () => {
    const cartId = listCart.fullCart._id;
    dispatch(updateCart({ cartId, token, cartItems: listCart.cart, status }));
    navigate("/cart");
  };

  const handleLogout = () => {
    const resetUser = {};
    const cartReset = [];
    dispatch(updateCart({ user, token, cartItems: listCart }));
    dispatch(resetCart(cartReset));
    dispatch(logoutUser(resetUser));
    navigate("/");
  };
  return (
    <>
      {screen > 768 ? (
        <Navbar color="success" light expand={"lg"} dark={true} sticky="top">
          <NavbarBrand
            style={{ margin: "0px 20px 12px 20px", fontSize: "24px" }}
            to="/"
            tag={NLink}
          >
            <IoMdHome />
          </NavbarBrand>
          <NavbarToggler onClick={toggleNavbar} />
          <Collapse navbar isOpen={!collapsed}>
            <Nav className="me-auto" navbar>
              <NavItem>
                <NavLink to="/products/men" tag={NLink}>
                  Nam
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={NLink} to="/products/women">
                  Nữ
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={NLink} to="/products/boy">
                  Bé trai
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={NLink} to="/products/girl">
                  Bé gái
                </NavLink>
              </NavItem>
            </Nav>
            <Nav>
              <div className="search">
                <Input
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e)}
                />
                <span onClick={handleSearch}>
                  <IoIosSearch />
                </span>
              </div>
            </Nav>
            <Nav>
              <NavLink>
                <NavItem className="cart">
                  <IoMdCart
                    onClick={handleUpdateCart}
                    style={{ cursor: "pointer" }}
                  />

                  <span>{listCart.cart.length}</span>
                </NavItem>
              </NavLink>
              {JSON.stringify(currentUser) !== "{}" ? (
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav>
                    <div className="user-symbol">
                      <img src={currentUser.image} alt={currentUser.userName} />
                    </div>
                  </DropdownToggle>
                  <DropdownMenu end>
                    <DropdownItem>
                      <NLink to="/profile" style={{ color: "black" }}>
                        Hồ sơ
                      </NLink>
                    </DropdownItem>
                    <DropdownItem>
                      <NLink to="/orderList" style={{ color: "black" }}>
                        Đơn hàng
                      </NLink>
                    </DropdownItem>
                    <DropdownItem onClick={handleLogout}>
                      Đăng xuất
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              ) : (
                <NLink to="/login" style={{ margin: "8px 0 0 5px" }}>
                  <NavItem className="user">
                    <IoPersonCircle style={{ fontSize: "24px" }} />
                  </NavItem>
                </NLink>
              )}
            </Nav>
          </Collapse>
        </Navbar>
      ) : (
        <>
          <Navbar color="success" light dark={true} sticky="top">
            <Nav>
              <div className="search">
                <Input
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e)}
                />
                <span onClick={handleSearch}>
                  <IoIosSearch />
                </span>
              </div>
            </Nav>
            <Nav>
              <NavLink>
                <NavItem className="cart">
                  <IoMdCart
                    onClick={handleUpdateCart}
                    style={{ cursor: "pointer" }}
                  />

                  <span>{listCart.cart.length}</span>
                </NavItem>
              </NavLink>
              {JSON.stringify(currentUser) !== "{}" ? (
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav>
                    <div className="user-symbol">
                      <img src={currentUser.image} alt={currentUser.userName} />
                    </div>
                  </DropdownToggle>
                  <DropdownMenu end>
                    <DropdownItem>
                      <NLink to="/profile" style={{ color: "black" }}>
                        Hồ sơ
                      </NLink>
                    </DropdownItem>
                    <DropdownItem>
                      <NLink to="/orderList" style={{ color: "black" }}>
                        Đơn hàng
                      </NLink>
                    </DropdownItem>
                    <DropdownItem onClick={handleLogout}>
                      Đăng xuất
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              ) : (
                <NLink to="/login" style={{ margin: "8px 0 0 5px" }}>
                  <NavItem className="user">
                    <IoPersonCircle style={{ fontSize: "24px" }} />
                  </NavItem>
                </NLink>
              )}
            </Nav>
            <NavbarBrand
              style={{ margin: "0px 20px", fontSize: "24px" }}
              to="/"
              tag={NLink}
            >
              <IoMdHome />
            </NavbarBrand>
            <Nav className="me-auto">
              <NavLink
                to="/products/men"
                tag={NLink}
                style={{ color: "white" }}
              >
                Nam
              </NavLink>
              <NavLink
                tag={NLink}
                to="/products/women"
                style={{ color: "white" }}
              >
                Nữ
              </NavLink>
              <NavLink
                tag={NLink}
                to="/products/boy"
                style={{ color: "white" }}
              >
                Bé trai
              </NavLink>
              <NavLink
                tag={NLink}
                to="/products/girl"
                style={{ color: "white" }}
              >
                Bé gái
              </NavLink>
            </Nav>
          </Navbar>
        </>
      )}
    </>
  );
};

export default Header;
