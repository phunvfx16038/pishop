import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { getOrderUser } from "../Components/ProductLists/productSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
const Orders = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.login);
  const token = `Bear ${currentUser.user.accessToken}`;
  const order = useSelector((state) => state.product.orders);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getOrderUser({ token, userId: currentUser.user._id }));
  }, [dispatch, token, currentUser.user._id]);

  console.log(order);

  const handleDetail = (data) => {
    navigate(`/order/${data._id}`, { state: data });
  };

  return (
    <Container>
      <Row>
        <Col>
          {order.length !== 0 ? (
            <Table striped>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Giá trị đơn hàng</th>
                  <th>Trạng thái</th>
                  <th>Thời gian</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {order.map((item, index) => (
                  <tr key={index}>
                    <td>{index}</td>
                    <td>{item.purchase_units[0].amount.value}</td>
                    <td>Đã thanh toán</td>
                    <td>{item.created_at}</td>
                    <td>
                      <Button
                        onClick={() => {
                          handleDetail(item);
                        }}
                      >
                        Chi tiết
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <>
              <Skeleton height={60} count={6} />
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};
export default Orders;
