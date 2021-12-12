import { Component } from 'react';
import './App.css';
import FullGame from './components/Game/FullGame';
class App extends Component {
  

  render(){
    return (
    <div className="App">
      <FullGame/>
    </div> 
  );
}
}

export default App;
