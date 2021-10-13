import './css/style.css';
import {BrowserRouter, HashRouter} from 'react-router-dom'

import {Component} from 'react';
import Main from './components/Main';

class App extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div>
        <HashRouter>
          <Main />
        </HashRouter>
      </div>
    )
  }
}

export default App;
