import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import storage from "../../firebase/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { postRegisterUser } from "../../reduxTK/auth/authSlice";
import ConfirmModal from "../../Components/Modals/ConfirmModal";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
const CreateUser = () => {
  const dispatch = useDispatch();
  const registerInfor = useSelector((state) => state.auth.register);
  const [callModal, setCallModal] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [duration, setDuration] = useState(null);

  const [formData, setFormdata] = useState({
    userName: "",
    email: "",
    image: "",
    address: "",
    phone: "",
    isAdmin: false,
  });

  const [errors, setErrors] = useState({
    userName: "",
    email: "",
    image: "",
    address: "",
    phone: "",
    isAdmin: "",
  });

  useEffect(() => {
    if (JSON.stringify(registerInfor.user) !== "{}") {
      setCallModal(true);
    }
  }, [registerInfor.user]);

  const upload = () => {
    if (imageFile === null) return;
    const imageRef = ref(storage, `images/${imageFile.name}`);
    const uploadTask = uploadBytesResumable(imageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setDuration(progress);
      },
      (err) => {
        console.log(err);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormdata((prev) => {
            console.log(downloadURL);
            return { ...prev, image: downloadURL };
          });
        });
      }
    );
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const key = e.target.name;
    formData[key] = value;
    setFormdata({ ...formData });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateError(formData);
    if (validateError(formData)) {
      dispatch(postRegisterUser(formData));
    }
  };

  const validateError = (formData) => {
    const reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
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

    //validate email
    if (reg.test(formData.email) === false) {
      const message = "Email should be included @";
      errors.email = message;
      setErrors({ ...errors });
      isError = false;
    } else if (formData.email === "") {
      const message = "Email can't be empty!";
      errors.email = message;
      setErrors({ ...errors });
      isError = false;
    } else {
      errors.email = "";
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
    //validate image
    if (formData.image === "") {
      const message = "Image can't be empty!";
      errors.image = message;
      setErrors({ ...errors });
      isError = false;
    } else {
      errors.image = "";
      setErrors({ ...errors });
      isError = true;
    }
    //validate address
    if (formData.address === "") {
      const message = "Address can't be empty!";
      errors.address = message;
      setErrors({ ...errors });
      isError = false;
    } else {
      errors.address = "";
      setErrors({ ...errors });
      isError = true;
    }

    //validate phone
    if (formData.phone === "") {
      const message = "Phone number can't be empty!";
      errors.phone = message;
      setErrors({ ...errors });
      isError = false;
    } else if (isNaN(formData.phone)) {
      const message = "Phone number must be number!";
      errors.phone = message;
      setErrors({ ...errors });
      isError = false;
    } else {
      errors.phone = "";
      setErrors({ ...errors });
      isError = true;
    }
    return isError;
  };
  return (
    <div style={{ padding: "15px" }}>
      <h1 style={{ textAlign: "center" }}>Create User</h1>
      {registerInfor.isError ? (
        <p
          style={{
            color: "red",
            border: "1px solid red",
            width: "350px",
            padding: "10px",
            margin: "10px auto",
          }}
        >
          {registerInfor.isError}
        </p>
      ) : (
        ""
      )}
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col sm="6">
            <Form.Group>
              <Form.Label>UserName</Form.Label>
              <Form.Control
                name="userName"
                type="text"
                onChange={handleChange}
              />
              <p className="error-message">{errors.userName}</p>
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control name="email" type="email" onChange={handleChange} />
              <p className="error-message">{errors.email}</p>
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                onChange={handleChange}
              />
              <p className="error-message">{errors.password}</p>
            </Form.Group>
            <Form.Group>
              <Form.Label>Image</Form.Label>
              <Form.Control
                name="image"
                type="file"
                onChange={(e) => setImageFile(e.target.files[0])}
              />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: "10px",
                }}
              >
                <Button onClick={upload}>Upload Image</Button>
                {duration === 0 ? (
                  <Spinner animation="border" role="status" />
                ) : duration === 100 ? (
                  <IoIosCheckmarkCircleOutline
                    style={{ width: "25px", height: "25px", color: "green" }}
                  />
                ) : (
                  ""
                )}
              </div>
              <p className="error-message">{errors.image}</p>
            </Form.Group>
          </Col>
          <Col sm="6">
            <Form.Group>
              <Form.Label>Address</Form.Label>
              <Form.Control
                name="address"
                type="text"
                onChange={handleChange}
              />
              <p className="error-message">{errors.address}</p>
            </Form.Group>
            <Form.Group>
              <Form.Label>Phone</Form.Label>
              <Form.Control name="phone" type="text" onChange={handleChange} />
              <p className="error-message">{errors.phone}</p>
            </Form.Group>
            <Form.Group>
              <Form.Label>Admin</Form.Label>
              <Col sm={12}>
                <Form.Select
                  name="isAdmin"
                  type="select"
                  onChange={handleChange}
                  value={formData.isAdmin}
                >
                  <option value="false">False</option>
                  <option value="true">True </option>
                </Form.Select>
              </Col>
            </Form.Group>
          </Col>
        </Row>
        {registerInfor.isLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "20px 0px 10px 0px",
            }}
          >
            <Spinner animation="border" role="status" />
          </div>
        ) : (
          <Button type="submit" color="success" style={{ marginTop: "20px" }}>
            Create
          </Button>
        )}
      </Form>
      <ConfirmModal
        callModal={callModal}
        close={() => setCallModal(false)}
        nameFile="User"
        type="create"
      />
    </div>
  );
};

export default CreateUser;
