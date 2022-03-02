import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Nav, Table } from 'react-bootstrap';

class DataLog extends Component {

    fetchAccesses() {
        const access_elements = [];
        const requests = this.props.data.requests
        
        for (let i = 0; i < requests.length-1; i++) {
            const accesses = JSON.parse(requests[i])
            
            access_elements.push(
            <tr>
                <td>{accesses.datetime}</td>
                <td>{accesses.type} Accessed by {accesses.name}</td>
            </tr>)
        }

        return (
            <tbody>
            {access_elements}
            </tbody>
        )
    }

    render() {
        return (
            <body>
                <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a class="navbar-brand" href="#!"><i class="bi bi-box"></i>  MedBlock</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <span class="navbar-text justify-content-center">Data Log</span>
                        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                            <span className="navbar-text text-success p-2"> Account: { this.props.data.firstName} { this.props.data.lastName }</span>
                            <Link to="/logout" class="btn btn-danger">Log Out</Link>
                        </ul>
                    </div>
                </nav>
                
                <div className='d-flex m-2 rounded-6 align-items-stretch'>
                    <div className='d-flex p-3'>
                        <Nav className="flex-column pt-2 justify-content-start align-items-stretch bg-light rounded-3" variant="pills">
                            <Nav.Link as={Link} to= "/patientdash">Dashboard</Nav.Link>
                            <Nav.Link as={Link} to= "/patientdash/personaldata">Personal Data</Nav.Link>
                            <Nav.Link as={Link} to= "/patientdash/medicaldata">Medical Data</Nav.Link>
                            <Nav.Link active>Data Access Log</Nav.Link>
                            <Nav.Link as={Link} to= "/patientdash/notifications">Notifications</Nav.Link>
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
                        
                        {this.fetchAccesses()}
                        
                        </Table>
                    </div>
                </div>
            </body>
            )
        }
}

export default DataLog;