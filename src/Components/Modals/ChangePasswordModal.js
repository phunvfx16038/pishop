import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearUpdated, updateUserPassword } from "../../reduxTK/auth/authSlice";
import ConfirmModal from "./ConfirmModal";
const ChangePasswordModal = ({ callModal, close, adminId, userId, token }) => {
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const [password, setPassword] = useState();
  const [callModalConfirm, setCallModalConfirm] = useState(false);
  const updatePassword = useSelector((state) => state.auth.updateUserPw);
  useEffect(() => {
    if (JSON.stringify(updatePassword.user) !== "{}") {
      close();
      setCallModalConfirm(true);
      clearUpdatePassword();
    }
  }, [updatePassword.user, close]);

  const handleUpdatePassword = () => {
    dispatch(updateUserPassword({ adminId, userId, password, token }));
  };

  const handleTogglePassword = () => {
    setToggle(!toggle);
  };

  const clearUpdatePassword = () => {
    setTimeout(() => {
      const clear = {};
      dispatch(clearUpdated(clear));
    }, "5000");
  };
  return (
    <>
      <Modal show={callModal} onHide={close}>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="New Password"
              aria-label="New Password"
              aria-describedby="basic-addon2"
              type={toggle ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              variant="outline-secondary"
              id="button-addon2"
              onClick={handleTogglePassword}
            >
              {toggle ? <IoIosEyeOff /> : <IoIosEye />}
            </Button>
          </InputGroup>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={handleUpdatePassword}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      <ConfirmModal
        callModal={callModalConfirm}
        close={() => setCallModalConfirm(false)}
        nameFile="User"
        type="update"
      />
    </>
  );
};

export default ChangePasswordModal;
