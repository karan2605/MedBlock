import React, { Component } from 'react';
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
import PersonalData from './AccessPersonal/PersonalData';
import MedicalData from './AccessMedical/MedicalData';
import AddData from './AddData/AddData';


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      account: null,
      firstName: null,
      lastName: null,
      dob : null,
      existingHealth : null,
      gp : null,
      appointments : null,
      notifications : null,
      requests : null
    };
  }
    
  render() {
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
                <Route path="/patientdash" element={<PatientDash data={this.state}/>}></Route>
                  <Route path="/patientdash/notifications" element={<Notifications data={this.state}/>}></Route>
                  <Route path="/patientdash/datalog" element={<DataLog data={this.state}/>}></Route>
                  <Route path="/patientdash/personaldata" element={<PersonalData data={this.state}/>}></Route>
                  <Route path="/patientdash/medicaldata" element={<MedicalData data={this.state}/>}></Route>
                <Route path="/workerdash" element={<WorkerDash />}></Route>
                  <Route path="/workerdash/notfications" element={<Notifications data={this.state}/>}></Route>
                  <Route path="/workerdash/adddata" element={<AddData data={this.state}/>}></Route>
                  <Route path="/workerdash/personaldata" element={<PersonalData data={this.state}/>}></Route>
              </Routes>
            </div>
          </div>
        </Router>
      );
    }
  }
  
  export default App;