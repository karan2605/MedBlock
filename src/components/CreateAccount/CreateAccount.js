import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import '../HomePage/Style.css';
import CreateAccount from '../../abis/CreateAccount.json';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const ipfsClient = require('ipfs-http-client')
const Web3 = require('web3');
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

class Createaccount extends Component {

    async componentDidMount() {
        await this.loadWeb3()
        await this.loadBlockchainData()
    }
    
    constructor(props) {
        super(props)
        this.state = {
            contract: null,
            web3: null,
            account: null,
            date: new Date(),
            field: [],
            list: [{value:'One',selected:true},{value:'Two'},{value:'Three'},{value:'Four',label:'Four Label'}]
        };

        this.options = [
            { value: 'Diabetes', label: 'Diabetes' },
            { value: 'High Blood Pressure', label: 'High Blood Pressure' },
            { value: 'Dementia', label: 'Dementia' }
          ]
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

    onSubmit = (event) => {
        event.preventDefault();

        const data = new File([JSON.stringify({
            id: event.target[0].value,
            firstName: event.target[1].value,
            lastName: event.target[2].value,
            dob: event.target[3].value,
            email: event.target[4].value,
            gp: event.target[5].value,
            bloodGroup: event.target[6].value,
            existingHealth: event.target[7].value,
            appointments: null,
            notifications: null,
            requests: null
        })], event.target[0].value+".json");

        ipfs.add(data, (error, result) => {
            console.log('Ipfs result', result)
            if(error) {
            console.error(error)
            return
            }
            this.state.contract.methods.setHash(result[0].hash).send({from: this.state.account}).then(window.location.replace("http://localhost:3000/createaccount/success"))
        })
    };

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
                        <div className="p-4 p-lg-5 bg-light rounded-3">
                            
                            <h1 className="display-5 fw-bold">Create Account</h1>
                            <p>Complete the form below to create a MedBlock account</p>
                            <h2 className="display-10 fw-bold">Personal Details</h2>

                            <Form onSubmit={this.onSubmit}>
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

                                <Form.Group className="mb-3" controlId="formBasicGpName">
                                    <Form.Control type="text" placeholder="GP Name" name="gp"/>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicBlood">
                                    <Form.Control type="text" placeholder="Blood Group" name="bloodgroup"/>
                                </Form.Group>
                                
                                <Form.Group className="mb-3" controlId="formMedicalCond">
                                    <Form.Label>Existing Health Conditions</Form.Label>
                                    <Select options={this.options} isMulti closeMenuOnSelect={false} components={makeAnimated()}/>
                                </Form.Group>
                                <br></br>

                                <Button variant="danger" type="submit">
                                    Create Account
                                </Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        )   
    }
}

export default Createaccount;