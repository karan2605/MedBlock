import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Createaccount from './CreateAccount/CreateAccount';
import Login from './Login/Login';
import Home from './HomePage/Home';
import Logout from './LogOut/LogOut';
import PatientDash from './PatientDash/PatientDash';
import WorkerDash from './WorkerDash/WorkerDash';
import NotificationsPatient from './Notifications/NotificationsPatient';
import NotificationsWorker from './Notifications/NotificationsWorker';
import DataLog from './DataLog/DataLog';
import AccountSuccess from './CreateAccount/AccountSuccess';
import PersonalDataPatient from './PersonalData/PersonalDataPatient';
import PersonalDataWorker from './PersonalData/PersonalDataWorker';
import MedicalData from './AccessMedical/MedicalData';
import AddData from './AddData/AddData';
import AccessPersonal from './AccessPersonal/AccessPersonal';


class App extends Component {

  /**
   * Defines state variables to be used on page
   * @param {*} props - Global page properties object
   */
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
  
  /**
   * This is the root page of the website which defines the structure of the website
   * using the React-Router library, the URL path for each page is also defined within
   * each Route tag. Finally the props variables are passed to each page through the Route
   * element.
   * @returns 
   */
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
                  <Route path="/patientdash/notifications" element={<NotificationsPatient data={this.state}/>}></Route>
                  <Route path="/patientdash/datalog" element={<DataLog data={this.state}/>}></Route>
                  <Route path="/patientdash/personaldata" element={<PersonalDataPatient data={this.state}/>}></Route>
                  <Route path="/patientdash/medicaldata" element={<MedicalData data={this.state}/>}></Route>
                <Route path="/workerdash" element={<WorkerDash data={this.state}/>}></Route>
                  <Route path="/workerdash/notifications" element={<NotificationsWorker data={this.state}/>}></Route>
                  <Route path="/workerdash/adddata" element={<AddData data={this.state}/>}></Route>
                  <Route path="/workerdash/personaldata" element={<PersonalDataWorker data={this.state}/>}></Route>
                  <Route path="/workerdash/patientdata" element={<AccessPersonal data={this.state}/>}></Route>
              </Routes>
            </div>
          </div>
        </Router>
      );
    }
  }
  
  export default App;