// React
import React, {Component} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Custom omponents 
import NavBar from './Navbar';
import { Home } from './Home';
import { Footer } from './Footer';
import RenderProjects from './TabProject'
// Shared Const
import {PROJECTS} from './../shared/projects';
import {HOBBIES} from './../shared/hobbies';

const Main = () => {
    return(
        <React.Fragment>
        <NavBar />
        <Switch>
            <Route path='/home' component={()=> <Home/>}/>
            <Route path='/projects' component={() => RenderProjects(PROJECTS)}/>
            <Route path='/hobbies' component={() => RenderProjects(HOBBIES) }/>
            <Redirect to='/home'/>
        </Switch>
        <Footer/>
    </React.Fragment>
    )
}


export default Main;