import React, { Component } from 'react';

import './App.css';

class App extends Component {
  render() {
    return (
      <body>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container px-lg-5">
                <a class="navbar-brand" href="#!">MedBlock</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li class="nav-item"><a class="nav-link active" aria-current="page" href="#!">Home</a></li>
                        <li class="nav-item"><a class="nav-link" href="#!">Login</a></li>
                    </ul>
                </div>
            </div>
        </nav>

        <header class="py-5">
            <div class="container px-lg-5">
                <div class="p-4 p-lg-5 bg-light rounded-3 text-center">
                    <div class="m-4 m-lg-5">
                        <h1 class="display-5 fw-bold">Welcome to MedBlock</h1>
                        <p class="fs-4">A data management system for healthcare patients and staff. Click below to create an account</p>
                        <a class="btn btn-primary btn-lg" href="#!">Get Started</a>
                    </div>
                </div>
            </div>
        </header>

        <section class="pt-4">
            <div class="container px-lg-5">

                <div class="row gx-lg-5">
                    <div class="col-lg-6 col-xxl-4 mb-5">
                        <div class="card bg-light border-0 h-100">
                            <div class="card-body text-center p-4 p-lg-5 pt-0 pt-lg-0">
                                <div class="feature bg-primary bg-gradient text-white rounded-3 mb-4 mt-n4"><i class="bi bi-box"></i></div>
                                <h2 class="fs-4 fw-bold">Powered by Blockchain</h2>
                                <p class="mb-0">A secure and tracable data storage system</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 col-xxl-4 mb-5">
                        <div class="card bg-light border-0 h-100">
                            <div class="card-body text-center p-4 p-lg-5 pt-0 pt-lg-0">
                                <div class="feature bg-primary bg-gradient text-white rounded-3 mb-4 mt-n4"><i class="bi bi-pencil"></i></div>
                                <h2 class="fs-4 fw-bold">Management of Your Medical Data</h2>
                                <p class="mb-0">Securely access and edit all your medical details.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 col-xxl-4 mb-5">
                        <div class="card bg-light border-0 h-100">
                            <div class="card-body text-center p-4 p-lg-5 pt-0 pt-lg-0">
                                <div class="feature bg-primary bg-gradient text-white rounded-3 mb-4 mt-n4"><i class="bi bi-calendar4-week"></i></div>
                                <h2 class="fs-4 fw-bold">Set Appointments</h2>
                                <p class="mb-0">Arrange appointments as a patient or healthcare worker</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 col-xxl-4 mb-5">
                        <div class="card bg-light border-0 h-100">
                            <div class="card-body text-center p-4 p-lg-5 pt-0 pt-lg-0">
                                <div class="feature bg-primary bg-gradient text-white rounded-3 mb-4 mt-n4"><i class="bi bi-binoculars"></i></div>
                                <h2 class="fs-4 fw-bold">View Data Accesses</h2>
                                <p class="mb-0">Data logs to allow you to view who and when your data was accessed</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 col-xxl-4 mb-5">
                        <div class="card bg-light border-0 h-100">
                            <div class="card-body text-center p-4 p-lg-5 pt-0 pt-lg-0">
                                <div class="feature bg-primary bg-gradient text-white rounded-3 mb-4 mt-n4"><i class="bi bi-file-earmark-check"></i></div>
                                <h2 class="fs-4 fw-bold">Validate Medical Data</h2>
                                <p class="mb-0">Healthcare workers can collectively validate patient data to ensure data integrity and consistency</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 col-xxl-4 mb-5">
                        <div class="card bg-light border-0 h-100">
                            <div class="card-body text-center p-4 p-lg-5 pt-0 pt-lg-0">
                                <div class="feature bg-primary bg-gradient text-white rounded-3 mb-4 mt-n4"><i class="bi bi-speedometer2"></i></div>
                                <h2 class="fs-4 fw-bold">Data Dashboard</h2>
                                <p class="mb-0">A summary of recent data accesses, appointments and other notifications</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <footer class="py-5 bg-dark">
            <div class="container"><p class="m-0 text-center text-white">Copyright &copy; MedBlock 2021</p></div>
        </footer>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
    </body>
    );
  }
}

export default App;