import { Container, Row } from "reactstrap";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const OrderDatail = () => {
  const currentUser = useSelector((state) => state.user.login);
  const location = useLocation();
  const orderDetail = location.state;

  return (
    <Container>
      <div
        style={{ padding: "20px", backgroundColor: "aqua", margin: "15px 0" }}
      >
        Thông tin đơn hàng
      </div>
      <Row>
        {currentUser.isLogged ? (
          <>
            <div
              style={{
                fontSize: "22px",
                fontWeight: "500",
                textAlign: "left",
              }}
            >
              <div>Khách hàng: {orderDetail.user.name}</div>
              <div>
                Địa chỉ:{" "}
                {orderDetail.purchase_units[0].shipping.address.address_line_1}
                {orderDetail.purchase_units[0].shipping.address.admin_area_2}
              </div>
            </div>
            <h4>Danh sục sản phẩm</h4>
            {orderDetail.purchase_units[0].items.map((product) => (
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
                ${orderDetail.purchase_units[0].amount.value}
              </p>
            </div>
          </>
        ) : (
          <div style={{ margin: "30px 0" }}>
            Vui lòng đăng nhập <Link to="/login">tại đây</Link>.
          </div>
        )}
      </Row>
    </Container>
  );
};

export default OrderDatail;
