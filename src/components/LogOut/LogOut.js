import React  from 'react';
import { Link } from "react-router-dom";

const Logout = () => {

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container px-lg-5">
                <a class="navbar-brand" href="#!"><i class="bi bi-box"></i>  MedBlock</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                </div>
            </nav>

            <header class="py-5">
            <div class="container px-lg-5">
                <div class="p-4 p-lg-5 bg-light rounded-3 text-center">
                    <div class="m-4 m-lg-5">
                        <h1 class="display-5 fw-bold">You have successfully logged out</h1>
                        <Link to='/' class="btn btn-primary btn-lg"> 
                            Return to Home  
                        </Link>
                    </div>
                </div>
            </div>
        </header>
        </div>
    )
}

export default Logout;