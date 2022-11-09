import { Container, Row, Button } from "reactstrap";
import CartItem from "../Components/CartItem/CartItem";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import AddCartModal from "../Components/Modals/AddCartModal";
import PaypalCheckoutButton from "../Components/PaypalCheckoutButton ";
import { updateCart } from "../Components/CartItem/cartSlice";
const Cart = () => {
  const listCart = useSelector((state) => state.cart);
  const currentUser = useSelector((state) => state.user.login.user);
  const token = `Bear ${currentUser.accessToken}`;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [callModal, setCallModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [order, setOrder] = useState({});
  const [show, setShow] = useState(true);

  //status of cart
  const status = "pending";
  const totalPrice = listCart.cart.reduce((result, current) => {
    return (result = result + parseFloat(current.price) * current.quantity);
  }, 0);

  const totalPriceFormatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Math.round(totalPrice * 100) / 100);

  const backToShopPing = () => {
    navigate("/");
  };

  const handleChangeStateModal = (value, type, orderData) => {
    setModalType(type);
    setCallModal(value);
    setOrder(orderData);
  };

  const handleCheckout = () => {
    const cartId = listCart.fullCart._id;
    dispatch(updateCart({ cartId, token, cartItems: listCart.cart, status }));
    // setShow(false);
    navigate("/checkout");
  };

  return (
    <Container>
      <div
        style={{ padding: "20px", backgroundColor: "aqua", margin: "15px 0" }}
      >
        Sản phẩm trong giỏ hàng ({listCart.cart.length})
      </div>
      {listCart.cart.length <= 0 ? (
        <Link to="/">Quay lại mua sắm</Link>
      ) : (
        <Row>
          {listCart.cart.map((product) => (
            <CartItem
              product={product}
              key={product._id}
              quantity={product.quantity}
              token={token}
              listCart={listCart}
            />
          ))}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              fontWeight: "600",
            }}
          >
            <h5 style={{ marginRight: "50px", color: "rgb(146, 141, 141)" }}>
              Thành tiền
            </h5>
            <p style={{ marginRight: "15px", fontSize: "18px" }}>
              {totalPriceFormatted}
            </p>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <Button color="success" onClick={backToShopPing}>
                Tiếp tục mua sắm
              </Button>
            </div>
            {show ? (
              <div>
                <Button color="success" onClick={handleCheckout}>
                  Thanh toán
                </Button>
              </div>
            ) : (
              <PaypalCheckoutButton
                total={Math.round(totalPrice * 100) / 100}
                currentUser={currentUser}
                handleChangeStateModal={handleChangeStateModal}
                cartItems={listCart.cart}
              />
            )}
          </div>
        </Row>
      )}
      <AddCartModal
        callModal={callModal}
        close={() => setCallModal(false)}
        type={modalType}
        order={order}
      />
    </Container>
  );
};

export default Cart;
