import './css/style.css';
import {BrowserRouter} from 'react-router-dom'

import {Component} from 'react';
import Main from './components/Main';

class App extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div>
        <BrowserRouter basename='/GG-website/'>
          <Main />
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
