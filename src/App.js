import './css/style.css';

import React from 'react';

import {Footer} from './components/layout/Footer';
import Home from "./components/Home";

const App = () => {
    return (
        <React.Fragment>
            <Home/>
            <Footer/>
        </React.Fragment>
    );
}


export default App;
