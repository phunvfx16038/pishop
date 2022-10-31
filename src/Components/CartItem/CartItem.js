import { Button, Col } from "reactstrap";
import { useDispatch } from "react-redux";
import "./cart.css";
import {
  decreaseQuantity,
  increaseQuantity,
  removeItem,
  updateCart,
} from "./cartSlice";

const CartItem = ({ product, quantity, type, listCart, token }) => {
  const dispatch = useDispatch();
  const productPrice = product.price.replace(",", "");
  const subTotal =
    Math.round(
      parseFloat(productPrice) * (quantity <= 1 ? 1 : quantity) * 100
    ) / 100;
  const subTotalFormatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(subTotal);

  //status of cart
  const status = "pending";

  const handlePlus = (id) => {
    const data = {
      id,
      quantity,
    };
    dispatch(increaseQuantity(data));
  };

  const handleSubtract = (id) => {
    const data = {
      id: id,
      quantity: quantity,
    };

    dispatch(decreaseQuantity(data));
  };

  const handleDeleteItem = (id) => {
    const remainProd = listCart.cart.filter((product) => {
      return product._id !== id;
    });

    dispatch(removeItem(id));
    dispatch(
      updateCart({
        cartId: listCart.fullCart._id,
        token,
        cartItems: remainProd,
        status,
      })
    );
  };
  return (
    <Col xs="12">
      <div className="item">
        {type === "payment" ? (
          ""
        ) : (
          <div className="close" onClick={() => handleDeleteItem(product._id)}>
            <span>x</span>
          </div>
        )}

        <div className="img-product">
          <img src={product.thumbnail} alt={product.brand} />
        </div>
        <p className="name-product">{product.title}</p>

        {type === "payment" ? (
          ""
        ) : (
          <>
            <div className="qtn-product">
              <label>Kích cỡ</label>
              <div className="btn-group">
                <select style={{ padding: "5px 10px" }}>
                  {product.size.map((item, index) => (
                    <option key={index}>{item}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="qtn-product">
              <label>Số lượng</label>
              <div className="btn-group">
                {quantity === 1 ? (
                  <Button color="success" disabled>
                    -
                  </Button>
                ) : (
                  <Button
                    color="success"
                    onClick={() => handleSubtract(product._id)}
                  >
                    -
                  </Button>
                )}
                <span>{quantity < 1 ? 1 : quantity}</span>
                <Button color="success" onClick={() => handlePlus(product._id)}>
                  +
                </Button>
              </div>
            </div>
          </>
        )}
        <div className="qtn-product">
          <label>Giá sản phẩm</label>
          <div className="btn-group">
            <p>{product.price}</p>
          </div>
        </div>
        <div className="qtn-product">
          <label>Tổng giá</label>
          <div className="btn-group">
            <p>{subTotalFormatted}</p>
          </div>
        </div>
      </div>
    </Col>
  );
};

export default CartItem;
