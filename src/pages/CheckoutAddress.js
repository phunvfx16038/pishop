import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { updateMainAccount, updateUser } from "../Components/User/userSlice";
import { createOrder } from "../Components/ProductLists/productSlice";
const CheckOutAddress = () => {
  const currentUser = useSelector((state) => state.user.login.user);
  const cart = useSelector((state) => state.cart.cart);
  const [address, setAddress] = useState(currentUser.address);
  const [phone, setPhone] = useState(currentUser.phone);
  const token = `Bear ${currentUser.accessToken}`;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    address: "",
    phone: "",
  });

  const validateError = (address, phone) => {
    let isError = true;
    //validate address
    if (address === "") {
      const message = "Địa chỉ không được để trống!";
      errors.address = message;
      setErrors({ ...errors });
      isError = false;
    } else {
      errors.address = "";
      setErrors({ ...errors });
      isError = true;
    }

    //validate phone
    if (phone === "") {
      const message = "Số điện thoại không được để trống!";
      errors.phone = message;
      setErrors({ ...errors });
      isError = false;
    } else if (isNaN(phone)) {
      const message = "Số điện thoại phải có dạng số!";
      errors.phone = message;
      setErrors({ ...errors });
      isError = false;
    } else {
      errors.phone = "";
      setErrors({ ...errors });
      isError = true;
    }
    return isError;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateError(address, phone);
    if (validateError) {
      const { _id } = currentUser;
      const newInfor = { _id, ...currentUser, address, phone };
      const totalPrice = cart.reduce((result, current) => {
        const productPrice = current.price.replace(",", "");
        return (result = result + parseInt(productPrice) * current.quantity);
      }, 0);
      const newOrder = {
        user: {
          userId: _id,
          name: currentUser.userName,
        },
        orderItems: cart,
        totalPrice: totalPrice,
        address: address,
        status: false,
      };
      dispatch(createOrder({ token, newOrder }));
      dispatch(updateUser({ token, id: _id, newInfor }));
      dispatch(updateMainAccount(newInfor));
      navigate("/order/payment");
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          {currentUser.accessToken !== undefined ? (
            <Form
              style={{ width: "50%", margin: "20px auto" }}
              onSubmit={handleSubmit}
            >
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Địa chỉ nhận</Form.Label>
                <Form.Control
                  type="text"
                  value={address}
                  placeholder="Nhập địa chỉ"
                  onChange={(e) => setAddress(e.target.value)}
                />
                <p className="error-message" style={{ textAlign: "left" }}>
                  {errors.address}
                </p>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Số điện thoại</Form.Label>
                <Form.Control
                  value={phone}
                  type="text"
                  placeholder="Số điện thoại"
                  onChange={(e) => setPhone(e.target.value)}
                />
                <p className="error-message" style={{ textAlign: "left" }}>
                  {errors.phone}
                </p>
              </Form.Group>
              <Button variant="primary" type="submit" style={{ width: "100%" }}>
                Xác nhận
              </Button>
            </Form>
          ) : (
            <div style={{ margin: "30px 0" }}>
              Vui lòng đăng nhập <Link to="/login">tại đây</Link>.
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default CheckOutAddress;
