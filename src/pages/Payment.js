import { Container, Row } from "reactstrap";
import { useState } from "react";
import CartItem from "../Components/CartItem/CartItem";
import { useSelector } from "react-redux";
import PaypalCheckoutButton from "../Components/PaypalCheckoutButton ";
import { Link } from "react-router-dom";
import AddCartModal from "../Components/Modals/AddCartModal";

const Payment = () => {
  const currentUser = useSelector((state) => state.user.login.user);
  const token = `Bear ${currentUser.accessToken}`;
  const listCart = useSelector((state) => state.cart);
  const cartId = listCart.fullCart._id;
  const statusCart = "completed";
  const [callModal, setCallModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const totalPrice = listCart.cart.reduce((result, current) => {
    const productPrice = current.price.replace(",", "");
    return (result = result + parseInt(productPrice) * current.quantity);
  }, 0);

  const handleChangeStateModal = (value, type) => {
    setModalType(type);
    setCallModal(value);
  };

  return (
    <Container>
      <div
        style={{ padding: "20px", backgroundColor: "aqua", margin: "15px 0" }}
      >
        Thông tin đơn hàng
      </div>
      <Row>
        {currentUser.accessToken !== undefined ? (
          <>
            <div
              style={{
                fontSize: "22px",
                fontWeight: "500",
                textAlign: "left",
              }}
            >
              <div>Khách hàng: {currentUser.userName}</div>
              <div>Địa chỉ: {currentUser.address}</div>
              <div>Số điện thoại: {currentUser.phone}</div>
            </div>
            <h4>Danh sục sản phẩm</h4>
            {listCart.cart.map((product) => (
              <CartItem
                product={product}
                key={product._id}
                quantity={product.quantity}
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
                Tổng giá tiền
              </h5>
              <p style={{ marginRight: "15px", fontSize: "18px" }}>
                ${totalPrice}
              </p>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <PaypalCheckoutButton
                total={totalPrice}
                cartId={cartId}
                token={token}
                statusCart={statusCart}
                cartItems={listCart.cart}
                currentUser={currentUser}
                handleChangeStateModal={handleChangeStateModal}
              />
            </div>
          </>
        ) : (
          <div style={{ margin: "30px 0" }}>
            Vui lòng đăng nhập <Link to="/login">tại đây</Link>.
          </div>
        )}
      </Row>
      <AddCartModal
        callModal={callModal}
        close={() => setCallModal(false)}
        type={modalType}
      />
    </Container>
  );
};

export default Payment;
