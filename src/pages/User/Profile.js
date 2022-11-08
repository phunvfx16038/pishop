import ProfileCard from "../../Components/Card/ProfileCard";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/Col";
import { useSelector } from "react-redux";

const Profile = () => {
  const currentUser = useSelector((state) => state.auth.login.user);

  return (
    <div>
      <Row style={{ padding: "15px 0px" }}>
        <Col xs={12}>
          <ProfileCard userDetail={currentUser} />
        </Col>
      </Row>
    </div>
  );
};

export default Profile;
