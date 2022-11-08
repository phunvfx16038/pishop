import "./header.css";
import Search from "../Search/Search";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useLocation } from "react-router-dom";
const Header = ({ currentUser }) => {
  const location = useLocation();

  const ShowSearch = () => {
    if (
      location.pathname === "/main/products" ||
      location.pathname === "/main/users" ||
      location.pathname === "/main/orders"
    ) {
      return <Search />;
    }
  };

  return (
    <Row
      style={{
        padding: "10px",
        backgroundColor: "white",
        margin: "0px -28px 0px -18px",
        alignItems: "center",
      }}
    >
      <Col xs={6}>
        <ShowSearch />
      </Col>
      <Col xs={6}>
        <div className="user-group">
          <p>{currentUser.userName}</p>
          <div className="user-image">
            <img
              alt="user"
              src={
                currentUser.image ||
                "https://cdn-icons-png.flaticon.com/512/219/219983.png"
              }
            />
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default Header;
