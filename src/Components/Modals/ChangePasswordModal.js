import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearUpdated, updatePassword } from "../User/userSlice";
import ConfirmModal from "./ConfirmModal";
import Spinner from "react-bootstrap/esm/Spinner";
const ChangePasswordModal = ({ callModal, close, userId, token }) => {
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [callModalConfirm, setCallModalConfirm] = useState(false);
  const updatePasswordData = useSelector((state) => state.user.updatePw);
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
  }, [updatePasswordData.user, close]);

  const handleUpdatePassword = () => {
    if (validateError(password, confirmPassword)) {
      dispatch(updatePassword({ userId, password, token }));
    }
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

  const validateError = (password, confirmPassword) => {
    let isError;
    //validate password
    if (password.length < 6) {
      const message = "Mật khẩu phải có ít nhất 6 ký tự";
      errors.password = message;
      setErrors({ ...errors });
      isError = false;
    } else if (password === "") {
      const message = "Mật khẩu không được bỏ trống";
      errors.password = message;
      setErrors({ ...errors });
      isError = false;
    } else {
      errors.password = "";
      setErrors({ ...errors });
      isError = true;
    }

    if (confirmPassword !== password) {
      const message = "Xác nhận mật khẩu phải trùng với mật khẩu";
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
              placeholder="Mật khẩu mới"
              aria-label="Mật khẩu mới"
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
              placeholder="Xác nhận mật khẩu"
              aria-label="Xác nhận mật khẩu"
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
          {updatePasswordData.isLoading ? (
            <div style={{ marginTop: "20px" }}>
              <Spinner animation="border" />
            </div>
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
      />
    </>
  );
};

export default ChangePasswordModal;
