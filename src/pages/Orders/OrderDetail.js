import { useLocation } from "react-router-dom";
import Row from "react-bootstrap/esm/Row";
import Spinner from "react-bootstrap/Spinner";
import "./orderDetail.css";
const OrderDatail = () => {
  const location = useLocation();
  const order = location.state.order;

  return (
    <div>
      <Row>
        {order.isLoading ? (
          <Spinner />
        ) : JSON.stringify(order.user) !== "{}" ? (
          <div style={{ padding: "20px" }}>
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
            {order.purchase_units[0].items.map((product, index) => (
              <div className="item" key={index}>
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
          </div>
        ) : (
          <div style={{ paddins: "20px" }}>Không có đơn hàng</div>
        )}
      </Row>
    </div>
  );
};

export default OrderDatail;
