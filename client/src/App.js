import React ,{Component} from 'react';
import logo from './logo.svg';
import './App.css';
// import  NodeRequest from './component/nodeRequest';
import Note from './component/Note'
class App extends Component {
  render() {
    return(
    <div className="App">  
      <Note props={this.props}/>
    </div>
    )
    }
}

export default App;
