import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import storage from "../../firebase/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useLocation, useParams } from "react-router-dom";
import { updateUser } from "../../reduxTK/user/userSlice";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import ConfirmModal from "../../Components/Modals/ConfirmModal";
import ChangePasswordModal from "../../Components/Modals/ChangePasswordModal";

const UpdataInfor = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.login.user);
  const token = `Bear ${currentUser.accessToken}`;
  const registerInfor = useSelector((state) => state.auth.register);
  const [callModal, setCallModal] = useState(false);
  const [callModalChangePassword, setCallModalChangePassword] = useState(false);
  const userUpdated = useSelector((state) => state.user.update);
  const param = useParams();
  const userId = param.id;
  const location = useLocation();
  const detailUser = location.state.user;
  const [duration, setDuration] = useState(null);

  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormdata] = useState({
    userName: detailUser.userName,
    email: detailUser.email,
    image: detailUser.image,
    address: detailUser.address,
    phone: detailUser.phone,
    isAdmin: detailUser.isAdmin,
  });

  const [errors, setErrors] = useState({
    userName: "",
    email: "",
    image: "",
    address: "",
    phone: "",
    isAdmin: "",
  });

  const validateError = (formData) => {
    const reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
    let isError;
    let error = {
      userName: "",
      email: "",
      phone: "",
      address: "",
      image: "",
    };
    //validate userName
    if (formData.userName === "") {
      isError = true;
      const message = "UserName can't be empty!";
      errors.userName = message;
      setErrors({ ...errors });
      error.userName = false;
    } else {
      errors.userName = "";
      setErrors({ ...errors });
      error.userName = true;
    }

    //validate email
    if (formData.email === "") {
      const message = "Email can't be empty!";
      errors.email = message;
      setErrors({ ...errors });
      error.email = false;
    } else if (reg.test(formData.email) === false) {
      const message = "Email should be included @";
      errors.email = message;
      setErrors({ ...errors });
      error.email = false;
    } else {
      errors.email = "";
      setErrors({ ...errors });
      error.email = true;
    }
    //validate image
    if (formData.image === "") {
      const message = "Image can't be empty!";
      errors.image = message;
      setErrors({ ...errors });
      error.image = false;
    } else {
      errors.image = "";
      setErrors({ ...errors });
      error.image = true;
    }
    //validate address
    if (formData.address === "") {
      const message = "Address can't be empty!";
      errors.address = message;
      setErrors({ ...errors });
      error.address = false;
    } else {
      errors.address = "";
      setErrors({ ...errors });
      error.address = true;
    }

    //validate phone
    if (formData.phone === "") {
      const message = "Phone number can't be empty!";
      errors.phone = message;
      setErrors({ ...errors });
      error.phone = false;
    } else if (isNaN(formData.phone)) {
      const message = "Phone number must be number!";
      errors.phone = message;
      setErrors({ ...errors });
      error.phone = false;
    } else {
      errors.phone = "";
      setErrors({ ...errors });
      error.phone = true;
    }
    if (
      error.address === false ||
      error.userName === false ||
      error.email === false ||
      error.image === false ||
      error.phone === false
    ) {
      isError = false;
    } else {
      isError = true;
    }

    return isError;
  };
  const handleChangePassword = () => {
    setCallModalChangePassword(true);
  };

  useEffect(() => {
    // const checkData = validateError(formData);
    // console.log(checkData);
    if (JSON.stringify(userUpdated.user) !== "{}") {
      setCallModal(true);
    }
  }, [userUpdated.user]);
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
        console.log("Upload is " + progress + "% done");
      },
      (err) => {
        console.log(err);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormdata((prev) => {
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
      dispatch(updateUser({ token, id: userId, formData }));
    }
  };
  return (
    <div style={{ padding: "15px" }}>
      <h1 style={{ textAlign: "center" }}>User Detail</h1>
      {/* {registerInfor.isError ? (
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
      )} */}
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col sm="6">
            <Form.Group>
              <Form.Label>UserName</Form.Label>
              <Form.Control
                name="userName"
                type="text"
                onChange={handleChange}
                value={formData.userName}
              />
              <p className="error-message">{errors.userName}</p>
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
              <p className="error-message">{errors.email}</p>
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
                value={formData.address}
                onChange={handleChange}
              />
              <p className="error-message">{errors.address}</p>
            </Form.Group>
            <Form.Group>
              <Form.Label>Phone</Form.Label>
              <Form.Control
                name="phone"
                type="text"
                value={formData.phone}
                onChange={handleChange}
              />
              <p className="error-message">{errors.phone}</p>
            </Form.Group>
            <Form.Group>
              <Form.Label>Admin</Form.Label>
              <Col sm={12}>
                <Form.Select
                  name="isAdmin"
                  type="select"
                  value={formData.isAdmin}
                  onChange={handleChange}
                  disabled={detailUser.isAdmin ? true : false}
                >
                  <option value="false">False</option>
                  <option value="true">True </option>
                </Form.Select>
              </Col>
              <Button
                onClick={handleChangePassword}
                style={{ marginTop: "10px" }}
              >
                Change Password
              </Button>
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
            <Spinner animation="border" style={{ alignItems: "center" }} />
          </div>
        ) : (
          <Button type="submit" color="success" style={{ marginTop: "20px" }}>
            Update
          </Button>
        )}
      </Form>
      <ConfirmModal
        callModal={callModal}
        close={() => setCallModal(false)}
        nameFile="User"
        type="update"
      />
      <ChangePasswordModal
        callModal={callModalChangePassword}
        close={() => setCallModalChangePassword(false)}
        adminId={currentUser._id}
        userId={userId}
        token={token}
        type="user"
      />
    </div>
  );
};

export default UpdataInfor;
