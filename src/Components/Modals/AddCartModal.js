import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetCart } from "../CartItem/cartSlice";

const AddToCartModal = ({ callModal, close, type }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClose = () => {
    if (type === "payment") {
      const cartReset = [];
      dispatch(resetCart(cartReset));
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
