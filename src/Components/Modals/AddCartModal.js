import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetCart, updateCart } from "../CartItem/cartSlice";
import { createOrder } from "../ProductLists/productSlice";

const AddToCartModal = ({ callModal, close, type, order }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const listCart = useSelector((state) => state.cart);
  const currentUser = useSelector((state) => state.user.login.user);
  const token = `Bear ${currentUser.accessToken}`;
  const statusCart = "completed";
  const cartId = listCart.fullCart._id;
  const cartItems = listCart.cart;
  const handleClose = () => {
    if (type === "payment") {
      const cartReset = [];
      dispatch(updateCart({ cartId, token, status: statusCart, cartItems }));
      dispatch(resetCart(cartReset));
      if (order !== null) {
        const user = {
          userId: currentUser._id,
          name: currentUser.userName,
        };
        const { purchase_units, status } = order;
        dispatch(createOrder({ user, purchase_units, status, token }));
      }
      navigate("/");
    } else {
      close();
    }
  };

  return (
    <Modal size="sm" show={callModal} onHide={close}>
      {type === "profile" ? (
        <Modal.Body>Thông tin đã được cập nhật!</Modal.Body>
      ) : type === "payment" ? (
        <Modal.Body> Đơn hàng đã được thanh toán!</Modal.Body>
      ) : type === "cancel" ? (
        <Modal.Body style={{ color: "red" }}> Giao dịch thất bại!</Modal.Body>
      ) : (
        <Modal.Body> Sản phẩm đã được thêm vào giỏ hàng!</Modal.Body>
      )}
      <Modal.Footer style={{ justifyContent: "center", borderTop: "none" }}>
        <Button variant="primary" onClick={handleClose}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddToCartModal;
