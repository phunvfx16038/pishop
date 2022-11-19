import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearUpdated, updateUserPassword } from "../../reduxTK/auth/authSlice";
import ConfirmModal from "./ConfirmModal";
import { resetUpdatedData, updatePassword } from "../../reduxTK/user/userSlice";
import Spinner from "react-bootstrap/esm/Spinner";
const ChangePasswordModal = ({
  callModal,
  close,
  adminId,
  userId,
  token,
  type,
}) => {
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const [password, setPassword] = useState("");
  const [callModalConfirm, setCallModalConfirm] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState();
  const updatePasswordData = useSelector((state) => state.auth.updateUserPw);
  const updateLoginPassword = useSelector((state) => state.user.update);
  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });
  useEffect(() => {
    if (JSON.stringify(updatePasswordData.user) !== "{}") {
      close();
      setCallModalConfirm(true);
      clearUpdatePassword();
    }

    if (JSON.stringify(updateLoginPassword.user) !== "{}") {
      close();
      setCallModalConfirm(true);
      clearUpdatePassword();
    }
  }, [updatePasswordData.user, close, updateLoginPassword.user]);

  const handleUpdatePassword = () => {
    //type === admin then update password of login user
    if (type === "admin") {
      if (validateError(password, confirmPassword)) {
        dispatch(updatePassword({ userId, password, token }));
      }
    }
    //type === user then update password of other account
    if (type === "user") {
      if (validateError(password, confirmPassword)) {
        dispatch(updateUserPassword({ adminId, userId, password, token }));
      }
    }
  };

  const handleTogglePassword = () => {
    setToggle(!toggle);
  };

  const clearUpdatePassword = () => {
    if (type === "user") {
      setTimeout(() => {
        const clear = {};
        dispatch(clearUpdated(clear));
      }, "2000");
    }

    if (type === "admin") {
      setTimeout(() => {
        const clear = {};
        dispatch(resetUpdatedData(clear));
      }, "2000");
    }
  };

  const validateError = (password, confirmPassword) => {
    //validate password
    let isError = false;
    if (password === "") {
      const message = "Password can't be empty!";
      errors.password = message;
      setErrors({ ...errors });
    } else if (password.length < 6) {
      const message = "Name should have at least 6 characters!";
      errors.password = message;
      setErrors({ ...errors });
    } else {
      errors.password = "";
      setErrors({ ...errors });
      isError = true;
    }

    if (confirmPassword !== password) {
      const message = "ConfirmPassword must match password";
      errors.confirmPassword = message;
      setErrors({ ...errors });
      isError = false;
    } else {
      errors.confirmPassword = "";
      setErrors({ ...errors });
      isError = true;
    }
    return isError;
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
          <p className="error-message">{errors.password}</p>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Confirm Password"
              aria-label="Confirm Password"
              aria-describedby="basic-addon2"
              type={toggle ? "text" : "password"}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button
              variant="outline-secondary"
              id="button-addon2"
              onClick={handleTogglePassword}
            >
              {toggle ? <IoIosEyeOff /> : <IoIosEye />}
            </Button>
          </InputGroup>
          <p className="error-message">{errors.confirmPassword}</p>
        </Modal.Body>

        <Modal.Footer>
          {updatePasswordData.isLoading || updateLoginPassword.isLoading ? (
            <Spinner animation="border" role="status" />
          ) : (
            <Button variant="primary" onClick={handleUpdatePassword}>
              Submit
            </Button>
          )}
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
