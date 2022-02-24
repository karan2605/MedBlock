import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Nav, Table, Button } from 'react-bootstrap';
import CreateAccount from '../../abis/CreateAccount.json';

const ipfsClient = require('ipfs-http-client')
const Web3 = require('web3');
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

class NotificationsPatient extends Component {

    async componentDidMount() {
        await this.loadBlockchainData()
    }

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
        const networkData = CreateAccount.networks[networkId];
        if(networkData) {
            const contract = new web3.eth.Contract(CreateAccount.abi, networkData.address);
            this.setState({contract: contract});
        } 
        else {
            window.alert('Smart contract not deployed to detected network.');
        }
    }

    async addData(notification) {

        const getHash = this.state.accountContract.methods.getHash().call({from: this.props.data.account})
        const hash = await getHash
        const raw_data = await ipfs.cat(hash)
        const data = JSON.parse(raw_data)

        if(notification.category === "Appointment") {

            const appointment = [JSON.stringify({
                date : notification.datetime.slice(0,10),
                time : notification.datetime.slice(19,23),
                place : notification.place,
                doctor : notification.doctor,
                notes : notification.notes
            })]

            const record = new File([JSON.stringify({
                id: data.id,
                firstName: data.firstName,
                lastName: data.lastName,
                dob: data.dob,
                email: data.email,
                nhsNumber : data.nhsNumber,
                gp: data.gp,
                bloodGroup: data.bloodGroup,
                existingHealth: data.existingHealth,
                appointments : {
                    appointment : appointment.concat(data.appointment)
                },
                notifications : {
                    notification : data.notification
                },
                prescriptions : {
                    prescription : data.prescription
                },
                requests: data.requests
            })], data.id+".json");

            ipfs.add(record, (error, result) => {
                console.log('Ipfs result', result)
                if(error) {
                console.error(error)
                return
                }
                this.state.accountContract.methods.setHash(result[0].hash, data.nhsNumber).send({from: this.props.data.account})
            })  
        }

        else if(notification.category === "Prescription") {

            const prescription = [JSON.stringify({
                date : notification.date,
                medicine : notification.medicine,
                pharmacy : notification.pharmacy,
                issuedBy : notification.issuedBy
            })]

            const record = new File([JSON.stringify({
                id: data.id,
                firstName: data.firstName,
                lastName: data.lastName,
                dob: data.dob,
                email: data.email,
                nhsNumber : data.nhsNumber,
                gp: data.gp,
                bloodGroup: data.bloodGroup,
                existingHealth: data.existingHealth,
                appointments : {
                    appointment : data.appointment
                },
                notifications : {
                    notification : data.notification
                },
                prescriptions : {
                    prescription : prescription.concat(data.prescription)
                },
                requests: data.requests
            })], data.id+".json");

            ipfs.add(record, (error, result) => {
                console.log('Ipfs result', result)
                if(error) {
                console.error(error)
                return
                }
                this.state.accountContract.methods.setHash(result[0].hash, data.nhsNumber).send({from: this.props.data.account})
            })  
        }  
    }

    fetchNotifications() {
        const notification_elements = [];
        const notifications = this.props.data.notifications
        console.log(notifications)
        
        for (let i = 0; i < notifications.length; i++) {
            const notification = JSON.parse(notifications[i])
            if(notification.category === "Appointment") {
                notification_elements.push(
                <tr>
                    <td>{notification.datetime}</td>
                    <td>{notification.category}</td>
                    <td>Validate Appointment with {notification.doctor} at {notification.place}. Notes: {notification.notes}</td>
                    <td><Button variant="success" onClick={this.addData(notification)}>Validate</Button></td>
                </tr>)
            }
            else {
                notification_elements.push(
                <tr>
                    <td>{notification.date}</td>
                    <td>{notification.category}</td>
                    <td>Validate Prescription with {notification.issuedBy} at {notification.pharmacy}. Notes: {notification.medicine}</td>
                    <td><Button variant="success" onClick={this.addData(notification)}>Validate</Button></td>
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
                            <Nav.Link as={Link} to= "/patientdash">Dashboard</Nav.Link>
                            <Nav.Link as={Link} to= "/patientdash/personaldata">Personal Data</Nav.Link>
                            <Nav.Link as={Link} to= "/patientdash/medicaldata">Medical Data</Nav.Link>
                            <Nav.Link as={Link} to= "/patientdash/datalog">Data Access Log</Nav.Link>
                            <Nav.Link active>Notifications</Nav.Link>
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

export default NotificationsPatient;