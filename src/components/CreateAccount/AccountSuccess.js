import React, { Component } from 'react';
import { Link } from "react-router-dom";

class AccountSuccess extends Component {

    render () {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container px-lg-5">
                    <a className="navbar-brand" href="#!"><i className="bi bi-box"></i>  MedBlock</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                    </div>
                </nav>
    
                <header className="py-5">
                <div className="container px-lg-5">
                    <div className="p-4 p-lg-5 bg-light rounded-3 text-center">
                        <div className="m-4 m-lg-5">
                            <h1 className="display-5 fw-bold">You have successfully created your MedBlock Account</h1>
                            <Link to='/login' className="btn btn-primary btn-lg"> 
                                Click here to login 
                            </Link>
                        </div>
                    </div>
                </div>
            </header>
        </div>
        )
    }
}

export default AccountSuccess;
