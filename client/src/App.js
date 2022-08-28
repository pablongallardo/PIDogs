import './App.css';
import {Route} from 'react-router-dom'
import { Home } from './components/Home';
import DogDetail from './components/DogDetail'
import Landing from './components/LandingPage';
import CreateDog from './components/CreateDog';
import Nav from './components/Nav';



function App() {
  return (
    <div className="App">
      <Route exact path = "/" component = {Landing}/>
      <Route exact path = "/dogs" component = {Home}/>
      <Route exact path = "/detail/:id" component = {DogDetail}/>
      <Route exact path = "/dog" component = {CreateDog}/>
      <Route exact path = "/nav" component = {Nav}/>

    </div>
  );
}

export default App;
