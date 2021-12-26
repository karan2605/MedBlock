import React  from 'react';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import './Style.css';

const Login = () => {

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container px-lg-5">
                <a class="navbar-brand" href="#!"><i class="bi bi-box"></i>  MedBlock</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li class="nav-item"><Link to="/" class="nav-link">Home</Link></li>
                            <li class="nav-item"><Link to='/login' class="nav-link">Login</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="col-lg-5 col-md-5 col-sm-5 container">
                <div class="d-flex justify-content-center align-items-center">
                    <div class="p-4 p-lg-5 bg-light rounded-3">
                        <h1 className="display-5 fw-bold">Login</h1>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type="email" placeholder="Email" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>

                            <Button variant="danger" type="submit">
                                Login
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login;