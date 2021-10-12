import logo from './logo.svg';
import './App.css';
import {Component} from 'react';
import Main from './components/Main';


class App extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div>
        <Main />
      </div>
    )
  }
}

export default App;
