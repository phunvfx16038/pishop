import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./login.css";
import Spinner from "react-bootstrap/Spinner";
import { loginUser } from "../Components/User/userSlice";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginInfor = useSelector((state) => state.user.login);

  useEffect(() => {
    if (JSON.stringify(loginInfor.user) !== "{}") {
      navigate("/");
    }
    // else if (JSON.stringify(loginInfor.user) === "{}") {
    //   setErrors((prev) => {
    //     return { ...prev, loginError: null };
    //   });
  }, [loginInfor.user, navigate]);

  const [formData, setFormdata] = useState({
    userName: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    userName: "",
    password: "",
    loginError: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    const key = e.target.name;
    formData[key] = value;
    setFormdata({ ...formData });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateError(formData)) {
      dispatch(loginUser(formData));
    }
  };

  const validateError = () => {
    let isError = true;
    //validate userName
    if (formData.userName === "") {
      const message = "UserName can't be empty!";
      errors.userName = message;
      setErrors({ ...errors });
      isError = false;
    } else {
      errors.userName = "";
      setErrors({ ...errors });
      isError = true;
    }

    //validate password
    if (formData.password.length < 6) {
      const message = "Name should have at least 6 characters!";
      errors.password = message;
      setErrors({ ...errors });
      isError = false;
    } else if (formData.password === "") {
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

  return (
    <div>
      {loginInfor.isError || errors.loginError ? (
        <p
          style={{
            color: "red",
            border: "1px solid red",
            width: "350px",
            padding: "10px",
            margin: "10px auto",
          }}
        >
          {loginInfor.isError || errors.loginError}
        </p>
      ) : (
        ""
      )}
      <Form className="form-user" onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>User Name</Form.Label>
          <Form.Control
            name="userName"
            type="text"
            value={formData.userName}
            onChange={handleChange}
          />
          <p className="error-message">{errors.userName}</p>
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          <p className="error-message">{errors.password}</p>
        </Form.Group>
        <Form.Group>
          {loginInfor.isLoading ? (
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
              Log in
            </Button>
          )}
        </Form.Group>
        <Form.Group>
          <Link to="/register">
            <p>Register new account!</p>
          </Link>
        </Form.Group>
      </Form>
    </div>
  );
};

export default Login;
