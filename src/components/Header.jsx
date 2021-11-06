import { Container, Col, Row } from "reactstrap";
import TypeAnimation from "react-type-animation";
import { useEffect, useState } from "react";

const Header = () => {
  var img = 'assets/images/2_1.jpg'
  var Scroll = require('react-scroll');
  var scroll    = Scroll.animateScroll;
  const [navH, setnavH] = useState(0)

  useEffect(() => {
    const elementHeight = document.getElementById('main').clientHeight;
    const androidBar = elementHeight - window.innerHeight
    var nav = document.getElementById('mainNav')
    var navH = Number(getComputedStyle(nav).height.slice(0, -2))
    setnavH(navH - androidBar)})

  const seq = [
    "Data Scientist ", 3000,
    "Web Developer ", 3000,
  ];


  return (
    <Row id='main' className="firstPage backImg" style={{ backgroundImage: `url(${img})` }}>
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
        <Row style={{ marginTop: "100px" }}>
          <Col>
            <div class="arrow bounce">
              <a class="fa fa-arrow-down fa-2x" 
              onClick={()=> scroll.scrollMore((window.innerHeight - navH))}>
              </a>
            </div></Col>
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