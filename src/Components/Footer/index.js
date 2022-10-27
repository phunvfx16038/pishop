import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import "./footer.css";
import {
  IoLogoFacebook,
  IoLogoTwitter,
  IoLogoYoutube,
  IoLogoInstagram,
} from "react-icons/io";
const Footer = () => {
  return (
    <div className="footer">
      <Container>
        <Row>
          <Col xs="12">
            <div>@2022 Copyright: Shnee</div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <p>Mạng xã hội</p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  fontSize: "24px",
                }}
              >
                <div className="mr-20 color-blue">
                  <IoLogoFacebook />
                </div>
                <div className="mr-20 color-blue">
                  <IoLogoTwitter />
                </div>
                <div className="mr-20 color-red">
                  <IoLogoYoutube />
                </div>
                <div className="mr-20">
                  <IoLogoInstagram />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
