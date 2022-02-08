import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Nav, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import VerifyData from '../../abis/VerifyData.json';
import CreateAccount from '../../abis/CreateAccount.json';

const ipfsClient = require('ipfs-http-client')
const Web3 = require('web3');
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

class AddData extends Component {

    constructor(props) {
        super(props)

        this.state = { 
            disabled : true,
            values: [],
            contract : null,
            accountContract : null
        };
    }

    async loadBlockchainData() {
        const web3 = new Web3(window.ethereum);
        const networkId = await web3.eth.net.getId();
        const accounts = await web3.eth.getAccounts();
        this.setState({account: accounts[0]})
        const networkData = VerifyData.networks[networkId];
        if(networkData) {
            const contract = new web3.eth.Contract(VerifyData.abi, networkData.address);
            const accountContract = new web3.eth.Contract(CreateAccount.abi, networkData.address);
            this.setState({contract: contract, accountContract : accountContract});
        } 
        else {
            window.alert('Smart contract not deployed to detected network.');
        }
    }   

    onSubmitAppointment = (event) => {
        event.preventDefault();
        const validatorID = event.target[6].value;
        const notes = event.target[7].value;
        const place = event.target[4].value;

        //add notification to record
        const notification = JSON.stringify({
            datetime : event.target[1].value + " from : " + event.target[2].value + " to: " + event.target[3].value,
            category : "Appointment",
            notification : "Validate Appointment with "+ this.props.data.firstName + " " + 
                            this.props.data.lastName + " at " + place + " : " + notes
        })

        const getValidatorHash = this.state.accountContract.methods.returnNhsToAddr(validatorID).send({from: this.props.data.account})
        const validatorHash = getValidatorHash;

        const getHash = this.state.accountContract.methods.getHash().call({from: this.state.account})
        const hash = getHash
        const raw_data = ipfs.cat(hash)
        const data = JSON.parse(raw_data)
        console.log(data)

        // add notification to record
        



        // send back to ipfs
        // update hash stored on blockchain
        ipfs.add(data, (error, result) => {
            console.log('Ipfs result', result)
            if(error) {
            console.error(error)
            return
            }
            this.state.contract.methods.setHash(result[0].hash).send({from: validatorHash})
        })

    }

    onSubmitPrescription = (event) => {
        event.preventDefault();
        const validator = [event.target[5].value];
        const place = event.target[4].value
        this.state.contract.methods.addValidators(validator, place).send({from: this.props.data.account})

        const validatorHash = this.state.accountContract.methods.returnUserId(place, validator).send({from: this.props.data.account})
        //add notification to record
        const notification = new File([JSON.stringify({

        })])

        //send back to ipfs
        //update hash stored on blockchain
    }

    createUI() {
        return this.state.values.map((el, i) => 
            <div key={i}>
                <Form.Group className="mb-3" controlId="formBasicLastName">
                    <Form.Control type="text" placeholder="Medicine Name" name="medicineName" value={el||''} onChange={this.handleChange.bind(this, i)}/>
                </Form.Group>
                <span>  </span>
                <Form.Group className="mb-3" controlId="formBasicLastName">
                    <Form.Control as="textarea" rows={3} placeholder="Dosage Notes" name="notes" value={el||''} onChange={this.handleChange.bind(this, i)}/>
                </Form.Group>
                <span>  </span>
                <Button type='button' value='remove' onClick={this.removeClick.bind(this, i)} variant="danger">Remove Medicine</Button>
                <span>  </span>
            </div>          
        )
    }

    handleChange(i, event) {
        let values = [...this.state.values];
        values[i] = event.target.value;
        this.setState({ values });
    }
    
    addClick(){
        this.setState(prevState => ({ values: [...prevState.values, '']}))
    }

    removeClick(i){
        let values = [...this.state.values];
        values.splice(i,1);
        this.setState({ values });
    }

    render() {
        return (  
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a className="navbar-brand" href="#!"><i className="bi bi-box"></i>  MedBlock</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <span className="navbar-text justify-content-center">Add New Data</span>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <span className="navbar-text text-success p-2"> Account: { this.props.data.firstName} { this.props.data.lastName }</span>
                            <Link to="/logout" className="btn btn-danger">Log Out</Link>
                        </ul>
                    </div>
                </nav>
                
                <div className='d-flex m-2 rounded-6 align-items-stretch'>
                    <div className='d-flex p-3'>
                        <Nav className="flex-column pt-2 justify-content-start align-items-stretch bg-light rounded-3" variant="pills">
                            <Nav.Link><Link to= "/workerdash">Dashboard</Link></Nav.Link>
                            <Nav.Link><Link to= "/workerdash/personaldata">Personal Data</Link></Nav.Link>
                            <Nav.Link>Patient Data</Nav.Link>
                            <Nav.Link><Link to= "/workerdash/notifications">Notifications</Link></Nav.Link>
                            <Nav.Link active>Add New Data</Nav.Link>
                        </Nav>
                    </div>

                    <div className="col-lg-5 container">
                        <div className="d-flex justify-content-center align-items-center">
                            <div className="p-4 p-lg-5 bg-light rounded-3 flex-fill">
                                
                                <h1 className="display-5 fw-bold justify-content-center">Add New Data</h1>
                                <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
                                    <Tab eventKey="home" title="Prescription">
                                        <h2 className="display-10 fw-bold">Add Prescription</h2>
                                        <Form onSubmit={this.onSubmitPrescription}>
                                            <Form.Group controlId="Date">
                                                <Form.Label>Date:</Form.Label>
                                                <Form.Control type="date" name="dob" placeholder="date"/>
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicLastName">
                                                <Form.Control type="text" placeholder="Full Name" name="name"/>
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicLastName">
                                                <Form.Control type="number" placeholder="NHS Number" name="nhsNumber"/>
                                            </Form.Group>

                                            {this.createUI()}
                                            <p>&nbsp;</p>

                                            <Button type="button" value="AddMedicine" variant="warning" onClick={this.addClick.bind(this)}>Add Medicine</Button>
                                            
                                            <p>&nbsp;</p>

                                            <Form.Group className="mb-3" controlId="formBasicLastName">
                                                <Form.Control type="text" placeholder="Pharmacy" name="pharmacy"/>
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicLastName">
                                                <Form.Control type="text" placeholder="Issued By" name="issuedBy"/>
                                            </Form.Group>

                                            <br></br>

                                            <Button variant="success" type="submit">
                                                Submit for Verification
                                            </Button>
                                        </Form>

                                    </Tab>
                                    <Tab eventKey="profile" title="Appointment">
                                    <h2 className="display-10 fw-bold">Add Appointment</h2>
                                        <Form onSubmit={this.onSubmitAppointment}>
                                            <Form.Group controlId="Date">
                                                <Form.Label>Date:</Form.Label>
                                                <Form.Control type="date" name="dob" placeholder="date"/>
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>From:</Form.Label>
                                                <Form.Control type="time" placeholder="Time" name="timefrom"/>
                                                <Form.Label>To:</Form.Label>
                                                <Form.Control type="time" placeholder="Time" name="timeto"/>
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicLastName">
                                                <Form.Control type="text" placeholder="Place of Appointment" name="pOfAppointment"/>
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicLastName">
                                                <Form.Control type="text" placeholder="Patient Name" name="worker"/>
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicLastName">
                                                <Form.Control type="number" placeholder="NHS Number" name="nhsNumber"/>
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicLastName">
                                                <Form.Control as="textarea" rows={3} placeholder="Notes" name="notes"/>
                                            </Form.Group>
                                        </Form>
                                        <Button variant="success" type="submit">
                                            Submit for Verification
                                        </Button>
                                    </Tab>
                                </Tabs>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddData;