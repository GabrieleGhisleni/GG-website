import { useState, useEffect } from "react";
import { NavItem, NavLink, Row, Col, 
    Container, Button, TabContent, TabPane, Card, CardHeader, CardBody, Nav } from "reactstrap";
import {useLocation} from 'react-router-dom'

const RenderProjects = (data) => {
    const xs = window.innerWidth < 975
    var Scroll   = require('react-scroll');
    var scroll    = Scroll.animateScroll;

    const [toOpen, setOpen] = useState(xs? null: "0")
    const location = useLocation()

    useEffect(() => {if (location.hash) scroll.scrollToTop({smooth: true})}, [location,])

    function handleScroll(){
        if (!xs){scroll.scrollToTop({  smooth: true,})}
        else{
            var doc = document.getElementById("content")
            var rect = doc.getBoundingClientRect();
            scroll.scrollTo(rect.top - 50 )
        }}

    const navTab = data.map((prj) => {
        return (
            <NavItem>
                <NavLink className="myItem" onClick={() => { 
                    setOpen(prj.id.toString()) 
                    handleScroll()
                    }}>
                    <span className="navTabs"> {prj.name}</span>
                </NavLink>
            </NavItem>
        )
    });

    const contentTab = data.map((prj) => {
        let git = [];
        if (prj.projectGit) {
            git = [<div className="related">
                <hr />
                <h7>Related Works</h7>
                <hr />
            </div>];

            for (var i = 0; i < prj.projectGit.length; i++) {
                let pdf = null;
                if (prj.pdf[i]) {
                    pdf = (
                        <p className="body">
                            <em>
                                Report in pdf:{" "}
                                <a target="_blank" href={prj.pdf[i]}>
                                    {" "}
                                    &nbsp;{" "}
                                    <i
                                        style={{ color: "firebrick" }}
                                        className="fa fa-file-pdf-o"
                                    ></i>
                                </a>{" "}
                            </em>
                        </p>
                    )}

                let webpage = null;
                if (prj.webpage) {
                    if (prj.webpage[i]) {
                        webpage = (
                            <p className="body">
                                <em>
                                    Active WebPage:{" "}
                                    <a href={prj.webpage[i]} target="_blank">
                                        {" "}
                                        Visit the App!{" "}
                                        <i
                                            style={{ color: "firebrick" }}
                                            className="fa fa-rocket"
                                        ></i>
                                    </a>{" "}
                                </em>
                            </p>
                        )}}
                git.push(
                    <div className="gitLink">
                        <h6>
                            <a target="_blank" href={prj.projectGit[i]}>
                                {i + 1 + ". "}
                                {prj.projectName[i]} <i className="fa fa-github fa-lg"></i>
                            </a>
                        </h6>
                        <p>
                            {" "}
                            {prj.projectDescription[i]} <br /> {pdf}
                            {webpage}{" "}
                        </p>
                        <hr className="HR" />
                    </div>
                )}}

        return (
                            
            <TabContent activeTab={toOpen}>
                <TabPane tabId={prj.id.toString()}>
                    <Row className="text-justify myFont">
                        <Col className="col-12 sm myCol">
                            <Card className="project">
                                <CardHeader className="cardH">{prj.name}</CardHeader>
                                <CardBody>
                                    <div style={{ whiteSpace: "pre-line" }}>
                                        {prj.description}
                                    </div>
                                    {git}
                                </CardBody>
                                <Row style={{ textAlign: "right", padding: "2px" }}>
                                    <Col className="col-12">
                                        <Button
                                            className="btn bg-transparent"
                                            style={{ borderRadius: "30px" }}
                                            onClick={() => {  
                                                if (xs){ setOpen(null)}
                                                else{ scroll.scrollToTop({  smooth: true})}}}>
                                            <i className="fa fa-angle-double-up" style={{ color: "black" }}></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                </TabPane>
    
            </TabContent>
        );
    });

    return (

        <Container className='projectContainer' >
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

    )
}

export default RenderProjects;