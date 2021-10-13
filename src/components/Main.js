// React
import React, {Component} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Custom omponents 
import NavBar from './Navbar';
import { Header } from './Header';
import { Home } from './Home';
import { Footer } from './Footer';
import TabProject from './HandlerData'

// Shared Const
import {PROJECTS} from './../shared/projects';
import {HOBBIES} from './../shared/hobbies';


class Main extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <React.Fragment>
                <NavBar />
                <Switch>
                    <Route path='/GG-website/home' component={()=> <div><Header/><Home/></div>}/>
                    <Route path='/GG-website/projects' component={() => <TabProject data={PROJECTS}/>}/>
                    <Route path='/GG-website/hobbies' component={() => <TabProject data={HOBBIES}/>}/>
                    <Redirect to='/GG-website/home'/>
                </Switch>
                <Footer/>
            </React.Fragment>

        )
    }
}

export default Main;