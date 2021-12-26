import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateAccount from './CreateAccount/CreateAccount';
import Login from './Login/Login';
import Home from './HomePage/Home'

function App() {
    return (
      <Router>
        <div className="App">
          <div className="content">
            <Routes>
              <Route exact path="/" element={<Home />}> </Route>
              <Route path="/createaccount" element={<CreateAccount />}></Route>
              <Route path="/login" element={<Login />}></Route>
            </Routes>
          </div>
        </div>
      </Router>
    );
  }
  
  export default App;