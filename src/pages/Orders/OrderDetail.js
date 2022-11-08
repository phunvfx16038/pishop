import { useLocation, useParams } from "react-router-dom";
import Row from "react-bootstrap/esm/Row";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "../../reduxTK/orders/OrderSlice";
import Spinner from "react-bootstrap/Spinner";
import { useEffect, useState } from "react";

const OrderDatail = () => {
  const location = useLocation();
  const orderData = location.state.order;
  const currentUser = useSelector((state) => state.auth.login.user);
  const token = `Bear ${currentUser.accessToken}`;
  const param = useParams();
  const dispatch = useDispatch();
  const orderId = param.id;
  const [order, setOrder] = useState(orderData);
  const orderRedux = useSelector((state) => state.order.getOrder.order);
  console.log(orderData);
  useEffect(() => {
    setOrder(orderRedux);
    dispatch(getOrder({ token, orderId }));
  }, [dispatch, token, orderId, orderRedux]);
  return (
    <div>
      {console.log(order)}
      <Row>
        {order.isLoading ? (
          <Spinner />
        ) : JSON.stringify(order.user) !== "{}" ? (
          <>
            <div
              style={{
                fontSize: "22px",
                fontWeight: "500",
                textAlign: "left",
              }}
            >
              <div>Khách hàng: {order.user.name}</div>
              <div>
                Địa chỉ:{" "}
                {order.purchase_units[0].shipping.address.address_line_1}
                {order.purchase_units[0].shipping.address.admin_area_2}
              </div>
            </div>
            <h4 style={{ textAlign: "center" }}>Danh sục sản phẩm</h4>
            {order.purchase_units[0].items.map((product) => (
              <div className="item">
                <p className="name-product">{product.name}</p>
                <div className="qtn-product">
                  <label>Số lượng</label>
                  <div className="btn-group">{product.quantity}</div>
                </div>
                <div className="qtn-product">
                  <label>Giá sản phẩm</label>
                  <div className="btn-group">
                    <p>{product.unit_amount.value}</p>
                  </div>
                </div>
                <div className="qtn-product">
                  <label>Tổng giá</label>
                  <div className="btn-group">
                    <p>
                      {(Math.round(
                        parseFloat(product.unit_amount.value) * 100
                      ) /
                        100) *
                        product.quantity}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                fontWeight: "600",
              }}
            >
              <h5 style={{ marginRight: "50px", color: "rgb(146, 141, 141)" }}>
                Tổng giá tiền
              </h5>
              <p style={{ marginRight: "15px", fontSize: "18px" }}>
                ${order.purchase_units[0].amount.value}
              </p>
            </div>
          </>
        ) : (
          <div>Không có đơn hàng</div>
        )}
      </Row>
    </div>
  );
};

export default OrderDatail;
