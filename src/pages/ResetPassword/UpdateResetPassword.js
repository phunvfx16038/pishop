import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useLocation } from "react-router-dom";
import { updateResetPassword } from "../../Components/User/userSlice";
import AddToCartModal from "../../Components/Modals/AddCartModal";
import Spinner from "react-bootstrap/Spinner";
const UpdatePasswordPage = () => {
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();
  const pathname = location.pathname;
  const [callModal, setCallModal] = useState(false);
  const token = pathname.split("/")[2];
  const resetData = useSelector((state) => state.user.resetPw);
  const [errors, setErrors] = useState({
    password: "",
  });
  console.log(resetData);
  useEffect(() => {
    if (JSON.stringify(resetData.user) !== "{}") {
      setCallModal(true);
    }
  }, [resetData.user]);
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
          {resetData.isLoading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "20px 0px 10px 0px",
              }}
            >
              <Spinner animation="border" style={{ alignItems: "center" }} />
            </div>
          ) : (
            <Button color="success" type="submit" style={{ width: "100%" }}>
              Update New Password
            </Button>
          )}
        </Form.Group>
      </Form>
      <AddToCartModal
        callModal={callModal}
        close={() => setCallModal(false)}
        order={null}
        type="resetPassword"
      />
    </div>
  );
};

export default UpdatePasswordPage;
