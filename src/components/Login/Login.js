import React  from 'react';
import { Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import './Style.css';

async function handlePatientLogin(){
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    window.location.replace("http://localhost:3000/patientdash");
}

async function handleWorkerLogin(){
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    window.location.replace("http://localhost:3000/workerdash");
}

const Login = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container px-lg-5">
                <a className="navbar-brand" href="#!"><i className="bi bi-box"></i>  MedBlock</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
                            <li className="nav-item"><Link to='/login' className="nav-link">Login</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>

            <header className="py-5">
            <div className="container px-lg-5">
                <div className="p-4 p-lg-5 bg-light rounded-3 text-center">
                    <div className="m-4 m-lg-5">
                        <h1 className="display-5 fw-bold">Login</h1>
                        <br></br>
                        <Button className="connectMetaMask" variant='danger' onClick={handlePatientLogin}>Login as a Patient</Button>
                        <Button className="connectMetaMask" variant='danger' onClick={handleWorkerLogin}>Login as a Medical Worker</Button>
                    </div>
                </div>
            </div>
            </header>
        </div>
    )
}
export default Login;