import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Nav, Card } from 'react-bootstrap';
import "./style.css";
import CreateAccount from '../../abis/CreateAccount.json';

// Connect to the IPFS using Infura
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

// Load Web3 module
const Web3 = require('web3');

class PatientDash extends Component {
    
    /**
     * Calls functions as soon as page is loaded
     */
    async componentDidMount() {
        await this.loadWeb3()
        await this.loadBlockchainData()
        await this.fetchData()
    }

    /**
     * Defines state variables to be used on page
     * @param {*} props - Global page properties object
     */
    constructor(props) {
        super(props)
        this.state = { 
            contract : null,
            priority : null,
            email : null,
            nhsNumber : null,
            account: null,
            firstName: null,
            lastName: null,
            dob : null,
            existingHealth : null,
            bloodGroup : null,
            gp : null,
            appointments : {
                appointment : {
                    date : null,
                    time : null,
                    place : null,
                    doctor : null,
                    notes : null
                }
            },
            notifications : {
                notification : {
                    datetime: null,
                    category: null,
                    notification: null,
                    senderId : null
                }
            },
            prescriptions : {
                prescription : {
                    date : null,
                    medicine : {
                        name: null,
                        dosageNotes : null
                    },
                    pharmacy : null,
                    issuedBy : null
                }
            },
            requests : null
        };
    }

    /**
     * Boilerplate code to load objects for MetaMask and Web3 onto the webpage
     * @returns True or False dependent if all MetaMask and Web3 objects has successfully loaded
     */
    async loadWeb3() {
        if (window.ethereum) {
            const accounts =  await window.ethereum.request({ method: 'eth_requestAccounts' });
            this.setState({account : accounts[0]})
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

    /**
     * Boilerplate code to load smart contract functions onto page to be called upon
     */
    async loadBlockchainData() {
        const web3 = new Web3(window.ethereum);
        const networkId = await web3.eth.net.getId();
        const networkData = CreateAccount.networks[networkId];
        if(networkData) {
            const contract = new web3.eth.Contract(CreateAccount.abi, networkData.address);
            this.setState({contract: contract});
        } 
        else {  
            window.alert('Smart contract not deployed to detected network.');
        }
    }

    /**
     * Fetches the patients medical record from the IPFS. The getHash smart contract method
     * is first called to fetch the patients CID, the cat method provided by js-IPFS then 
     * fetches the medical record. State variables are then assigned for the patients 
     * personal and medical details to be used throughout the webpage. Attributes are also
     * assigned to the props object to access the patients data throughout the login session
     * without having to query the IPFS again.
     */
    async fetchData() {
        const getHash = this.state.contract.methods.getHash().call({from: this.state.account})
        const hash = await getHash
        const raw_data = await ipfs.cat(hash)
        const data = JSON.parse(raw_data)

        console.log(data)

        this.setState({dob : data.dob, 
            firstName : data.firstName, 
            lastName : data.lastName, 
            gp : data.gp, 
            appointments : data.appointments, 
            requests : data.requests, 
            notifications : data.notifications, 
            email : data.email, 
            nhsNumber : data.nhsNumber,
            bloodGroup : data.bloodGroup, 
            existingHealth : data.existingHealth})

        this.props.data.account = this.state.account
        this.props.data.email = data.email
        this.props.data.nhsNumber = data.nhsNumber
        this.props.data.dob = data.dob
        this.props.data.firstName = data.firstName
        this.props.data.lastName = data.lastName
        this.props.data.gp = data.gp
        this.props.data.appointments = data.appointments
        this.props.data.requests = data.requests
        this.props.data.notifications = data.notifications
        this.props.data.bloodGroup = data.bloodGroup
        this.props.data.existingHealth = data.existingHealth
        this.props.data.prescriptions = data.prescriptions
    }

    /**
     * Fetches patients notifications from props and formats to be displayed on webpage.
     * Notifications may contain differing content so each format must be organised on the 
     * page appropriately. HTML table rows are created to organise the notifications, the 
     * rows are then appended to an array.
     * @returns List of HTML table row elements
     */
    fetchNotifications() {
        const notification_elements = [];
        const notifications = this.state.notifications

        if(notifications.length > 0) {
        
            for (let i = 0; i < notifications.length-1; i++) {
                const notification = JSON.parse(notifications[i])
                if(notification.category === "Appointment") {
                    notification_elements.push(
                    <Card>
                        <Card.Body><b>{notification.datetime}</b> <br></br> Validate Appointment with {notification.doctor}</Card.Body>
                    </Card>)
                }
                else if(notification.category === "Query Response") {
                    notification_elements.push(
                    <Card>
                        <Card.Body><b>{notification.datetime}</b> <br></br> Query Response from {notification.doctor}</Card.Body>
                    </Card>)
                }
                else {
                    notification_elements.push(
                    <Card>
                        <Card.Body><b>{notification.date}</b> <br></br> Validate Prescription issued by {notification.issuedBy}</Card.Body>
                    </Card>)
                }
            }
        }

        return (
            <Card.Body>
            {notification_elements}
            </Card.Body>
        )
    }

    /**
     * Fetches patients appointments from props and formats to be displayed on webpage.
     * HTML table rows are created to organise the appointments, the 
     * rows are then appended to an array.
     * @returns List of HTML table row elements
     */
    fetchAppointments() {
        const appointment_elements = [];
        
        if(this.state.appointments != null && this.state.appointments.length > 0) {
            const appointments = this.state.appointments
            for (let i = 0; i < appointments.length-1; i++) {
                const appointment = JSON.parse(appointments[i])
                appointment_elements.push(
                <Card>
                    <Card.Body><b>{appointment.date}</b> <br></br> Appointment with {appointment.doctor} <br></br> at {appointment.place}</Card.Body>
                </Card>)
            }

            return (
                <Card.Body>
                {appointment_elements}
                </Card.Body>
            )
        }
    }

    /**
     * Fetches patients data accesses from props and formats to be displayed on webpage.
     * HTML table rows are created to organise the data accesses, the 
     * rows are then appended to an array.
     * @returns List of HTML table row elements
     */
    fetchAccesses() {
        const access_elements = [];
        const accesses = this.state.requests

        if(this.state.requests != null && this.state.requests.length > 0) {
            for (let i = 0; i < accesses.length-1; i++) {
                const access = JSON.parse(accesses[i])
                access_elements.push(
                <Card>
                    <Card.Body><b>{access.datetime}</b> <br></br> Data accessed by {access.accessor}</Card.Body>
                </Card>)
            }

            return (
                <Card.Body>
                {access_elements}
                </Card.Body>
            )
        }
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a className="navbar-brand" href="#!"><i className="bi bi-box"></i>  MedBlock</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <span className="navbar-text justify-content-start">Patient Dashboard</span>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <span className="navbar-text text-success p-2"> Account: { this.state.firstName} { this.state.lastName }</span>
                            <Link to="/logout" className="btn btn-danger">Log Out</Link>
                        </ul>
                    </div>
                </nav>
                
                <div className='d-flex m-2 rounded-6 align-items-stretch'>
                    <div className='d-flex p-3'>
                        <Nav className="flex-column pt-2 justify-content-start align-items-stretch bg-light rounded-3" variant="pills">
                            <Nav.Link active>Dashboard</Nav.Link>
                            <Nav.Link as={Link} to= "/patientdash/personaldata">Personal Data</Nav.Link>
                            <Nav.Link as={Link} to= "/patientdash/medicaldata">Medical Data</Nav.Link>
                            <Nav.Link as={Link} to= "/patientdash/datalog">Data Access Log</Nav.Link>
                            <Nav.Link as={Link} to= "/patientdash/notifications">Notifications</Nav.Link>
                        </Nav>
                    </div>
                    
                    <div className="d-flex flex-lg-fill justify-content-around p-3 rounded-3 bg-light">
                            <Card className="card text-center rounded-3">
                            <Card.Header as="h5">Notifications <Link to="/patientdash/notifications" className="btn btn-primary">Details</Link></Card.Header>
                                {this.fetchNotifications()}
                            </Card>

                            <Card className="card text-center rounded-6">
                            <Card.Header as="h5">Appointments</Card.Header>
                                {this.fetchAppointments()}
                            </Card>
                            

                            <Card className="card text-center rounded-6">
                            <Card.Header as="h5">Data Requests / Accesses <Link to="/patientdash/datalog" className="btn btn-primary">Details</Link></Card.Header>
                                {this.fetchAccesses()}
                            </Card>
                    </div>
                </div>
            </div>
        )
    }
}

export default PatientDash;