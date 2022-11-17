import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteManyProducts,
  deleteProduct,
  deleteProductAction,
  deleteProducts,
} from "../../reduxTK/products/productSlice";
import {
  deleteManyUsers,
  deleteUser,
  deleteUserAction,
  deleteUsers,
} from "../../reduxTK/user/userSlice";

const AddCartModal = ({ callModal, close, token, id, nameFile }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.login.user);

  const handleDelete = () => {
    if (nameFile === "user") {
      dispatch(deleteUser({ token, id }));
      dispatch(deleteUserAction({ token, id }));
      close();
    }
    if (nameFile === "manyUser") {
      dispatch(
        deleteUsers({ token, idList: id, isAdmin: currentUser.isAdmin })
      );
      dispatch(deleteManyUsers(id));
      close();
    }
    if (nameFile === "product") {
      dispatch(deleteProduct({ token, id }));
      dispatch(deleteProductAction({ token, id }));
      close();
    }
    if (nameFile === "manyProduct") {
      dispatch(
        deleteProducts({ token, idList: id, isAdmin: currentUser.isAdmin })
      );
      dispatch(deleteManyProducts(id));
      close();
    }
  };
  return (
    <Modal show={callModal} onHide={close}>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>Do you want to delete {nameFile}?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={close}>
          No
        </Button>
        <Button variant="primary" onClick={handleDelete}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddCartModal;
