import { useState } from "react";
import { updateResetPassword } from "../../reduxTK/auth/authSlice";
import { useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useLocation, useNavigate } from "react-router-dom";
const UpdatePasswordPage = () => {
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();
  const pathname = location.pathname;
  const token = pathname.split("/")[2];
  //   const resetData = useSelector((state) => state.auth.resetPw)
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    password: "",
  });
  const validateError = (password) => {
    let isError = true;
    if (password.length < 6) {
      const message = "Name should have at least 6 characters!";
      errors.password = message;
      setErrors({ ...errors });
      isError = false;
    } else if (password === "") {
      const message = "Password can't be empty!";
      errors.password = message;
      setErrors({ ...errors });
      isError = false;
    } else {
      errors.password = "";
      setErrors({ ...errors });
      isError = true;
    }
    return isError;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateError(password)) {
      dispatch(updateResetPassword({ password, token }));
      navigate("/");
    }
  };
  return (
    <div>
      <Form className="form-user" onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>New Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="error-message">{errors.password}</p>
        </Form.Group>

        <Form.Group>
          <Button color="success" type="submit" style={{ width: "100%" }}>
            Update New Password
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default UpdatePasswordPage;
