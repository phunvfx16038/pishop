import "./product.css";
import { Link } from "react-router-dom";
import Col from "react-bootstrap/Col";
import { addCart, createCart } from "../CartItem/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import AddCartModal from "../Modals/AddCartModal";
import { useState } from "react";
import CheckLoginModal from "../Modals/CheckLogInModal";

const Product = ({ product }) => {
  const quantity = 1;
  const dispatch = useDispatch();
  const [callModal, setCallModal] = useState(false);
  const [callLoginModal, setCallLoginModal] = useState(false);
  const currentUser = useSelector((state) => state.user.login.user);
  const convertStingPrice = parseInt(product.price.replace(",", ""));
  const token = `Bear ${currentUser.accessToken}`;
  const listCart = useSelector((state) => state.cart);
  //status of cart
  const status = "pending";
  const productPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(convertStingPrice);

  const handleAddToCart = (product) => {
    if (JSON.stringify(currentUser) !== "{}") {
      const user = {
        userId: currentUser._id,
        name: currentUser.userName,
      };

      const currentProduct = { ...product };
      currentProduct.quantity = quantity;

      setCallModal(true);
      //check cart === "[]" then create else update
      if (listCart.cart.length === 0 && listCart.fullCart.length === 0) {
        const cartItems = [];
        cartItems.push(currentProduct);
        dispatch(createCart({ cartItems, user, status, token }));
      } else {
        dispatch(addCart(currentProduct));
      }
    } else {
      setCallLoginModal(true);
    }
  };

  return (
    <Col sm={3}>
      <div className="product-img">
        <Link to={`/products/${product._id}`} state={{ product }}>
          <img alt="product" src={product.thumbnail} />
        </Link>
        <div
          onClick={() => handleAddToCart(product)}
          className="product-addCart"
        >
          <p>Thêm vào giỏ hàng</p>
        </div>
      </div>
      <Link to={`/products/${product.id}`} state={{ product }}>
        <div style={{ marginTop: "15px", fontSize: "18px", color: "black" }}>
          <p>{product.title}</p>
          <p style={{ fontWeight: 700 }}>{productPrice}</p>
        </div>
      </Link>
      <AddCartModal callModal={callModal} close={() => setCallModal(false)} />
      <CheckLoginModal
        callModal={callLoginModal}
        close={() => setCallLoginModal(false)}
      />
    </Col>
  );
};

export default Product;
