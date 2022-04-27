import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Nav, Button, Modal } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import CreateAccount from '../../abis/CreateAccount.json';

// Connect to the IPFS using Infura
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

// Load Web3 module
const Web3 = require('web3');

class AccessPersonal extends Component {

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
            showModal : false,
            accountContract : null,
            account : null,
            disabled : true,
            nhsNumber : null,
            gp : null,
            bloodGroup : null,
            existingHealth : null,
            id : null,
            firstName : null,
            lastName : null,
            dob : null,
            email : null,
            enteredNhs : null
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
            const contract = new web3.eth.Contract(CreateAccount.abi, networkData.address);
            this.setState({accountContract: contract});
        } 
        else {
            window.alert('Smart contract not deployed to detected network.');
        }
    }

    /**
     * Finds a patient based on the NHS number entered by the user.
     * Calls upon a smart contract function to first fetch the blockchain address,
     * a second function then fetches the IPFS CID.
     * A notification is added to the users record to notify them of the data access.
     * @param {*} event - Object containing attributes of submitted form
     */
    async findPatient(event) {
        event.preventDefault();

        const getPatientHash = this.state.accountContract.methods.returnNhsToAddr(event.target[0].value).call({from: this.props.data.account})
        const patientHash = await getPatientHash;

        const getHash = this.state.accountContract.methods.getHashByAddr(patientHash).call({from: this.props.data.account})
        const hash = await getHash

        if (hash) {
            const raw_data = await ipfs.cat(hash)
            const data = JSON.parse(raw_data)

            var today = new Date();
            var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            var dateTime = date+' '+time;

            // add access to users medical record
            const access = [JSON.stringify({
                datetime : dateTime,
                accessor : this.props.data.firstName + " " + this.props.data.lastName,
                type : "Personal and Medical",
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
                    notification : data.notifications
                },
                prescriptions : {
                    prescription : data.prescription
                },
                requests: access.concat(data.requests)
            })], data.id+".json");

            // send back to ipfs
            // update hash stored on blockchain
            ipfs.add(record, (error, result) => {
                console.log('Ipfs result', result)
                if(error) {
                console.error(error)
                return
                }
                this.state.accountContract.methods.setHashbyAddr(result[0].hash, data.id).send({from: this.props.data.account})
            })

            this.setState({
                nhsNumber : data.nhsNumber,
                gp : data.gp,
                bloodGroup : data.bloodGroup,
                existingHealth : data.existingHealth,
                id : data.id,
                firstName : data.firstName,
                lastName : data.lastName,
                dob : data.dob,
                email : data.email
            })
        }
        else {
            this.setState({ showModal : true})
        }
    }

    /**
     * Handles the opening and closing of the pop-out modal window
     * which appears if no user with the specified NHS number is found.
     */
    handleClose() {
        this.setState({ showModal : false})
    }

  render() {
    return (  
        <div>
            <Modal show={this.state.showModal} onHide={this.handleClose.bind(this)}>
                <Modal.Header closeButton>
                <Modal.Title>Patient not Found</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                <Button variant="danger" onClick={this.handleClose.bind(this)}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>

            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="#!"><i className="bi bi-box"></i>  MedBlock</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <span className="navbar-text justify-content-center">Patient Data</span>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <span className="navbar-text text-success p-2"> Account: { this.props.data.firstName} { this.props.data.lastName }</span>
                        <Link to="/logout" className="btn btn-danger">Log Out</Link>
                    </ul>
                </div>
            </nav>
            
            <div className='d-flex m-2 rounded-6 align-items-stretch'>
                <div className='d-flex p-3'>
                    <Nav className="flex-column pt-2 justify-content-start align-items-stretch bg-light rounded-3" variant="pills" >
                        <Nav.Link as={Link} to= "/workerdash">Dashboard</Nav.Link>
                        <Nav.Link as={Link} to= "/workerdash/personaldata">Personal Data</Nav.Link>
                        <Nav.Link active>Patient Data</Nav.Link>
                        <Nav.Link as={Link} to= "/workerdash/notifications">Notifications</Nav.Link>
                        <Nav.Link as={Link} to= "/workerdash/adddata">Add New Data</Nav.Link>
                    </Nav>
                </div>

                <div className="col-sm-3 container">
                    <div className="d-flex justify-content-center align-items-center">
                        <div className="p-1 p-lg-5 bg-light rounded-3 flex-fill">
                            <h1 className="display-5 fw-bold">Find Patient</h1>
                                <Form onSubmit={this.findPatient.bind(this)}> 
                                    <Form.Group className="mb-3" controlId="formNhsNumber">
                                        <Form.Label>NHS Number:</Form.Label>
                                        <Form.Control type="text" name="nhsNumber"/>
                                    </Form.Group>

                                    <Button variant="warning" type="submit">
                                        Find Patient
                                    </Button>
                                </Form>
                            </div>
                    </div>
                </div>

                <div className="d-flex flex-lg-fill justify-content-around p-3 rounded-3 bg-light">
                    <div className="col-lg-5 col-md-5 col-sm-5 container">
                        <div className="d-flex justify-content-center align-items-center">
                            <div className="p-4 p-lg-5 bg-light rounded-3 flex-fill">
                                    <h1 className="display-5 fw-bold">Personal Data</h1>
                                    <Form>
                                        <Form.Group className="mb-3" controlId="formUniqueId">
                                            <Form.Label>Unique Identifier:</Form.Label>
                                            <Form.Control type="text" value={this.state.id} name="Id" disabled/>
                                        </Form.Group>
                                        <fieldset disabled={(this.state.disabled) ? "disabled" : ""}>
                                            <Form.Group className="mb-3" controlId="formBasicFirstName">
                                                <Form.Label>First Name:</Form.Label>
                                                <Form.Control type="text" value={this.state.firstName} name="fname" />
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicLastName">
                                                <Form.Label>Last Name:</Form.Label>
                                                <Form.Control type="text" value={this.state.lastName} name="lname" />
                                            </Form.Group>

                                            <Form.Group controlId="DOB">
                                                <Form.Label>Date of Birth:</Form.Label>
                                                <Form.Control type="date" name="dob" value={this.state.dob} />
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>Email:</Form.Label>
                                                <Form.Control type="email" value={this.state.email} name="email" />
                                            </Form.Group>
                                        </fieldset>
                                    </Form>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-5 col-md-5 col-sm-5 container">
                        <div className="d-flex justify-content-center align-items-center">
                            <div className="p-4 p-lg-5 bg-light rounded-3 flex-fill">
                            <h1 className="display-5 fw-bold">Medical Data</h1>
                                    <Form>
                                        <Form.Group className="mb-3" controlId="formBasicBlood">
                                            <Form.Label>NHS Number:</Form.Label>
                                            <Form.Control type="text" value={this.state.nhsNumber} name="nhsNumber" disabled/>
                                        </Form.Group>
                                        <fieldset disabled={(this.state.disabled) ? "disabled" : ""}>
                                            <Form.Group className="mb-3" controlId="formBasicGpName">
                                                <Form.Label>GP:</Form.Label>
                                                <Form.Control type="text" value={this.state.gp} name="gp"/>
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicBlood">
                                                <Form.Label>Blood Group:</Form.Label>
                                                <Form.Control type="text" value={this.state.bloodGroup} name="bloodgroup"/>
                                            </Form.Group>
                                            
                                            <Form.Group className="mb-3" controlId="formMedicalCond">
                                                <Form.Label>Existing Health Conditions</Form.Label>
                                                <Select options={this.options} isMulti closeMenuOnSelect={false} components={makeAnimated()} value={this.state.existingHealth} isDisabled={(this.state.disabled) ? "disabled" : ""}/>
                                            </Form.Group>
                                        </fieldset>
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

export default AccessPersonal;