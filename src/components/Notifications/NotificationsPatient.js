import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Nav, Table, Button, Modal } from 'react-bootstrap';
import CreateAccount from '../../abis/CreateAccount.json';

const ipfsClient = require('ipfs-http-client')
const Web3 = require('web3');
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

class NotificationsPatient extends Component {

    async componentDidMount() {
        await this.loadBlockchainData()
        await this.loadWeb3()
    }

    constructor(props) {
        super(props);

        this.state = {
            account : null,
            contract : null,
            show : false
        }
    }

    async loadWeb3() {
        if (window.ethereum) {
            await window.ethereum.request({ method : 'eth_requestAccounts' });
            window.web3 = new Web3(window.ethereum);
            return true;
        }
        else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider)
        }
        else {
            window.alert('Non-Ethereum browser detected. You should consider trying MetaMask')
            return false;
        }
    }

    handleClose = () => {
        this.setState({ show : false })
    };

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

    async showModal() {

        return (
            <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Transaction Verified</Modal.Title>
                </Modal.Header>
                <Modal.Body>Your transaction has been verified by the network</Modal.Body>
                <Modal.Footer>
                <Button variant="danger" onClick={this.handleClose}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
        )
    }

    async addData(notification) {

        if(notification.category === "Appointment") {

            const appointment = [JSON.stringify({
                date : notification.datetime.slice(0,10),
                time : notification.datetime.slice(19,23),
                place : notification.place,
                doctor : notification.doctor,
                notes : notification.notes
            })]

            const record = new File([JSON.stringify({
                id: this.props.data.account,
                firstName: this.props.data.firstName,
                lastName: this.props.data.lastName,
                dob: this.props.data.dob,
                email: this.props.data.email,
                nhsNumber : this.props.data.nhsNumber,
                gp: this.props.data.gp,
                bloodGroup: this.props.data.bloodGroup,
                existingHealth: this.props.data.existingHealth,
                appointments : {
                    appointment : appointment.concat(this.props.data.appointment)
                },
                notifications : {
                    notification : this.props.data.notifications
                },
                prescriptions : {
                    prescription : this.props.data.prescription
                },
                requests: this.props.data.requests
            })], this.props.data.account+".json");

            ipfs.add(record, (error, result) => {
                console.log('Ipfs result', result)
                if(error) {
                console.error(error)
                return
                }
                this.state.contract.methods.setHash(result[0].hash, this.props.data.nhsNumber).send({from: this.props.data.account})
                .then(this.setState({show : true}))
                .then(this.showModal)
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
                id: this.props.data.account,
                firstName: this.props.data.firstName,
                lastName: this.props.data.lastName,
                dob: this.props.data.dob,
                email: this.props.data.email,
                nhsNumber : this.props.data.nhsNumber,
                gp: this.props.data.gp,
                bloodGroup: this.props.data.bloodGroup,
                existingHealth: this.props.data.existingHealth,
                appointments : {
                    appointment : this.props.data.appointment
                },
                notifications : {
                    notification : this.props.data.notification
                },
                prescriptions : {
                    prescription : prescription.concat(this.props.data.prescription)
                },
                requests: this.props.data.requests
            })], this.props.data.account+".json");

            ipfs.add(record, (error, result) => {
                console.log('Ipfs result', result)
                if(error) {
                console.error(error)
                return
                }
                this.state.contract.methods.setHash(result[0].hash, this.props.data.nhsNumber).send({from: this.props.data.account})
                .then(this.setState({show : true}))
                .then(this.showModal)
            })  
        }  
    }

    fetchNotifications() {
        const notification_elements = [];
        const notifications = this.props.data.notifications.notification
        
        for (let i = 0; i < notifications.length-1; i++) {
            const notification = JSON.parse(notifications[i])
            if(notification.category === "Appointment") {
                notification_elements.push(
                <tr>
                    <td>{notification.datetime}</td>
                    <td>{notification.category}</td>
                    <td>Validate Appointment with {notification.doctor} at {notification.place}. Notes: {notification.notes}</td>
                    <td><Button variant="success" onClick={() => { this.addData(notification) }}>Validate</Button>
                    <Button variant="danger" >Query</Button></td>
                </tr>)
            }
            else {
                notification_elements.push(
                <tr>
                    <td>{notification.date}</td>
                    <td>{notification.category}</td>
                    <td>Validate Prescription with {notification.issuedBy} at {notification.pharmacy}. Notes: {notification.medicine}</td>
                    <td><Button variant="success" onClick={() => { this.addData(notification) }}>Validate</Button>
                    <Button variant="danger" >Query</Button></td>
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
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a className="navbar-brand" href="#!"><i className="bi bi-box"></i>  MedBlock</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <span className="navbar-text justify-content-center">Notifications</span>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <span className="navbar-text text-success p-2"> Account: { this.props.data.firstName} { this.props.data.lastName }</span>
                            <Link to="/logout" className="btn btn-danger">Log Out</Link>
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
                    
                    <div className="d-flex flex-lg-fill justify-content-around p-3 rounded-3 bg-light">
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