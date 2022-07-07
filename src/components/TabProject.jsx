import { useState, useEffect } from "react";
import {
    NavItem, NavLink, Row, Col,
    Container, Button, TabContent, TabPane, Card, CardHeader, CardBody, Nav
} from "reactstrap";

var Scroll = require('react-scroll');
var scroll = Scroll.animateScroll;


const RenderProjects = (data) => {
    const [toOpen, setOpen] = useState(window.innerWidth < 975 ? null : "0")
    useEffect(() => { scroll.scrollToTop({ smooth: true }) })


    // stylish up arrow
    const UpArrow = () => {
        return (
            <Row style={{ textAlign: "right", padding: "2px" }}>
                <Col className="col-12">
                    <Button
                        className="btn bg-transparent"
                        style={{ borderRadius: "30px" }}
                        onClick={() => {
                            if (window.innerWidth < 975) { setOpen(null) }
                            else { scroll.scrollToTop({ smooth: true }) }
                        }}>
                        <i className="fa fa-angle-double-up" style={{ color: "black" }}></i>
                    </Button>
                </Col>
            </Row>
        );
    };

    // generate tab headers
    const navTab = data.map((section) => {
        return (
            <NavItem key={`navitem-${section.id.toString()}`}>
                <NavLink className="myItem" onClick={() => {
                    setOpen(section.id.toString())
                    handleScroll()
                }}>
                    <span className="navTabs"> {section.name}</span>
                </NavLink>
            </NavItem>
        )
    });

    // generate tab contents
    const contentTab = data.map((section) => {
        // see Project Constructor.jsx
        let projects_section = section.projects.map((i, idx) => i.render_project(idx))

        return (
            <TabContent activeTab={toOpen}  key={`tabcontent-${section.id.toString()}`}>
                <TabPane tabId={section.id.toString()}>
                    <Row className="text-justify myFont">
                        <Col className="col-12 sm myCol">
                            <Card className="project">

                                <CardHeader className="cardH">{section.name}</CardHeader>
                                <CardBody><div style={{ whiteSpace: "pre-line" }}>{section.description}</div>

                                    <div className="related">
                                        <hr /><h6>Related Works</h6><hr />
                                    </div>

                                    {projects_section}

                                </CardBody>
                                < UpArrow />
                            </Card>
                        </Col>
                    </Row>
                </TabPane>
            </TabContent>
        )
    });

    
    return (
        <Container className='projectContainer'>
            <Row>
                <Col xs={{ size: 10, offset: 1 }} className="col-lg-3 offset-lg-0 leftNav">
                    <Nav vertical tabs>
                        {navTab}
                    </Nav>
                </Col>
                <Col md={12} lg={9} id='content'>
                    {contentTab}
                </Col>
            </Row>
        </Container>
    );
};


export default RenderProjects;

////////////////////////////////////////////
function handleScroll() {
    if (!(window.innerWidth < 975)) { scroll.scrollToTop({ smooth: true, }) }
    else {
        const rect = document.getElementById("content").getBoundingClientRect();
        scroll.scrollTo(rect.top - 50)
    }
}

