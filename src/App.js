import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import Home from './Component/Home';
import Navbar from './Component/Navbar';
import Register from './Component/Register';
import {Routes, Route} from 'react-router-dom'
import Edit from './Component/Edit';
import Details from './Component/Details';

function App() {
  return (
    <>
    <Navbar/>
    <Routes>
     <Route exact path='/' Component={Home}/>
     <Route path='/register' Component={Register}/>
     <Route path='/edit/:id' Component={Edit}/>
     <Route path='/view/:id' Component={Details}/>
    </Routes>

    </>
  );
}

export default App;
