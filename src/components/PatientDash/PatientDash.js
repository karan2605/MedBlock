import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Nav, Card, Button } from 'react-bootstrap';
import "./style.css";
import CreateAccount from '../../abis/CreateAccount.json';

const Web3 = require('web3');

class PatientDash extends Component {
    async componentDidMount() {
        await this.loadWeb3()
        await this.loadBlockchainData()
        await this.fetchData()
    }

    constructor(props) {
        super(props)
        this.state = {
            account: null
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
        const patientData = this.state.contract.methods.getHash().call({from: this.state.account})
        console.log(patientData.result)
    }
    
    render() {
        return (
            <body>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a className="navbar-brand" href="#!"><i className="bi bi-box"></i>  MedBlock</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                    
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <span className="navbar-text justify-content-start">Patient Dashboard</span>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <span className="navbar-text text-success p-2" > Account ID: { this.state.account }</span>
                            <Link to="/logout" className="btn btn-danger">Log Out</Link>
                        </ul>
                    </div>
                </nav>
                
                <div className='d-flex m-2 rounded-6 align-items-stretch'>
                    <div className='d-flex p-3'>
                        <Nav className="flex-column pt-2 justify-content-start align-items-stretch bg-light rounded-3" variant="pills" activeKey="link-1">
                            <Nav.Link to="/patientdash" eventKey="link-1">Dashboard</Nav.Link>
                            <Nav.Link eventKey="link-2">Personal Data</Nav.Link>
                            <Nav.Link eventKey="link-3">Medical Data</Nav.Link>
                            <Nav.Link href="/patientdash/datalog" eventKey="link-4">Data Access Log</Nav.Link>
                            <Nav.Link href="/patientdash/notfications" eventKey="link-5">Notifications</Nav.Link>
                            <Nav.Link eventKey="link-6">Add New Data</Nav.Link>
                        </Nav>
                    </div>
                    
                    <div className="d-flex flex-lg-fill justify-content-around p-3 rounded-3 bg-light">
                        
                            <Card className="card text-center rounded-3">
                            <Card.Header as="h5">Notifications <Button variant="success">Details</Button></Card.Header>
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
                            <Card.Header as="h5">Data Requests / Accesses <Button variant="success">Details</Button></Card.Header>
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
            </body>
        )
    }
}

export default PatientDash;