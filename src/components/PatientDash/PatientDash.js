import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Nav, Card, Button } from 'react-bootstrap';
import "./style.css";
import CreateAccount from '../../abis/CreateAccount.json';

const Web3 = require('web3');
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

class PatientDash extends Component {
    async componentDidMount() {
        await this.loadWeb3()
        await this.loadBlockchainData()
        await this.fetchData()
    }

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

    async fetchData() {
        const getHash = this.state.contract.methods.getHash().call({from: this.state.account})
        const hash = await getHash
        const raw_data = await ipfs.cat(hash)
        const data = JSON.parse(raw_data)

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
                            <Card.Header as="h5">Notifications <Link to="/patientdash/notification" className="btn btn-primary">Details</Link></Card.Header>
                            <Card.Body>
                                <Card className="card text-center rounded-6">
                                    <Card.Body>
                                        Card 1
                                    </Card.Body>
                                </Card>

                                <Card className="card text-center rounded-6">
                                    <Card.Body>
                                        Card 2
                                    </Card.Body>
                                </Card>

                                <Card className="card text-center rounded-6">
                                    <Card.Body>
                                        Card 3
                                    </Card.Body>
                                </Card>

                                <Card className="card text-center rounded-6">
                                    <Card.Body>
                                        Card 4
                                    </Card.Body>
                                </Card>

                                <Card className="card text-center rounded-6">
                                    <Card.Body>
                                        Card 5
                                    </Card.Body>
                                </Card>
                            </Card.Body>
                            </Card>

                            <Card className="card text-center rounded-6">
                            <Card.Header as="h5">Appointments <Button variant="success">Details</Button></Card.Header>
                            <Card.Body>
                                <Card className="card text-center rounded-6">
                                    <Card.Body>
                                        Card 1
                                    </Card.Body>
                                </Card>

                                <Card className="card text-center rounded-6">
                                    <Card.Body>
                                        Card 2
                                    </Card.Body>
                                </Card>

                                <Card className="card text-center rounded-6">
                                    <Card.Body>
                                        Card 3
                                    </Card.Body>
                                </Card>

                                <Card className="card text-center rounded-6">
                                    <Card.Body>
                                        Card 4
                                    </Card.Body>
                                </Card>

                                <Card className="card text-center rounded-6">
                                    <Card.Body>
                                        Card 5
                                    </Card.Body>
                                </Card>
                            </Card.Body>
                            </Card>
                            

                            <Card className="card text-center rounded-6">
                            <Card.Header as="h5">Data Requests / Accesses <Link to="/patientdash/" className="btn btn-primary">Details</Link></Card.Header>
                            <Card.Body>
                                <Card className="card text-center rounded-6">
                                    <Card.Body>
                                        Card 1
                                    </Card.Body>
                                </Card>

                                <Card className="card text-center rounded-6">
                                    <Card.Body>
                                        Card 2
                                    </Card.Body>
                                </Card>

                                <Card className="card text-center rounded-6">
                                    <Card.Body>
                                        Card 3
                                    </Card.Body>
                                </Card>

                                <Card className="card text-center rounded-6">
                                    <Card.Body>
                                        Card 4
                                    </Card.Body>
                                </Card>

                                <Card className="card text-center rounded-6">
                                    <Card.Body>
                                        Card 5
                                    </Card.Body>
                                </Card>
                            </Card.Body>
                            </Card>
                    </div>
                </div>
            </div>
        )
    }
}

export default PatientDash;