// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../../contracts/AddData.sol";

contract TestAddData {
    function testAddAppointment() public {
        // Get the deployed contract
        AddData _addAppointment = AddData(DeployedAddresses.AddData());

        uint _expectedId = 1;
        uint256 _appointmentDate = now;
        string _doctorName = "Dr Patel";
        string _patientName = "Karan Patel";
        string _appointmentDetails = "Blood Test";

        Assert.equal(_addAppointment.addAppointment(_appointmentDate, _doctorName, _patientName, _appointmentDetails), _expectedId, "Should create appointment with ID 1");
    }
}