import React, {Component} from "react";
import {NavLink, Button,Modal,Label, ModalHeader,ModelBody, Navbar, NavbarBrand, Jumbotron, Nav, NavbarToggler, Collapse, NavItem, ModalBody, Form, FormGroup, Input} from 'reactstrap';

class NavBar extends Component{
    constructor(props){
        super(props);
        this.state = {
            isOpen:false,
        }
        this.togglerNav = this.togglerNav.bind(this)
    };

    togglerNav() {
        this.setState({isOpen: !this.state.isOpen});
    }

    render () {
        return(
        <React.Fragment>
        <Navbar light expand='md' className='navBar'>
          <div className='container'> 

            <NavbarBrand className='mr-auto'>
                <span className='navLogo'>Gabriele Ghisleni</span>
            </NavbarBrand>
            <NavbarToggler onClick={this.togglerNav} />
 
            <Collapse isOpen={this.state.isOpen} navbar >
                <div className='ml-auto'>
                    <Nav navbar className='ml-auto'>
                        <NavItem>
                            <NavLink className='nav-link' to='/home'><span className='fa fa-home'></span>Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className='nav-link' to='/contact'><span className='fa fa-info-circle'></span>Contattaci</NavLink>
                        </NavItem>
                    </Nav>
                </div>
            </Collapse>


          </div>
        </Navbar>
        </React.Fragment>
    )};
}

export default NavBar;