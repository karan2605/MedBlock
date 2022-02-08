import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Nav, Card, Button } from 'react-bootstrap';
import CreateAccount from '../../abis/CreateAccount.json';

const Web3 = require('web3');
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

class WorkerDash extends Component {

    async componentDidMount() {
        await this.loadWeb3()
        await this.loadBlockchainData()
        await this.fetchData()
    }

    constructor(props) {
        super(props)
        this.state = { 
            contract : null,
            account: null,
            firstName: null,
            lastName: null,
            dob: null,
            email: null,
            nhsNumber: null,
            placeOfWork: null,
            role: null,
            appointments : {
                date : null,
                time : null,
                place : null,
                patient : null,
                notes : null
            },
            notifications : {
                datetime: null,
                category: null,
                notification: null
            },
            requests: null
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
            nhsNumber : data.nhsNumber})

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
        this.props.data.placeOfWork = data.placeOfWork
        this.props.data.role = data.role
    }

    render() {
        return (
            <body>
                <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a class="navbar-brand" href="#!"><i class="bi bi-box"></i>  MedBlock</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <span class="navbar-text justify-content-center">Medical Worker Dashboard</span>
                        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                            <span className="navbar-text text-success p-2"> Account: { this.state.firstName} { this.state.lastName }</span>
                            <Link to="/logout" class="btn btn-danger">Log Out</Link>
                        </ul>
                    </div>
                </nav>
                
                <div className='d-flex m-2 rounded-6 align-items-stretch'>
                    <div className='d-flex p-3'>
                        <Nav className="flex-column pt-2 justify-content-start align-items-stretch bg-light rounded-3" variant="pills" >
                            <Nav.Link active>Dashboard</Nav.Link>
                            <Nav.Link><Link to= "/workerdash/personaldata">Personal Data</Link></Nav.Link>
                            <Nav.Link>Patient Data</Nav.Link>
                            <Nav.Link><Link to= "/workerdash/notifications">Notifications</Link></Nav.Link>
                            <Nav.Link><Link to= "/workerdash/adddata">Add New Data</Link></Nav.Link>
                        </Nav>
                    </div>
                    
                    <div class="d-flex flex-lg-fill justify-content-around p-3 rounded-3 bg-light">
                        
                        <Card class="card text-center rounded-3">
                        <Card.Header as="h5">Notifications <Button variant="success">Details</Button></Card.Header>
                        <Card.Body>
                            <Card class="card text-center rounded-6">
                                <Card.Body>
                                    Card 1
                                </Card.Body>
                            </Card>

                            <Card class="card text-center rounded-6">
                                <Card.Body>
                                    Card 2
                                </Card.Body>
                            </Card>

                            <Card class="card text-center rounded-6">
                                <Card.Body>
                                    Card 3
                                </Card.Body>
                            </Card>

                            <Card class="card text-center rounded-6">
                                <Card.Body>
                                    Card 4
                                </Card.Body>
                            </Card>

                            <Card class="card text-center rounded-6">
                                <Card.Body>
                                    Card 5
                                </Card.Body>
                            </Card>
                        </Card.Body>
                        </Card>

                        <Card class="card text-center rounded-6">
                        <Card.Header as="h5">Appointments <Button variant="success">Details</Button></Card.Header>
                        <Card.Body>
                            <Card class="card text-center rounded-6">
                                <Card.Body>
                                    Card 1
                                </Card.Body>
                            </Card>

                            <Card class="card text-center rounded-6">
                                <Card.Body>
                                    Card 2
                                </Card.Body>
                            </Card>

                            <Card class="card text-center rounded-6">
                                <Card.Body>
                                    Card 3
                                </Card.Body>
                            </Card>

                            <Card class="card text-center rounded-6">
                                <Card.Body>
                                    Card 4
                                </Card.Body>
                            </Card>

                            <Card class="card text-center rounded-6">
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

export default WorkerDash;