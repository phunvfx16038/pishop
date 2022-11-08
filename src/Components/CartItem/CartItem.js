import Col from "react-bootstrap/Col";
import "./cart.css";

const CartItem = ({ product }) => {
  return (
    <Col xs="12">
      <div className="item">
        <div className="img-product" style={{ width: "80px", height: "auto" }}>
          <img
            src={product.thumbnail}
            alt={product.title}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <p className="name-product">{product.title}</p>
        <div className="qtn-product">
          <label>Quantity</label>
          <div className="btn-group">
            <span>{product.quantity}</span>
          </div>
        </div>
        <div className="qtn-product">
          <label>Subtotal</label>
          <div className="btn-group">
            <p>{product.price * product.quantity}đ</p>
          </div>
        </div>
      </div>
    </Col>
  );
};

export default CartItem;
