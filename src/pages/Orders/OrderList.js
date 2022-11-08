import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/esm/Button";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../reduxTK/orders/OrderSlice";
const OrderList = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.login.user);
  const token = `Bear ${currentUser.accessToken}`;
  const ordersList = useSelector((state) => state.order.getOrders);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getOrders(token));
  }, [dispatch, token]);

  const handleNavigate = (order) => {
    navigate(`/main/order/detail/${order._id}`, {
      state: {
        order,
      },
    });
  };

  return (
    <div>
      <Row>
        <Col xs={12}>
          <Table striped>
            <thead>
              <tr>
                <th>STT</th>
                <th>Username</th>
                <th>Payment Method</th>
                <th>Total Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {ordersList.orders.map((order, index) => (
                <tr key={order._id}>
                  <td>{index + 1}</td>
                  <td>{order.user.name}</td>
                  <td>{}</td>
                  <td>{order.purchase_units[0].amount.value}</td>
                  <td>
                    <Button
                      color="primary"
                      onClick={() => handleNavigate(order)}
                    >
                      Detail
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </div>
  );
};

export default OrderList;
