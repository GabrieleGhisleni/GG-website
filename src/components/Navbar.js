import React, { Component, useState } from "react";
import {
    Col,
    Row,
    Navbar,
    NavbarBrand,
    Nav,
    NavbarToggler,
    Collapse,
    NavItem,
    Container,
} from "reactstrap";
import { NavLink } from "react-router-dom";

const NavBar = () => {
    const [open, setOpen] = useState(false);

    return (
        <React.Fragment>
            <Navbar dark className="mainNav"  fixed="top">
                <Container>
                    <NavbarBrand className="mr-auto" id='mainNav'>
                        <NavLink to="/home" to="/home">
                            <span className="navLogo">GG Portfolio</span>
                        </NavLink>
                    </NavbarBrand>
                    <NavbarToggler onClick={() => setOpen(!open)} style={{color:'blue'}}/>
                    <Collapse isOpen={open} navbar>
                        <Col className='text-center'>
                            <Nav navbar className="ml-auto">
                                <NavItem>
                                    <NavLink to="/" className="nav-link" to="/home" onClick={() => setOpen(!open)}>
                                        Home
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/projects" onClick={() => setOpen(!open)}>
                                        Projects
                                    </NavLink>
                                </NavItem>
                                {/* <NavItem>
                                  
                                    <NavLink  onClick={() => setOpen(!open)} className="nav-link" to="/hobbies">
                                        Hobbies
                                    </NavLink>
                                </NavItem> */}
                            </Nav>
                            </Col>
                    </Collapse>
                </Container>
            </Navbar>
        </React.Fragment>
    );
};

export default NavBar;
