import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Nav, Table, Button } from 'react-bootstrap';
import VerifyData from '../../abis/VerifyData.json';

const Web3 = require('web3');

class NotificationsWorker extends Component {

    constructor(props) {
        super(props);

        this.state = {
            contract : null
        }
    }

    async loadBlockchainData() {
        const web3 = new Web3(window.ethereum);
        const networkId = await web3.eth.net.getId();
        const accounts = await web3.eth.getAccounts();
        this.setState({account: accounts[0]})
        const networkData = VerifyData.networks[networkId];
        if(networkData) {
            const contract = new web3.eth.Contract(VerifyData.abi, networkData.address);
            this.setState({contract: contract});
        } 
        else {
            window.alert('Smart contract not deployed to detected network.');
        }
    }

    fetchNotifications() {
        const notification_elements = [];
        const notifications = this.props.data.notifications
        
        for (let i = 0; i < notifications.length-1; i++) {
            const notification = JSON.parse(notifications[i])
            if(notification.category === "Appointment") {
                notification_elements.push(
                <tr>
                    <td>{notification.datetime}</td>
                    <td>{notification.category}</td>
                    <td>Validate Appointment with {notification.doctor}. Notes: {notification.notes}</td>
                    <td><Button variant="success" onClick={() => { this.addData(notification) }}>Validate</Button></td>
                </tr>)
            }
            else {
                notification_elements.push(
                <tr>
                    <td>{notification.datetime}</td>
                    <td>{notification.category}</td>
                    <td>Validate Query from {notification.patient} for {notification.patient_notification}. Query: {notification.notes}</td>
                    <td><Button variant="success" onClick={() => { this.addData(notification) }}>Validate</Button></td>
                </tr>)
            }
        }

        return (
            <tbody>
                {notification_elements}
            </tbody>
        )
    }

    render() {
        return (
            <body>
                <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a class="navbar-brand" href="#!"><i class="bi bi-box"></i>  MedBlock</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <span class="navbar-text justify-content-center">Notifications</span>
                        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                            <span className="navbar-text text-success p-2"> Account: { this.props.data.firstName} { this.props.data.lastName }</span>
                            <Link to="/logout" class="btn btn-danger">Log Out</Link>
                        </ul>
                    </div>
                </nav>
                
                <div className='d-flex m-2 rounded-6 align-items-stretch'>
                    <div className='d-flex p-3'>
                        <Nav className="flex-column pt-2 justify-content-start align-items-stretch bg-light rounded-3" variant="pills">
                            <Nav.Link as={Link} to= "/workerdash">Dashboard</Nav.Link>
                            <Nav.Link as={Link} to= "/workerdash/personaldata">Personal Data</Nav.Link>
                            <Nav.Link as={Link} to="/workerdash/patientdata"> Patient Data</Nav.Link>
                            <Nav.Link active>Notifications</Nav.Link>
                            <Nav.Link as={Link} to="/workerdash/adddata">Add New Data</Nav.Link>
                        </Nav>
                    </div>
                    
                    <div class="d-flex flex-lg-fill justify-content-around p-3 rounded-3 bg-light">
                    <Table Responsive bordered>
                        <thead>
                            <tr>
                            <th>Date/Time</th>
                            <th>Category</th>
                            <th>Notfication</th>
                            <th>Action</th>
                            </tr>
                        </thead>

                        {this.fetchNotifications()}
                        
                        </Table>
                    </div>
                </div>
            </body>
        )
    }
}

export default NotificationsWorker;