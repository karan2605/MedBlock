import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Nav } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

class MedicalData extends Component {

    constructor(props) {
        super(props)

        this.state = { 
            disabled : true
        };
        
        // Create options for medical conditions form entry
        this.options = [
            { value: 'Diabetes', label: 'Diabetes' },
            { value: 'High Blood Pressure', label: 'High Blood Pressure' },
            { value: 'Dementia', label: 'Dementia' },
            { value: 'Allergies', label: 'Allergies' },
            { value: 'Arthritis', label: 'Arthritis' },
            { value: 'Heart Disease', label: 'Heart Disease' }
        ]
    }

    submitRequest(event) {
        // find the data that was changed on the form by comparing it to props variables 
        // Create a notification to the doctor of the gp 
        // Add notification to the record 
        // Display modal showing pending transaction 
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
                    <span className="navbar-text justify-content-center">Medical Data</span>
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
                            <Nav.Link as={Link} to= "/patientdash/personaldata">Personal Data</Nav.Link>
                            <Nav.Link active>Medical Data</Nav.Link>
                            <Nav.Link as={Link} to= "/patientdash/datalog">Data Access Log</Nav.Link>
                            <Nav.Link as={Link} to= "/patientdash/notifications">Notifications</Nav.Link>
                        </Nav>
                    </div>
                    
                    <div className="d-flex flex-lg-fill justify-content-around p-3 rounded-3 bg-light">
                    <div className="col-lg-5 col-md-5 col-sm-5 container">
                        <div className="d-flex justify-content-center align-items-center">
                            <div className="p-4 p-lg-5 bg-light rounded-3 flex-fill">
                                <h1 className="display-5 fw-bold">Medical Data</h1>
                                    <Form>
                                        <Form.Group className="mb-3" controlId="formBasicBlood">
                                            <Form.Label>NHS Number:</Form.Label>
                                            <Form.Control type="text" value={this.props.data.nhsNumber} name="nhsNumber" disabled/>
                                        </Form.Group>
                                        
                                        <fieldset disabled={(this.state.disabled) ? "disabled" : ""}>
                                            <Form.Group className="mb-3" controlId="formBasicGpName">
                                                <Form.Label>GP:</Form.Label>
                                                <Form.Control type="text" value={this.props.data.gp} name="gp"/>
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicBlood">
                                                <Form.Label>Blood Group:</Form.Label>
                                                <Form.Control type="text" value={this.props.data.bloodGroup} name="bloodgroup"/>
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
                    </div>
                </div>
            </div>
        )
    }
}

export default MedicalData;