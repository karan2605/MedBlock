import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Nav, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import CreateAccount from '../../abis/CreateAccount.json';

// Connect to the IPFS using Infura
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

// Load Web3 module
const Web3 = require('web3');

class PersonalDataPatient extends Component {

    /**
     * Calls functions as soon as page is loaded
     */
    async componentDidMount() {
        await this.loadBlockchainData()
        await this.loadWeb3()
    }

    /**
     * Defines state variables to be used on page
     * @param {*} props - Global page properties object
     */
    constructor(props) {
        super(props)

        this.state = { 
            disabled : true,
            accountContract : null
        };
    }

    /**
     * Boilerplate code to load objects for MetaMask and Web3 onto the webpage
     * @returns True or False dependent if all MetaMask and Web3 objects has successfully loaded
     */
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

    /**
     * Boilerplate code to load smart contract functions onto page to be called upon
     */
    async loadBlockchainData() {
        const web3 = new Web3(window.ethereum);
        const networkId = await web3.eth.net.getId();
        const accounts = await web3.eth.getAccounts();
        this.setState({account: accounts[0]})
        const networkData = CreateAccount.networks[networkId];
        if(networkData) {
            const accountContract = new web3.eth.Contract(CreateAccount.abi, networkData.address);
            this.setState({accountContract : accountContract});
        } 
        else {
            window.alert('Smart contract not deployed to detected network.');
        }
    }   

    /**
     * Find the data that was changed on the form by comparing it to props variables.
     * Create a notification to the receptionist of the gp
     * Add notification to the record and upload record back to IPFS
     * Display modal showing pending transaction
     * @param {*} event - Object containing attributes of submitted form
     */
    async submitRequest(event) {
        event.preventDefault();
        const changed = []

        const fname = event.target[2].value
        const lname = event.target[3].value
        const dob = event.target[4].value
        const email = event.target[5].value

        if(fname !== this.props.data.firstName) {
            changed.push(this.props.data.firstName + "-" + fname)
        }
        else if(lname !== this.props.data.lastName) {
            changed.push(this.props.data.lastName + "-" + lname)
        }
        else if(dob !== this.props.data.dob) {
            changed.push(this.props.data.dob + "-" + dob)
        }
        else if(email !== this.props.data.email) {
            changed.push(this.props.data.email + "-" + email)
        }

        const notification = JSON.stringify({
            changedData : changed,
            senderId : this.props.data.id,
        })

        const getValidatorHash = this.state.accountContract.methods.findHashFromArea(this.props.data.gp).call({from: this.props.data.account})
        const validatorHash = await getValidatorHash;
        console.log(validatorHash)

        const getHash = this.state.accountContract.methods.getHashByAddr(validatorHash).call({from: this.props.data.account})
        const hash = await getHash
        const raw_data = await ipfs.cat(hash)
        const data = JSON.parse(raw_data)

        // add notification to record
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
            appointments : data.appointment,
            notifications : notification.concat(data.notifications),
            prescriptions : data.prescription,
            requests: data.requests
        })], data.id+".json");

        // send back to ipfs
        // update hash stored on blockchain
        ipfs.add(record, (error, result) => {
            console.log('Ipfs result', result)
            if(error) {
            console.error(error)
            return
            }
            this.state.accountContract.methods.setHashbyAddr(result[0].hash, validatorHash).send({from: this.props.data.account})
        })
    }

    enableForm() {
        this.setState({disabled : false})
    }

    render() {
        return (  
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a className="navbar-brand" href="#!"><i className="bi bi-box"></i>  MedBlock</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <span className="navbar-text justify-content-center">Personal Data</span>
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
                            <Nav.Link active>Personal Data</Nav.Link>
                            <Nav.Link as={Link} to= "/patientdash/medicaldata">Medical Data</Nav.Link>
                            <Nav.Link as={Link} to= "/patientdash/datalog">Data Access Log</Nav.Link>
                            <Nav.Link as={Link} to= "/patientdash/notifications">Notifications</Nav.Link>
                        </Nav>
                    </div>
                    
                    <div className="d-flex flex-lg-fill justify-content-around p-3 rounded-3 bg-light">
                    <div className="col-lg-5 col-md-5 col-sm-5 container">
                        <div className="d-flex justify-content-center align-items-center">
                            <div className="p-4 p-lg-5 bg-light rounded-3 flex-fill">
                                <h1 className="display-5 fw-bold justify-content-center">Personal Data</h1>
                                    <Form onSubmit={this.submitRequest.bind(this)}>
                                        <fieldset disabled={(this.state.disabled) ? "disabled" : ""}>
                                            <Form.Group className="mb-3" controlId="formBasicFirstName">
                                                <Form.Label>First Name:</Form.Label>
                                                <Form.Control type="text" defaultValue={this.props.data.firstName} name="fname"/>
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicLastName">
                                                <Form.Label>Last Name:</Form.Label>
                                                <Form.Control type="text" defaultValue={this.props.data.lastName} name="lname" />
                                            </Form.Group>

                                            <Form.Group controlId="DOB">
                                                <Form.Label>Date of Birth:</Form.Label>
                                                <Form.Control type="date" name="dob" defaultValue={this.props.data.dob} />
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>Email:</Form.Label>
                                                <Form.Control type="email" defaultValue={this.props.data.email} name="email" />
                                            </Form.Group>

                                            <Button variant="success" type="submit">
                                                Submit Data for Verification
                                            </Button>
                                            
                                        </fieldset>
                                            <p>&nbsp;</p>
                                            <Button variant="danger" onClick={this.enableForm.bind(this)}>
                                                Edit Data
                                            </Button>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PersonalDataPatient;