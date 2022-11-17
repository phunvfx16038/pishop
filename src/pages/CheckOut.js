import { useSelector } from "react-redux";
import AddToCartModal from "../Components/Modals/AddCartModal";
import PaypalCheckoutButton from "../Components/PaypalCheckoutButton ";
import { useState } from "react";

const CheckOut = () => {
  const listCart = useSelector((state) => state.cart);
  const currentUser = useSelector((state) => state.user.login.user);
  const [callModal, setCallModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [order, setOrder] = useState({});
  const totalPrice = listCart.cart.reduce((result, current) => {
    return (result = result + parseFloat(current.price) * current.quantity);
  }, 0);

  const handleChangeStateModal = (value, type, orderData) => {
    setModalType(type);
    setCallModal(value);
    setOrder(orderData);
  };
  return (
    <div style={{ marginTop: "20px" }}>
      <PaypalCheckoutButton
        total={Math.round(totalPrice * 100) / 100}
        currentUser={currentUser}
        handleChangeStateModal={handleChangeStateModal}
        cartItems={listCart.cart}
      />
      <AddToCartModal
        callModal={callModal}
        close={() => setCallModal(false)}
        type={modalType}
        order={order}
      />
    </div>
  );
};

export default CheckOut;
