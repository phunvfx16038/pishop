import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../../Components/Sidebar/sidebar.css";
import CardItem from "../../Components/Card/CardItem";
import LineGraph from "../../Components/Chart/LineGraph";
import { UserData as data } from "../../data/data";
import PieChart from "../../Components/Chart/PieChart";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUsers } from "../../reduxTK/user/userSlice";
import { getProducts } from "../../reduxTK/products/productSlice";
import { getOrders } from "../../reduxTK/orders/OrderSlice";

const DashBoard = () => {
  const labels = data.map((item) => item.year);
  const dispatch = useDispatch();
  const userQuantity = useSelector((state) => state.user.listUser.users.length);
  const ordersQuantity = useSelector(
    (state) => state.order.getOrders.orders.length
  );
  const productQuantity = useSelector(
    (state) => state.product.getProducts.products.length
  );
  const currentUser = useSelector((state) => state.auth.login.user);
  const token = `Bear ${currentUser.accessToken}`;
  const cardData = [
    { name: "User", quantity: userQuantity, url: "users" },
    { name: "Product", quantity: productQuantity, url: "products" },
    { name: "Orders", quantity: ordersQuantity, url: "orders" },
  ];

  const datasets = [
    {
      label: "Users Gained",
      data: data.map((data) => data.userGain),
      backgroundColor: [
        "rgba(75,192,192,1)",
        "#ecf0f1",
        "#50AF95",
        "#f3ba2f",
        "#2a71d0",
      ],
      borderColor: "black",
      borderWidth: 2,
    },
  ];

  useEffect(() => {
    dispatch(getUsers(token));
    dispatch(getOrders(token));
    dispatch(getProducts());
  }, [dispatch, token]);

  return (
    <div>
      <Row style={{ padding: "10px" }}>
        <Col xs={12} className="px-4">
          <h2>Dashboard</h2>
          <Row
            style={{
              marginLeft: "-10px",
              marginRight: "-10px",
              marginTop: "25px",
            }}
          >
            {cardData.map((item, index) => (
              <CardItem
                name={item.name}
                quantity={item.quantity}
                url={item.url}
                key={index}
              />
            ))}
          </Row>
        </Col>
      </Row>
      {/* <Row>
        <Col xs={6}>
          <LineGraph datasets={datasets} labels={labels} />
        </Col>
        <Col xs={6}>
          <PieChart datasets={datasets} labels={labels} />
        </Col>
      </Row> */}
    </div>
  );
};

export default DashBoard;
