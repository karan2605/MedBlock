import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Nav, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

class AccessPersonal extends Component {

  constructor(props) {
      super(props)

      this.state = { 
          disabled : true,
          nhsNumber : null,
          gp : null,
          bloodGroup : null,
          existingHealth : null,
          id : null,
          firstName : null,
          lastName : null,
          dob : null,
          email : null
      };
  }

  async findPatient(event) {
    const getPatientHash = this.state.accountContract.methods.returnNhsToAddr(event.target[0].value).call({from: this.props.data.account})
    const patientHash = await getPatientHash;

    const getHash = this.state.accountContract.methods.getHashByAddr(patientHash).call({from: this.props.data.account})
    const hash = await getHash
    const raw_data = await ipfs.cat(hash)
    const data = JSON.parse(raw_data)

    this.setState({
        nhsNumber : data.nhsNumber,
        gp : data.gp,
        bloodGroup : data.bloodGroup,
        existingHealth : data.existingHealth,
        id : data.account,
        firstName : data.firstName,
        lastName : data.lastName,
        dob : data.dob,
        email : data.email
    })

    return(this.showData())
  }

  async showData() {
      
      return (
        <div className="d-flex flex-lg-fill justify-content-around p-3 rounded-3 bg-light">
        <div className="col-lg-5 col-md-5 col-sm-5 container">
        <h1 className="display-5 fw-bold">Find Patient</h1>
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
                                    <Select options={this.options} isMulti closeMenuOnSelect={false} components={makeAnimated()} value={this.props.data.existingHealth} isDisabled={(this.state.disabled) ? "disabled" : ""}/>
                                </Form.Group>
                            </fieldset>
                        </Form>
                    </div>
                </div>
            </div>

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
        </div>
      )
  }

  render() {
    return (  
        <div>
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

                <div className="d-flex flex-lg-fill justify-content-around p-3 rounded-3 bg-light">
               
                    <div className="col-lg-5 col-md-5 col-sm-5 container">
                    <h1 className="display-5 fw-bold">Find Patient</h1>
                        <Form onSubmit={this.findPatient}> 
                            <Form.Group className="mb-3" controlId="formBasicBlood">
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
            </div>
        )
    }
}

export default AccessPersonal;