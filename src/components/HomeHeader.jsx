import {Container, Col, Row} from "reactstrap";
import {useEffect, useState} from "react";

import {calculateAndSetNavHeight, scrollDownByNavHeight, scrollToTopSmoothly} from "./utils/scrollingTop";
import TypeAnimationComponent from "./utils/typeAnimation";

const HomeHeader = () => {
    const [navHeight, setNavHeight] = useState(0);

    useEffect(() => {
        scrollToTopSmoothly();
        calculateAndSetNavHeight(setNavHeight);
    }, [navHeight]);


    return (
        <Container
            fluid
            className="container-home-first"
            style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/images/upscaled_background.webp'})`}}
        >
            <Row className="text-center justify-content-center home-first">
                <Col xs='12'>
                    <h1 className="home-main-name">Gabriele Ghisleni</h1>
                </Col>
                <Col xs='12'>
                    <TypeAnimationComponent/>
                </Col>
                <Col xs="auto">
                    <div className="circle">
                        <div className="arrow bounce">
                                <span
                                    className="fa fa-arrow-down fa-2x"
                                    onClick={() => scrollDownByNavHeight(navHeight)}>
                                </span>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default HomeHeader;
