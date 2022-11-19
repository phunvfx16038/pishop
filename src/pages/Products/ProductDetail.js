import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import storage from "../../firebase/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useLocation, useParams } from "react-router-dom";
import { updateProduct } from "../../reduxTK/products/productSlice";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import Spinner from "react-bootstrap/Spinner";
import ConfirmModal from "../../Components/Modals/ConfirmModal";
const ProductDetail = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.login.user);
  const updatedProduct = useSelector((state) => state.product.update);
  const token = `Bear ${currentUser.accessToken}`;
  const param = useParams();
  const userId = param.id;
  const location = useLocation();
  const detailProduct = location.state.product;
  const [callModal, setCallModal] = useState(false);
  const [durationImageList, setDurationImageList] = useState(null);
  const [durationThumbnail, setDurationThumbnail] = useState(null);

  const [imageFile, setImageFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);

  const categoriesList = ["men", "women", "boy", "girl"];

  const [formData, setFormdata] = useState({
    title: detailProduct.title,
    price: detailProduct.price,
    description: detailProduct.description,
    tutorial: detailProduct.tutorial,
    imageUrl: detailProduct.imageUrl,
    size: detailProduct.size,
    categories: detailProduct.categories,
    thumbnail: detailProduct.thumbnail,
  });

  const [errors, setErrors] = useState({
    title: "",
    price: "",
    description: "",
    tutorial: "",
    imageUrl: "",
    size: "",
    categories: "",
    thumbnail: "",
  });

  const uploadImage = () => {
    if (thumbnailFile === null) {
      alert("Please choose a file first!");
    }
    const imageRef = ref(storage, `images/${thumbnailFile.name}`);
    const uploadTask = uploadBytesResumable(imageRef, thumbnailFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setDurationThumbnail(progress);
        console.log("Upload is " + progress + "% done");
      },
      (err) => {
        console.log(err);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormdata((prev) => {
            return { ...prev, thumbnail: downloadURL };
          });
        });
      }
    );
  };

  const uploadMultipleImage = () => {
    if (imageFile === null) {
      alert("Please choose files first!");
    }
    for (let i = 0; i < imageFile.length; i++) {
      const imageRef = ref(storage, `images/${imageFile[i].name}`);
      const uploadTask = uploadBytesResumable(imageRef, imageFile[i]);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setDurationImageList(progress);
          console.log("Upload is " + progress + "% done");
        },
        (err) => {
          console.log(err);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setFormdata((prev) => {
              console.log(downloadURL);
              return { ...prev, imageUrl: [...prev.imageUrl, downloadURL] };
            });
          });
        }
      );
    }
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
      dispatch(updateProduct({ token, id: userId, formData }));
    }
  };

  const validateError = (formData) => {
    let isError = true;
    //validate title
    if (formData.title === "") {
      const message = "title can't be empty!";
      errors.title = message;
      setErrors({ ...errors });
      isError = false;
    } else {
      errors.title = "";
      setErrors({ ...errors });
      isError = true;
    }

    //validate price
    if (isNaN(formData.price)) {
      const message = "Price should be Number";
      errors.price = message;
      setErrors({ ...errors });
      isError = false;
    } else if (formData.price === "") {
      const message = "Price can't be empty!";
      errors.price = message;
      setErrors({ ...errors });
      isError = false;
    } else {
      errors.price = "";
      setErrors({ ...errors });
      isError = true;
    }

    //validate description
    if (formData.description.length < 6) {
      const message = "Description should have at least 6 characters!";
      errors.description = message;
      setErrors({ ...errors });
      isError = false;
    } else if (formData.description === "") {
      const message = "Description can't be empty!";
      errors.description = message;
      setErrors({ ...errors });
      isError = false;
    } else {
      errors.description = "";
      setErrors({ ...errors });
      isError = true;
    }

    //validate image
    if (formData.imageUrl === "") {
      const message = "Image can't be empty!";
      errors.imageUrl = message;
      setErrors({ ...errors });
      isError = false;
    } else {
      errors.imageUrl = "";
      setErrors({ ...errors });
      isError = true;
    }
    //validate size
    if (formData.size === "") {
      const message = "Size can't be empty!";
      errors.size = message;
      setErrors({ ...errors });
      isError = false;
    } else {
      errors.size = "";
      setErrors({ ...errors });
      isError = true;
    }

    //validate categories
    if (formData.categories === "") {
      const message = "Categories number can't be empty!";
      errors.categories = message;
      setErrors({ ...errors });
      isError = false;
    } else {
      errors.categories = "";
      setErrors({ ...errors });
      isError = true;
    }

    //validate thumbnail
    if (formData.thumbnail === "") {
      const message = "Thumbnail can't be empty!";
      errors.thumbnail = message;
      setErrors({ ...errors });
      isError = false;
    } else {
      errors.thumbnail = "";
      setErrors({ ...errors });
      isError = true;
    }
    return isError;
  };

  useEffect(() => {
    if (
      JSON.stringify(updatedProduct.product) !== "{}" &&
      validateError(formData)
    ) {
      setCallModal(true);
    }
  }, [updatedProduct.product, validateError]);
  return (
    <div style={{ padding: "15px" }}>
      <h1 style={{ textAlign: "center" }}>Product Detail</h1>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col sm="6">
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                name="title"
                type="text"
                onChange={handleChange}
                value={formData.title}
              />
              <p className="error-message">{errors.title}</p>
            </Form.Group>
            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control
                name="price"
                type="price"
                value={formData.price}
                onChange={handleChange}
              />
              <p className="error-message">{errors.price}</p>
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                name="description"
                type="description"
                value={formData.description}
                onChange={handleChange}
              />
              <p className="error-message">{errors.description}</p>
            </Form.Group>
            <Form.Group controlId="formFileMultiple">
              <Form.Label>List Image Product</Form.Label>
              <Form.Control
                name="imageUrl"
                type="file"
                multiple
                onChange={(e) => setImageFile(e.target.files)}
              />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: "10px",
                }}
              >
                <Button onClick={uploadMultipleImage}>
                  Upload Multiple Image
                </Button>
                {durationImageList === 0 ? (
                  <Spinner animation="border" role="status" />
                ) : durationImageList === 100 ? (
                  <IoIosCheckmarkCircleOutline
                    style={{ width: "25px", height: "25px", color: "green" }}
                  />
                ) : (
                  ""
                )}
              </div>
              <p className="error-message">{errors.imageUrl}</p>
            </Form.Group>
            <Form.Group>
              <Form.Label>Thumbnail</Form.Label>
              <Form.Control
                name="thumbnail"
                type="file"
                onChange={(e) => setThumbnailFile(e.target.files[0])}
              />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: "10px",
                }}
              >
                <Button onClick={uploadImage}>Upload Image</Button>
                {durationThumbnail === 0 ? (
                  <Spinner animation="border" role="status" />
                ) : durationThumbnail === 100 ? (
                  <IoIosCheckmarkCircleOutline
                    style={{ width: "25px", height: "25px", color: "green" }}
                  />
                ) : (
                  ""
                )}
              </div>
              <p className="error-message">{errors.thumbnail}</p>
            </Form.Group>
          </Col>
          <Col sm="6">
            <Form.Group>
              <Form.Label>Tutorial</Form.Label>
              <Form.Control
                name="tutorial"
                type="text"
                value={formData.tutorial}
                onChange={handleChange}
              />
              <p className="error-message">{errors.tutorial}</p>
            </Form.Group>
            <Form.Group>
              <Form.Label>Size</Form.Label>
              <Form.Control
                name="size"
                type="text"
                value={formData.size}
                onChange={handleChange}
              />
              <p className="error-message">{errors.size}</p>
            </Form.Group>
            <Form.Group>
              <Form.Label>Categories</Form.Label>
              <Form.Select
                style={{ width: "100%", marginBottom: "20px" }}
                name="categories"
                value={formData.categories}
                onChange={handleChange}
              >
                {categoriesList.map((item, index) => (
                  <option value={item} key={index}>
                    {item}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        {updatedProduct.isLoading ? (
          <Spinner animation="border" role="status" />
        ) : (
          <Button type="submit" color="success" style={{ marginTop: "20px" }}>
            Update
          </Button>
        )}
      </Form>
      <ConfirmModal
        callModal={callModal}
        close={() => setCallModal(false)}
        nameFile="Product"
        type="update"
      />
    </div>
  );
};

export default ProductDetail;
