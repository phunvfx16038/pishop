import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";

const CheckLoginModal = ({ callModal, close }) => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };
  return (
    <Modal size="sm" show={callModal} onHide={close}>
      <Modal.Body style={{ textAlign: "center" }}>Đi đến đăng nhập!</Modal.Body>
      <Modal.Footer style={{ justifyContent: "center", borderTop: "none" }}>
        <Button variant="primary" onClick={close}>
          Không
        </Button>
        <Button variant="danger" onClick={handleLogin}>
          Đăng nhập
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CheckLoginModal;
