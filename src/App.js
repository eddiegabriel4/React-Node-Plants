import './App.css';
import Home from './Home'
import Login from './Login'
import Sidebar from './components/Sidebar'
import SignUp from './SignUp';
import {BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React from 'react';
import { render } from '@testing-library/react';
import axios from 'axios';


const App=()=>{
 
/*
  callAPI(){
    fetch("http://localhost:9000/testAPI")
    .then(res => res.text())
    .then(res => this.setState({apiResponse: res}));
  }
*/

const handleChange = () => {
    axios.get('http://localhost:9000/testAPI')
    .then((res) => {
      console.log(res);
    })
}



  return (
    
    <Router>
    <div>
        <Sidebar />
        <Routes>
          <Route path="/home" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<SignUp/>} />
        </Routes>
    </div>
    </Router>
    
  );
}

export default App;
