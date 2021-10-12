import React, {Component} from 'react';
import NavBar from './Navbar';
import { Header } from './Header';
import {Home} from './Home';
import { Footer } from './Footer';

class Main extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <React.Fragment>
                <NavBar />
                <Header />
                <Home />
                <Footer/>
            </React.Fragment>

        )
    }
}

export default Main;