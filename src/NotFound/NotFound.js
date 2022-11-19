import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { useNavigate } from "react-router-dom";
import "./notfound.css";

const NotFound = () => {
  const errorImage =
    "https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?w=2000";
  const navigate = useNavigate();
  return (
    <Row style={{ margin: "0px" }}>
      <Col xs={12}>
        <div className="wrap">
          <div className="wrap-image">
            <img src={errorImage} alt="404 Not Found" />
          </div>
          <h2>Rất tiếc, chúng tôi không thể tìm thấy trang</h2>
          <Button onClick={() => navigate(-1)}>Quay lại </Button>
        </div>
      </Col>
    </Row>
  );
};

export default NotFound;
