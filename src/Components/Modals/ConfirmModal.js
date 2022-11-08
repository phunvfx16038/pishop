import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";

const ConfirmModal = ({ callModal, close, nameFile, type }) => {
  const navigate = useNavigate();
  const handleConfirm = () => {
    if (nameFile === "Product") {
      navigate("/main/products");
      close();
    }
    if (nameFile === "User") {
      navigate("/main/users");
      close();
    }
  };

  return (
    <Modal show={callModal} onHide={close}>
      {type === "update" ? (
        <Modal.Body>{nameFile} has been updated</Modal.Body>
      ) : (
        <Modal.Body>{nameFile} has been created</Modal.Body>
      )}
      <Modal.Footer>
        <Button variant="primary" onClick={handleConfirm}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;
