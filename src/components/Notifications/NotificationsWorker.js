import React, { Component } from 'react';
import { Link, NavLink } from "react-router-dom";
import { Nav, Table, Button } from 'react-bootstrap';
import CreateAccount from '../../abis/CreateAccount.json';

const Web3 = require('web3');
const ipfsClient = require('ipfs-http-client');
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

class NotificationsWorker extends Component {

    async componentDidMount() {
        await this.loadBlockchainData()
        await this.loadWeb3()
    }

    constructor(props) {
        super(props);

        this.state = {
            contract : null
        }
    }

    async loadWeb3() {
        if (window.ethereum) {
            await window.ethereum.request({ method : 'eth_requestAccounts' });
            window.web3 = new Web3(window.ethereum);
            return true;
        }
        else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider)
        }
        else {
            window.alert('Non-Ethereum browser detected. You should consider trying MetaMask')
            return false;
        }
    }

    async loadBlockchainData() {
        const web3 = new Web3(window.ethereum);
        const networkId = await web3.eth.net.getId();
        const accounts = await web3.eth.getAccounts();
        this.setState({account: accounts[0]})
        const networkData = CreateAccount.networks[networkId];
        if(networkData) {
            const contract = new web3.eth.Contract(CreateAccount.abi, networkData.address);
            this.setState({contract: contract});
        } 
        else {
            window.alert('Smart contract not deployed to detected network.');
        }
    }

    async rejectData(not_data) {
        var today = new Date();
        var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();

        const notification = [JSON.stringify({
            datetime : date,
            category : "Query Response",
            doctor : this.props.data.firstName + " " + this.props.data.lastName,
            notification : "Query  : " + not_data.notes,
            senderId : this.props.data.account
        })]

        const getHash = this.state.contract.methods.getHashByAddr(not_data.senderId).call({from: this.props.data.account})
        const hash = await getHash
        const raw_data = await ipfs.cat(hash)
        const data = JSON.parse(raw_data)

        // add notification to record
        const record = new File([JSON.stringify({
            id: data.id,
            firstName: data.firstName,
            lastName: data.lastName,
            dob: data.dob,
            email: data.email,
            nhsNumber : data.nhsNumber,
            gp: data.gp,
            bloodGroup: data.bloodGroup,
            existingHealth: data.existingHealth,
            appointments : data.appointment,
            notifications : notification.concat(data.notifications),
            prescriptions : data.prescription,
            requests: data.requests
        })], data.id+".json");

        // send back to ipfs
        // update hash stored on blockchain
        ipfs.add(record, (error, result) => {
            console.log('Ipfs result', result)
            if(error) {
            console.error(error)
            return
            }
            this.state.contract.methods.setHashbyAddr(result[0].hash, not_data.senderId).send({from: this.props.data.account})
        })
    }

    fetchNotifications() {
        const notification_elements = [];
        const notifications = this.props.data.notifications
        
        for (let i = 0; i < notifications.length-1; i++) {
            const notification = JSON.parse(notifications[i])
            if(notification.category === "Appointment") {
                notification_elements.push(
                <tr>
                    <td>{notification.datetime}</td>
                    <td>{notification.category}</td>
                    <td>Validate Appointment with {notification.doctor}. Notes: {notification.notes}</td>
                    <td><Button variant="success" onClick={() => { this.addData(notification) }}>Validate</Button></td>
                </tr>)
            }
            else {
                notification_elements.push(
                <tr>
                    <td>{notification.datetime}</td>
                    <td>{notification.category}</td>
                    <td>Validate Query from {notification.patient} for {notification.patient_notification}. Query: {notification.notes}</td>
                    <td><NavLink className="btn btn-success" variant="success" to="/workerdash/adddata"> Follow up </NavLink>
                    <Button variant="danger" onClick={() => { this.rejectData(notification)
                        .then(this.props.data.notifications.splice(this.props.data.notifications.indexOf(notification),1))  }}>Reject</Button></td>
                </tr>)
            }
        }

        return (
            <tbody>
                {notification_elements}
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
                    <span class="navbar-text justify-content-center">Notifications</span>
                        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                            <span className="navbar-text text-success p-2"> Account: { this.props.data.firstName} { this.props.data.lastName }</span>
                            <Link to="/logout" class="btn btn-danger">Log Out</Link>
                        </ul>
                    </div>
                </nav>
                
                <div className='d-flex m-2 rounded-6 align-items-stretch'>
                    <div className='d-flex p-3'>
                        <Nav className="flex-column pt-2 justify-content-start align-items-stretch bg-light rounded-3" variant="pills">
                            <Nav.Link as={Link} to= "/workerdash">Dashboard</Nav.Link>
                            <Nav.Link as={Link} to= "/workerdash/personaldata">Personal Data</Nav.Link>
                            <Nav.Link as={Link} to="/workerdash/patientdata"> Patient Data</Nav.Link>
                            <Nav.Link active>Notifications</Nav.Link>
                            <Nav.Link as={Link} to="/workerdash/adddata">Add New Data</Nav.Link>
                        </Nav>
                    </div>
                    
                    <div class="d-flex flex-lg-fill justify-content-around p-3 rounded-3 bg-light">
                    <Table Responsive bordered>
                        <thead>
                            <tr>
                            <th>Date/Time</th>
                            <th>Category</th>
                            <th>Notfication</th>
                            <th>Action</th>
                            </tr>
                        </thead>

                        {this.fetchNotifications()}
                        
                        </Table>
                    </div>
                </div>
            </body>
        )
    }
}

export default NotificationsWorker;