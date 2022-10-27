import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./profileCard.css";
import Spinner from "react-bootstrap/Spinner";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import storage from "../../firebase/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import AddToCartModal from "../Modals/AddCartModal";
import { updateMainAccount, updateUser } from "../User/userSlice";

const ProfileCard = ({ userDetail }) => {
  const [imageFile, setImageFile] = useState(null);
  const [duration, setDuration] = useState(null);
  const [callModal, setCallModal] = useState(false);
  const token = `Bear ${userDetail.accessToken}`;
  const registerInfor = useSelector((state) => state.user.register);
  const userUpdated = useSelector((state) => state.user.update);
  const dispatch = useDispatch();

  const [formData, setFormdata] = useState({
    userName: userDetail.userName,
    email: userDetail.email,
    image: userDetail.image,
    address: userDetail.address,
    phone: userDetail.phone,
    isAdmin: userDetail.isAdmin,
  });

  const [errors, setErrors] = useState({
    userName: "",
    email: "",
    image: "",
    address: "",
    phone: "",
    isAdmin: "",
  });

  const handleUpload = (e) => {
    setImageFile(e.target.files[0]);
    setFormdata((prev) => {
      return { ...prev, image: URL.createObjectURL(e.target.files[0]) };
    });
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
      const { _id } = userDetail;
      const newUpdateUser = { _id, ...formData };
      dispatch(updateUser({ token, id: _id, formData }));
      dispatch(updateMainAccount(newUpdateUser));
      if (userUpdated.user) {
        setCallModal(true);
      }
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
            console.log(downloadURL);
            return { ...prev, image: downloadURL };
          });
        });
      }
    );
  };
  return (
    <div className="wrapper-infor">
      <p className="small-title">Thông tin người dùng</p>
      <div className="information-user">
        <div className="avatar-user">
          <img
            src={
              formData.image ||
              "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
            }
            alt={formData.userName}
          />
        </div>
        <div className="detail-infor-user">
          <Form>
            <Form.Group>
              <Form.Label>Chọn hình ảnh</Form.Label>
              <Form.Control name="image" type="file" onChange={handleUpload} />
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

              {/* <p className="error-message">{errors.image}</p> */}
            </Form.Group>
          </Form>
        </div>
      </div>
      <div style={{ padding: "15px" }}>
        {/* <h1 style={{ textAlign: "center" }}>User Detail</h1> */}
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
        <Form
          onSubmit={handleSubmit}
          style={{ width: "560px", margin: "0px auto" }}
        >
          <Row>
            <Col>
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
              {/* <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
              />
              <p className="error-message">{errors.password}</p>
            </Form.Group> */}
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
              <Form.Group style={{ display: "none" }}>
                <Form.Label>Admin</Form.Label>
                <Col sm={12}>
                  <Form.Select
                    name="isAdmin"
                    type="select"
                    value={formData.isAdmin}
                    onChange={handleChange}
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
              <Spinner animation="border" style={{ alignItems: "center" }} />
            </div>
          ) : (
            <Button type="submit" color="success" style={{ marginTop: "20px" }}>
              Update
            </Button>
          )}
        </Form>
      </div>
      <AddToCartModal
        callModal={callModal}
        close={() => setCallModal(false)}
        type="profile"
      />
    </div>
  );
};

export default ProfileCard;
