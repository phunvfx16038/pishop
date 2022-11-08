import Nav from "react-bootstrap/Nav";
import {
  IoIosSpeedometer,
  IoIosArchive,
  IoIosBasket,
  IoIosPerson,
  IoIosLogOut,
  IoIosPaper,
} from "react-icons/io";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../reduxTK/auth/authSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    const reset = {};
    dispatch(logoutUser(reset));
    navigate("/");
  };
  return (
    <Nav
      variant="pills"
      justify
      className="col-md-12 d-none d-md-block sidebar"
      defaultActiveKey="/main"
      style={{ width: "15%", backgroundColor: "#4e73df" }}
    >
      <div className="admin-header">
        <h3>Admin</h3>
      </div>
      <div className="sidebar-sticky"></div>
      <div className="mb-2 mx-2">
        Main
        <Nav.Item className="navItem">
          <Nav.Link
            as={Link}
            style={{ color: "white", marginTop: "10px" }}
            to="/main"
            eventKey="/main"
          >
            <span style={{ marginRight: "15px" }}>
              <IoIosSpeedometer style={{ marginBottom: "5px" }} />
            </span>
            Dashboard
          </Nav.Link>
        </Nav.Item>
      </div>
      <div className="mb-2 mx-2">
        Lists
        <Nav.Item className="navItem">
          <Nav.Link
            as={Link}
            to="/main/products"
            style={{ color: "white", marginTop: "10px" }}
            eventKey="products"
          >
            <span style={{ marginRight: "15px" }}>
              <IoIosArchive style={{ marginBottom: "5px" }} />
            </span>
            Products
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="navItem">
          <Nav.Link
            as={Link}
            to="/main/orders"
            style={{ color: "white" }}
            eventKey="orders"
          >
            <span style={{ marginRight: "15px" }}>
              <IoIosBasket style={{ marginBottom: "5px" }} />
            </span>
            Orders
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="navItem">
          <Nav.Link
            as={Link}
            to="/main/users"
            style={{ color: "white" }}
            eventKey="users"
          >
            <span style={{ marginRight: "15px" }}>
              <IoIosPerson style={{ marginBottom: "5px" }} />
            </span>
            Users
          </Nav.Link>
        </Nav.Item>
      </div>
      <div className="mb-2 mx-2">
        User
        <Nav.Item className="navItem">
          <Nav.Link
            as={Link}
            to="/main/profile"
            style={{ color: "white", marginTop: "10px" }}
            eventKey="/main/profile"
          >
            <span style={{ marginRight: "15px" }}>
              <IoIosPaper style={{ marginBottom: "5px" }} />
            </span>
            Profile
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="navItem" onClick={handleLogout}>
          <Nav.Link style={{ color: "white" }} eventKey="/logout">
            <span style={{ marginRight: "15px" }}>
              <IoIosLogOut style={{ marginBottom: "5px" }} />
            </span>
            Log out
          </Nav.Link>
        </Nav.Item>
      </div>
    </Nav>
  );
};

export default Sidebar;
