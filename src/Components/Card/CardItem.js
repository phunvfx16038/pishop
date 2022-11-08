import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
const CardItem = ({ name, quantity, url }) => {
  return (
    <Col xs={4} style={{ padding: "0px 10px" }}>
      <Card style={{ width: "100%" }}>
        <Card.Body>
          <Card.Title style={{ fontSize: "16px" }}>{name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            <h3>{quantity}</h3>
          </Card.Subtitle>
          <Link
            to={`/main/${url}`}
            style={{ color: "black", textDecoration: "none" }}
          >
            <p>View all</p>
          </Link>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default CardItem;
