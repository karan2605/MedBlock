import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Nav, Card, Button } from 'react-bootstrap';

class WorkerDash extends Component {
  render() {
    return (
        <body>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <a class="navbar-brand" href="#!"><i class="bi bi-box"></i>  MedBlock</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <span class="navbar-text justify-content-center">Medical Worker Dashboard</span>
                    <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                        <Link to="/logout" class="btn btn-danger">Log Out</Link>
                    </ul>
                </div>
            </nav>
            
            <div className='d-flex m-2 rounded-6 align-items-stretch'>
                <div className='d-flex p-3'>
                    <Nav className="flex-column pt-2 justify-content-start align-items-stretch bg-light rounded-3" variant="pills" activeKey="link-1">
                        <Nav.Link href="/patientdash" eventKey="link-1">Dashboard</Nav.Link>
                        <Nav.Link eventKey="link-2">Personal Data</Nav.Link>
                        <Nav.Link eventKey="link-3">Patient Data</Nav.Link>
                        <Nav.Link href="/notfications" eventKey="link-5">Notifications</Nav.Link>
                        <Nav.Link eventKey="link-6">Add New Data</Nav.Link>
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