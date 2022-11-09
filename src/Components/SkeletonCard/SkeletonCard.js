import Col from "react-bootstrap/esm/Col";
import Skeleton from "react-loading-skeleton";
const SkeletonCard = () => {
  return (
    <Col sm="3" style={{ marginTop: "20px" }}>
      <Skeleton height={380} duration={2} />
      <Skeleton height={30} style={{ textAlign: "center" }} duration={2} />
      <Skeleton
        height={30}
        width={80}
        style={{ textAlign: "center" }}
        duration={2}
      />
    </Col>
  );
};

export default SkeletonCard;
