import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Createaccount from './CreateAccount/CreateAccount';
import Login from './Login/Login';
import Home from './HomePage/Home';
import Logout from './LogOut/LogOut';
import PatientDash from './PatientDash/PatientDash';
import WorkerDash from './WorkerDash/WorkerDash';
import Notifications from './Notifications/Notifications';
import DataLog from './DataLog/DataLog';
import AccountSuccess from './CreateAccount/AccountSuccess';

function App() {
  
    return (
      
      <Router>
        <div className="App">
          <div className="content">
            <Routes>
              <Route exact path="/" element={<Home />}> </Route>
              <Route path="/createaccount" element={<Createaccount />}></Route>
                <Route path="/createaccount/success" element={<AccountSuccess/>}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/logout" element={<Logout />}></Route>
              <Route path="/patientdash" element={<PatientDash />}></Route>
                <Route path="/patientdash/notfications" element={<Notifications/>}></Route>
                <Route path="/patientdash/datalog" element={<DataLog/>}></Route>
              <Route path="/workerdash" element={<WorkerDash />}></Route>
                <Route path="/workerdash/notfications" element={<Notifications/>}></Route>
               

              
            </Routes>
          </div>
        </div>
      </Router>
    );
  }
  
  export default App;