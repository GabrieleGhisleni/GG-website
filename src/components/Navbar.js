import React, {Component} from "react";
import {Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem} from 'reactstrap';
import {NavLink} from 'react-router-dom';

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
        <Navbar light expand='md'>
          <div className='container'> 

            <NavbarBrand className='mr-auto'>
                <span className='navLogo'>Gabriele Ghisleni</span>
            </NavbarBrand>
            <NavbarToggler onClick={this.togglerNav} />
 
            <Collapse isOpen={this.state.isOpen} navbar >
                <div className='ml-auto'>
                    <Nav navbar className='ml-auto'>
                        <NavItem>
                            <NavLink to='/home'className='nav-link' to='/home'>
                                Home
                                {/* <span className='fa fa-home'></span>Home */}
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className='nav-link' to='/projects'>
                                Projects
                                {/* <span className='fa fa-info-circle'></span>Projects */}
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className='nav-link' to='/hobbies'>
                                Hobbies
                                {/* Hobbies&nbsp;<span className='fa fa-beer'></span> */}
                            </NavLink>
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