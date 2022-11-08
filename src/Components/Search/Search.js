import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { IoIosSearch } from "react-icons/io";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { searchOrder } from "../../reduxTK/orders/OrderSlice";
import { searchProduct } from "../../reduxTK/products/productSlice";
import { searchUser } from "../../reduxTK/user/userSlice";
import "./search.css";
const Search = () => {
  const [search, setSearch] = useState(null);
  const dispatch = useDispatch();
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (location.pathname === "/main/products") {
      dispatch(searchProduct(search));
    }
    if (location.pathname === "/main/users") {
      dispatch(searchUser(search));
    }
    if (location.pathname === "/main/orders") {
      dispatch(searchOrder(search));
    }
  };

  return (
    <Form onSubmit={handleSearch}>
      <Form.Group className="mb-3 search" controlId="formBasicEmail">
        <Form.Control
          type="text"
          placeholder="Enter search value"
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button variant="primary" type="submit">
          <IoIosSearch />
        </Button>
      </Form.Group>
    </Form>
  );
};

export default Search;
