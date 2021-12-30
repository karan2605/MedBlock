import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Nav, Table } from 'react-bootstrap';

class DataLog extends Component {
  render() {
    return (
        <body>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <a class="navbar-brand" href="#!"><i class="bi bi-box"></i>  MedBlock</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <span class="navbar-text justify-content-center">Patient Dashboard</span>
                    <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                        <Link to="/logout" class="btn btn-danger">Log Out</Link>
                    </ul>
                </div>
            </nav>
            
            <div className='d-flex m-2 rounded-6 align-items-stretch'>
                <div className='d-flex p-3'>
                    <Nav className="flex-column pt-2 justify-content-start align-items-stretch bg-light rounded-3" variant="pills" activeKey="link-4">
                        <Nav.Link href="/patientdash" eventKey="link-1">Dashboard</Nav.Link>
                        <Nav.Link eventKey="link-2">Personal Data</Nav.Link>
                        <Nav.Link eventKey="link-3">Medical Data</Nav.Link>
                        <Nav.Link eventKey="link-4">Data Access Log</Nav.Link>
                        <Nav.Link href="/patientdash/notfications" eventKey="link-5">Notifications</Nav.Link>
                        <Nav.Link eventKey="link-6">Add New Data</Nav.Link>
                    </Nav>
                </div>
                
                <div class="d-flex flex-lg-fill justify-content-around p-3 rounded-3 bg-light">
                <Table Responsive bordered>
                    <thead>
                        <tr>
                        <th>Date</th>
                        <th>Accessed By</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                    </tbody>
                    </Table>
                </div>
            </div>
        </body>
        )
    }
}

export default DataLog;