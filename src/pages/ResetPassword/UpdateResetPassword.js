import { useEffect, useState } from "react";
import {
  clearUpdated,
  updateResetPassword,
} from "../../reduxTK/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useLocation } from "react-router-dom";
import ConfirmModal from "../../Components/Modals/ConfirmModal";
import InputGroup from "react-bootstrap/InputGroup";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
const UpdatePasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [callModalConfirm, setCallModalConfirm] = useState(false);
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const pathname = location.pathname;
  const token = pathname.split("/")[2];
  const updatePasswordData = useSelector((state) => state.auth.updateUserPw);
  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (JSON.stringify(updatePasswordData.user) !== "{}") {
      setCallModalConfirm(true);
      clearUpdatePassword();
    }
  }, [updatePasswordData.user]);

  const handleTogglePassword = () => {
    setToggle(!toggle);
  };

  const clearUpdatePassword = () => {
    setTimeout(() => {
      const clear = {};
      dispatch(clearUpdated(clear));
    }, "2000");
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateError(password, confirmPassword)) {
      dispatch(updateResetPassword({ password, token }));
    }
  };
  return (
    <div>
      <Form className="form-user" onSubmit={handleSubmit}>
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
        <Form.Group>
          <Button color="success" type="submit" style={{ width: "100%" }}>
            Update New Password
          </Button>
        </Form.Group>
        <ConfirmModal
          callModal={callModalConfirm}
          close={() => setCallModalConfirm(false)}
          nameFile="resetPassword"
          type="UserReset"
        />
      </Form>
    </div>
  );
};

export default UpdatePasswordPage;
