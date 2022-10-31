import { Button, Col, Container, Row } from "reactstrap";
import "./productDetail.css";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCart, createCart } from "../Components/CartItem/cartSlice";
import AddCartModal from "../Components/Modals/AddCartModal";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import Form from "react-bootstrap/Form";
import CheckLoginModal from "../Components/Modals/CheckLogInModal";
const ProductDetail = () => {
  const location = useLocation();
  const productDetail = location.state.product;
  const [showImage, setShowImage] = useState(productDetail.thumbnail);
  const [callModal, setCallModal] = useState(false);
  const [callLoginModal, setCallLoginModal] = useState(false);
  const currentUser = useSelector((state) => state.user.login.user);
  const token = `Bear ${currentUser.accessToken}`;
  const cart = useSelector((state) => state.cart.cart);
  let [quantity, setQuantity] = useState(1);
  const status = "pending";
  const dispatch = useDispatch();
  const handleChangeImage = (image) => {
    setShowImage(image);
  };

  const handlePlus = () => {
    setQuantity((quantity += 1));
  };

  const handleSubtract = () => {
    quantity = quantity - 1;
    if (quantity <= 0) {
      quantity = 1;
    }
    setQuantity(quantity);
  };

  const handleAddToCart = (productDetail) => {
    if (JSON.stringify(currentUser) !== "{}") {
      const user = {
        userId: currentUser._id,
        name: currentUser.userName,
      };

      const currentProduct = { ...productDetail };
      currentProduct.quantity = quantity;

      setCallModal(true);
      //check cart === "[]" then create else update
      if (cart.length !== 0) {
        dispatch(addCart(currentProduct));
      } else {
        const cartItems = [];
        cartItems.push(currentProduct);
        dispatch(createCart({ cartItems, user, status, token }));
      }
    } else {
      setCallLoginModal(true);
    }
  };

  return (
    <Container className="px-3">
      <Row className="g-4 mt-2">
        <Col xs="6">
          <Row style={{ display: "flex" }} className="g-2">
            <Col xs="9" className="big-image">
              <img alt={productDetail.title} src={showImage} />
            </Col>
            <Col xs="3" className="small-image">
              <Splide
                options={{
                  rewind: true,
                  perPage: 4,
                  perMove: 1,
                  pagination: false,
                  direction: "ttb",
                  gap: "1em",
                  arrows: false,
                  height: 600,
                }}
                aria-label="My Favorite Images"
              >
                {productDetail.imageUrl.map((imageItem, index) => (
                  <SplideSlide
                    onClick={() => handleChangeImage(imageItem)}
                    key={index}
                  >
                    <img src={imageItem} alt="Url" />
                  </SplideSlide>
                ))}
              </Splide>
            </Col>
          </Row>
        </Col>
        <Col xs="6" style={{ textAlign: "left" }}>
          <h3 style={{ textTransform: "capitalize" }}>{productDetail.title}</h3>
          <p style={{ fontWeight: 600, fontSize: "22px" }}>
            {productDetail.price}đ
          </p>
          <p>
            <b>Mô tả</b>: {productDetail.description}
          </p>
          <div>
            <p>
              <b>Kích cỡ</b>
            </p>
            <Form.Select style={{ width: "200px", marginBottom: "20px" }}>
              {productDetail.size.map((item, index) => (
                <option value={item} key={index}>
                  {item}
                </option>
              ))}
            </Form.Select>
          </div>
          <div>
            <p>
              <b>Hướng dẫn vệ sinh</b>:
            </p>
            {productDetail.tutorial.map((item, index) => (
              <p key={index}>{item}</p>
            ))}
          </div>
          <div className="btn-group">
            <p style={{ marginRight: "20px" }}>
              <b>Số lượng: </b>:
            </p>
            {quantity === 1 ? (
              <Button color="success" disabled>
                -
              </Button>
            ) : (
              <Button color="success" onClick={handleSubtract}>
                -
              </Button>
            )}
            <span>{quantity < 1 ? 1 : quantity}</span>
            <Button color="success" onClick={handlePlus}>
              +
            </Button>
          </div>
          <div style={{ marginTop: "20px" }}>
            <Button
              color="success"
              onClick={() => handleAddToCart(productDetail)}
            >
              Thêm vào giỏ hàng
            </Button>
          </div>
        </Col>
        <AddCartModal
          callModal={callModal}
          close={() => setCallModal(false)}
          order={null}
        />
        <CheckLoginModal
          callModal={callLoginModal}
          close={() => setCallLoginModal(false)}
        />
      </Row>
    </Container>
  );
};

export default ProductDetail;
