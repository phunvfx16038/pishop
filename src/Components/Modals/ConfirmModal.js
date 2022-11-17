import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ConfirmModal = ({ callModal, close }) => {
  const handleConfirm = () => {
    close();
  };

  return (
    <Modal show={callModal} onHide={close}>
      <Modal.Body>Mật khẩu đã được cập nhật!</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleConfirm}>
          Xác nhận
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;
