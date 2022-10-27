import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/Col";
import { useSelector } from "react-redux";
import ProfileCard from "../Components/Card/ProfileCard";
import { Link } from "react-router-dom";

const Profile = () => {
  const currentUser = useSelector((state) => state.user.login.user);

  return (
    <>
      <Row style={{ margin: "0px" }}>
        <Col xs={12}>
          {currentUser.accessToken !== undefined ? (
            <ProfileCard userDetail={currentUser} />
          ) : (
            <div style={{ margin: "30px 0" }}>
              Vui lòng đăng nhập <Link to="/login">tại đây</Link> để xem hồ sơ.
            </div>
          )}
        </Col>
      </Row>
    </>
  );
};

export default Profile;
