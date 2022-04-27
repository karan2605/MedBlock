import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import { Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import '../HomePage/Style.css';
import CreateAccount from '../../abis/CreateAccount.json';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

// Connect to the IPFS using Infura
const ipfsClient = require('ipfs-http-client')
const Web3 = require('web3');

// Load Web3 module
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

class Createaccount extends Component {

    /**
     * Calls functions as soon as page is loaded
     */
    async componentDidMount() {
        await this.loadWeb3()
        await this.loadBlockchainData()
    }
    
    /**
     * Defines state variables to be used on page
     * @param {*} props - Global page properties object
     */
    constructor(props) {
        super(props)
        this.state = {
            contract: null,
            web3: null,
            account: null,
            date: new Date(),
            nhsNumber: null,
            role: null,
            place: null,
            existingHealth: null,
            gp : null
        };

        this.options = [
            { value: 'Diabetes', label: 'Diabetes' },
            { value: 'High Blood Pressure', label: 'High Blood Pressure' },
            { value: 'Dementia', label: 'Dementia' },
            { value: 'Allergies', label: 'Allergies' },
            { value: 'Arthritis', label: 'Arthritis' },
            { value: 'Heart Disease', label: 'Heart Disease' }
        ]

        this.medicalRole = [
            { value: 'GP', label: 'GP' },
            { value: 'Surgeon', label: 'Surgeon' },
            { value: 'Receptionist', label: 'Receptionist' },
            { value: 'Nurse', label: 'Nurse' },
            { value: 'Physiotherapist', label: 'Physiotherapist' },
            { value: 'Consultant', label: 'Consultant' },
            { value: 'Pharmacist', label: 'Pharmacist' }
        ]

        this.placeOfWork = [
            { value: 'Stanmore Medical Centre', label: 'Stanmore Medical Centre' },
            { value: 'William Drive Medical Centre', label: 'William Drive Medical Centre' },
        ]
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
            const contract = new web3.eth.Contract(CreateAccount.abi, networkData.address);
            this.setState({contract: contract});
        } 
        else {
            window.alert('Smart contract not deployed to detected network.');
        }
    }

    /**
     * Called upon when patient account creation form is submitted. The JSON medical record is 
     * first created populated by the data entered in the form by the user. The record is then
     * stored on the IPFS and the IPFS CID stored on the blockchain
     * @param {*} event - Object containing attributes of submitted form
     */
    onSubmitPatient = (event) => {
        event.preventDefault();

        this.setState({ gp : event.target[6].value})

        const data = new File([JSON.stringify({
            id: this.state.account,
            firstName: event.target[1].value,
            lastName: event.target[2].value,
            dob: event.target[3].value,
            email: event.target[4].value,
            nhsNumber : event.target[5].value,
            gp: event.target[6].value,
            bloodGroup: event.target[7].value,
            existingHealth: this.state.existingHealth,
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
            requests: null
        })], this.state.account+".json");

        this.setState({nhsNumber : event.target[5].value})

        ipfs.add(data, (error, result) => {
            console.log('Ipfs result', result)
            if(error) {
            console.error(error)
            return
            }
            this.state.contract.methods.setHash(result[0].hash, this.state.nhsNumber, this.state.gp).send({from: this.state.account})
            .then(window.location.replace("http://localhost:3000/createaccount/success"))
        })
    };

    /**
     * Called upon when medical worker account creation form is submitted. The JSON medical record is 
     * first created populated by the data entered in the form by the user. The record is then
     * stored on the IPFS and the IPFS CID stored on the blockchain
     * @param {*} event - Object containing attributes of submitted form
     */
    onSubmitStaff = (event) => {
        event.preventDefault();

        const data = new File([JSON.stringify({
            id: this.state.account,
            firstName: event.target[1].value,
            lastName: event.target[2].value,
            dob: event.target[3].value,
            email: event.target[4].value,
            nhsNumber: event.target[5].value,
            placeOfWork: this.state.place,
            role: this.state.role,
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
                notification: null,
                senderId : null
            },
            requests: null
        })], this.state.account+".json");

        this.setState({nhsNumber : event.target[5].value})

        ipfs.add(data, (error, result) => {
            console.log('Ipfs result', result)
            if(error) {
            console.error(error)
            return
            }
            this.state.contract.methods.setHash(result[0].hash, this.state.nhsNumber, this.state.place).send({from: this.state.account})
            .then(window.location.replace("http://localhost:3000/createaccount/success"))
        })
    };

    setRole = (e) => {
        this.setState({ role: e });
    }

    setPlace= (e) => {
        this.setState({ place: e });
    }

    setExistingHealth= (e) => {
        this.setState({ existingHealth: e });
    }

    render() {
        return (
            <div>
                <link rel="stylesheet" href="bootstrap-multiselect.css" type="text/css" />
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container px-lg-5">
                    <a className="navbar-brand" href=" "><i className="bi bi-box"></i>  MedBlock</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
                            <li className="nav-item"><Link to='/login' className="nav-link">Login</Link></li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <div className="col-lg-5 col-md-5 col-sm-5 container">
                    <div className="d-flex justify-content-center align-items-center">
                        <div className="p-4 p-lg-5 bg-light rounded-3 flex-fill">
                            
                            <h1 className="display-5 fw-bold">Create Account</h1>
                            <p>Complete the form below to create a MedBlock account</p>
                            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
                                <Tab eventKey="home" title="Patient">
                                <h2 className="display-10 fw-bold">Personal Details</h2>
                                <Form onSubmit={this.onSubmitPatient}>
                                <Form.Group className="mb-3" controlId="formUniqueId">
                                    <Form.Label>Unique Identifier:</Form.Label>
                                    <Form.Control type="text" placeholder={this.state.account} name="Id" disabled/>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicFirstName">
                                    <Form.Control type="text" placeholder="First Name" name="fname"/>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicLastName">
                                    <Form.Control type="text" placeholder="Last Name" name="lname"/>
                                </Form.Group>

                                <Form.Group controlId="DOB">
                                    <Form.Label>Date of Birth:</Form.Label>
                                    <Form.Control type="date" name="dob" placeholder="Date of Birth"/>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="email" placeholder="Email Address" name="email"/>
                                </Form.Group>

                                <h2 className="display-10 fw-bold">Medical Details</h2>

                                <Form.Group className="mb-3" controlId="formBasicLastName">
                                    <Form.Control type="text" placeholder="NHS Number" name="nhsNumber"/>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicGpName">
                                    <Form.Control type="text" placeholder="GP Name" name="gp"/>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicBlood">
                                    <Form.Control type="text" placeholder="Blood Group" name="bloodgroup"/>
                                </Form.Group>
                                
                                <Form.Group className="mb-3" controlId="formMedicalCond">
                                    <Form.Label>Existing Health Conditions</Form.Label>
                                    <Select options={this.options} isMulti closeMenuOnSelect={false} components={makeAnimated()} onChange={this.setExistingHealth}/>
                                </Form.Group>
                                <br></br>

                                <Button variant="danger" type="submit">
                                    Create Account
                                </Button>
                                </Form>

                                </Tab>
                                <Tab eventKey="profile" title="Medical Worker">
                                <h2 className="display-10 fw-bold">Personal Details</h2>
                                    <Form onSubmit={this.onSubmitStaff}>
                                        <Form.Group className="mb-3" controlId="formUniqueId">
                                            <Form.Label>Unique Identifier:</Form.Label>
                                            <Form.Control type="text" placeholder={this.state.account} name="Id" disabled/>
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicFirstName">
                                            <Form.Control type="text" placeholder="First Name" name="fname"/>
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicLastName">
                                            <Form.Control type="text" placeholder="Last Name" name="lname"/>
                                        </Form.Group>

                                        <Form.Group controlId="DOB">
                                            <Form.Label>Date of Birth:</Form.Label>
                                            <Form.Control type="date" name="dob" placeholder="Date of Birth"/>
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Control type="email" placeholder="Email Address" name="email"/>
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicLastName">
                                            <Form.Control type="text" placeholder="NHS Staff Number" name="nhsNumber"/>
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formMedicalCond">
                                            <Form.Label>Place of Work</Form.Label>
                                            <Select options={this.placeOfWork} components={makeAnimated()} onChange={this.setPlace.bind(this)}/>
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formMedicalCond">
                                            <Form.Label>Role</Form.Label>
                                            <Select options={this.medicalRole} components={makeAnimated()} onChange={this.setRole.bind(this)}/>
                                        </Form.Group>

                                        <Button variant="danger" type="submit">
                                            Create Account
                                        </Button>
                                    </Form>
                                </Tab>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>
        )   
    }
}

export default Createaccount;