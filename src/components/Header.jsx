import { Container, Col, Row } from "reactstrap";
import TypeAnimation from "react-type-animation";
import img from "./tmp/2_1.jpg";

const Header = () => {
  const seq = [
    "Data Scientist ", 2000,
    "Web Developer ", 2000,
  ];
  return (
    <Row className="firstPage backImg" style={{backgroundImage: `url(${img})`}}>
      <Container className="align-self-center">
        <Row className="text-center">
          <Col>
            <h1 className="name">Gabriele Ghisleni</h1>
          </Col>
        </Row>
        <Row className="text-center">
          <Col>
            {/* <h2>Student at UniTN</h2> */}
            <TypeAnimation
              className="animation"
              cursor={true}
              sequence={seq}
              wrapper="h2"
              repeat={Infinity}
            />
          </Col>
        </Row>
      </Container>
    </Row>
  );
};

export default Header;

{/* <Row>
  <Col className='text-center'>
    <img
      className="myImg img-fluid img-circle img-rounded"
      src="https://gabrieleghisleni.github.io/GG-website/assets/images/home.jpg"
      //  src="./assets/images/home.jpg"
      height="150"
      width="150"
      alt="mySelf"
    />
  </Col>
</Row> */}