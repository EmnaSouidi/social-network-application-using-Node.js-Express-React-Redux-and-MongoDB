
import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';



import Navbar from './component/layout/Navbar';
import Footer from './component/layout/Footer';
import Landing from './component/layout/Landing';
import Register from './component/auth/Register';
import Login from './component/auth/Login';

import './App.css';




class App extends Component {
  render() {
  return (
    <Provider store ={store}>
    <Router>
      <div className="App">
        <Navbar />  
        <Routes>
        <Route exact path="/" element={ <Landing /> } />
        </Routes>
        <div class="container">
          <Routes>
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          </Routes>
        </div>
       
        <Footer />   
        
      </div>
    </Router>
    </Provider>
  );
}
}

export default App;
