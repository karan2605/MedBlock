import React  from 'react';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import '../HomePage/Style.css';
import { useState } from "react";

const CreateAccount = () => {
    const [date, setDate] = useState(new Date());
    const [field, setField] = useState([]);

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container px-lg-5">
                <a class="navbar-brand" href=" "><i class="bi bi-box"></i>  MedBlock</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li class="nav-item"><Link to="/" class="nav-link">Home</Link></li>
                        <li class="nav-item"><Link to='/login' class="nav-link">Login</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div class="col-lg-5 col-md-5 col-sm-5 container">
                <div class="d-flex justify-content-center align-items-center">
                    <div class="p-4 p-lg-5 bg-light rounded-3">
                        
                        <h1 className="display-5 fw-bold">Create Account</h1>
                        <p >Complete the form below to create a MedBlock account</p>
                        <h2 className="display-10 fw-bold">Personal Details</h2>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type="email" placeholder="First Name" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type="email" placeholder="Last Name" />
                            </Form.Group>

                            <Form.Group controlId="DOB">
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control
                                type="date"
                                name="dob"
                                placeholder="Date of Birth"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type="email" placeholder="Email Address" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>

                            <h2 className="display-10 fw-bold">Medical Details</h2>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type="email" placeholder="GP Name" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type="email" placeholder="Blood Group" />
                            </Form.Group>
                            
                            <Form.Group controlId="my_multiselect_field">
                            <Form.Label>Existing Health Conditions</Form.Label>
                            <Form.Control as="select" multiple value={field} onChange={e => setField([].slice.call(e.target.selectedOptions).map(item => item.value))}>
                                <option value="field1">Field 1</option>
                                <option value="field2">Field 2</option>
                                <option value="field3">Field 3</option>
                            </Form.Control>
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
export default CreateAccount;