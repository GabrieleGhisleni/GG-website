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
import { useEffect } from 'react';
import countapi from 'countapi-js';

const Main = () => {
    useEffect(() => {countapi.hit('ggweb.com', '9594e039-8407-4994-9620-8bae3e2295b8')})
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