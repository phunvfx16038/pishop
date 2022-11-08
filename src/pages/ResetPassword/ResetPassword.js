import { useState } from "react";
import { resetPassword } from "../../reduxTK/auth/authSlice";
import { useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
const ResetPasswordPage = () => {
  const [email, setEmail] = useState(null);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
  });

  const validateError = (email) => {
    const reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
    let isError = true;
    if (reg.test(email) === false) {
      const message = "Email should be included @";
      errors.email = message;
      setErrors({ ...errors });
      isError = false;
    } else if (email === "") {
      const message = "Email can't be empty!";
      errors.email = message;
      setErrors({ ...errors });
      isError = false;
    } else {
      errors.email = "";
      setErrors({ ...errors });
      isError = true;
    }
    return isError;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateError(email)) {
      dispatch(resetPassword({ email }));
      setShow(true);
    }
  };
  return (
    <div>
      {show ? (
        <p>
          Vui lòng kiểm tra email để cập nhật mật khẩu.Nếu chưa nhận được email
          vui lòng nhấn lại nút bên dưới.
        </p>
      ) : (
        ""
      )}
      <Form className="form-user" onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            name="email"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className="error-message">{errors.email}</p>
        </Form.Group>

        <Form.Group>
          <Button color="success" type="submit" style={{ width: "100%" }}>
            Reset Password
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default ResetPasswordPage;
