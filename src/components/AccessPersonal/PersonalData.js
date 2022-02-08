import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Nav, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

class PersonalData extends Component {

  constructor(props) {
      super(props)

      this.state = { 
          disabled : true
      };
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
                        <Nav.Link><Link to= "/patientdash">Dashboard</Link></Nav.Link>
                        <Nav.Link active>Personal Data</Nav.Link>
                        <Nav.Link><Link to= "/patientdash/medicaldata">Medical Data</Link></Nav.Link>
                        <Nav.Link><Link to= "/patientdash/datalog">Data Access Log</Link></Nav.Link>
                        <Nav.Link><Link to= "/patientdash/notifications">Notifications</Link></Nav.Link>
                    </Nav>
                </div>
                
                <div className="d-flex flex-lg-fill justify-content-around p-3 rounded-3 bg-light">
                <div className="col-lg-5 col-md-5 col-sm-5 container">
                    <div className="d-flex justify-content-center align-items-center">
                        <div className="p-4 p-lg-5 bg-light rounded-3 flex-fill">
                            <h1 className="display-5 fw-bold justify-content-center">Personal Data</h1>
                                <Form>
                                    <Form.Group className="mb-3" controlId="formUniqueId">
                                        <Form.Label>Unique Identifier:</Form.Label>
                                        <Form.Control type="text" value={this.props.data.account} name="Id" disabled/>
                                    </Form.Group>
                                    <fieldset disabled={(this.state.disabled) ? "disabled" : ""}>
                                        <Form.Group className="mb-3" controlId="formBasicFirstName">
                                            <Form.Label>First Name:</Form.Label>
                                            <Form.Control type="text" value={this.props.data.firstName} name="fname" />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicLastName">
                                            <Form.Label>Last Name:</Form.Label>
                                            <Form.Control type="text" value={this.props.data.lastName} name="lname" />
                                        </Form.Group>

                                        <Form.Group controlId="DOB">
                                            <Form.Label>Date of Birth:</Form.Label>
                                            <Form.Control type="date" name="dob" value={this.props.data.dob} />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Email:</Form.Label>
                                            <Form.Control type="email" value={this.props.data.email} name="email" />
                                        </Form.Group>
                                    </fieldset>
                                        <Button variant="danger" onClick={this.enableForm.bind(this)}>
                                            Edit Data
                                        </Button>
                                        <span>   </span>
                                        <Button variant="success" type="submit">
                                            Submit Data for Verification
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

export default PersonalData;