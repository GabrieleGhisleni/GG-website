import { Container, Col, Row } from "reactstrap";
import { useEffect, useState } from "react";
import Typist from 'react-typist';

const HomeHeader = () => {
  // var img = 'assets/images/2_1.jpg'
  var img = process.env.PUBLIC_URL + '/assets/images/2_1.jpg';
  var Scroll = require('react-scroll');
  var scroll = Scroll.animateScroll;
  const [navH, setnavH] = useState(0);

  useEffect(() => {
    scroll.scrollToTop({ smooth: true });
    const elementHeight = document.getElementById('main').clientHeight;
    const androidBar = elementHeight - window.innerHeight;
    var nav = document.getElementById('mainNav');
    var navH = Number(getComputedStyle(nav).height.slice(0, -2)) + 8;
    setnavH(navH - androidBar);
  })

  var typeAnim = [];
  for (let i = 0; i < 100; i++) {
    typeAnim.push(
      <span key={i}>
        <Typist.Backspace count={17} delay={3000} />
        <span> Machine Learning Engineer </span>
        <Typist.Backspace count={27} delay={3000} />
        <span> Web Developer </span>
        <Typist.Backspace count={17} delay={3000} />
        <span> Data Scientist </span>
      </span>
    );};
  

  return (
    <Row id='main' className="firstPage backImg" style={{ backgroundImage: `url(${img})` }}>
      <Container className="align-self-center">
        <Row className="text-center">
          <Col><h1 className="name">Gabriele Ghisleni</h1></Col>
        </Row>
        <Row className='text-center'>
          <Col>
            <Typist className='animation' avgTypingDelay={100}>
              <span> Data Scientist </span>
              {typeAnim}  
            </Typist>
          </Col>
        </Row>
        <Row style={{ marginTop: "100px" }}>
          <Col>
            <div className="arrow bounce">
              <span className="fa fa-arrow-down fa-2x" onClick={() => scroll.scrollMore((window.innerHeight - navH))}></span>
            </div>
          </Col>
        </Row>
      </Container>
    </Row>
  );
};

export default HomeHeader;