// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract MedicalStorage {

  mapping(uint => Prescription) prescriptions;
  mapping(uint => Appointment) appointments;
  mapping(uint => MedicalData) medicalData;
  mapping(uint => Location) locations;

  struct Prescription {
		uint id;
    uint issuerId;
    uint userID;
    uint256 date;
    bytes32[][] medication;
  }

  struct Appointment {
    uint id;
    uint userID;
    uint medStaffId;
    uint locationId;
    uint256 date;
    bytes32 appTitle;
    bytes32 appNotes;
  }

  struct MedicalData {
    uint userId;
    bytes32 bloodType;
    bytes32[] existingConditions;
  }

  struct Location {
    uint id;
    bytes32 name;
    bytes32 city;
    bytes32 locType;
  }

  uint latestPresId;
  uint latestAppId;
  uint latestMedId;
  uint latestLocId;


  function createPrescription(uint _id, uint _issuerId, uint _userID, uint256 _date, bytes32[][] _medication) public returns(uint) { 
    latestPresId++;
    prescriptions[latestUserId] = Prescription(latestPresId, _role, _priority, _username, _firstName, _lastName, _emailAddress, _dob, _userAddress);

    return latestPresId;
  }

  function getPrescription() public { }

  function createAppointment(uint _id, uint _userID, uint _medStaffId, uint _locationId, uint256 _date, bytes32 _appTitle, bytes32 _appNotes) public returns(uint){
    latestAppId++;
    prescriptions[latestAppId] = Prescription(latestAppId, _role, _priority, _username, _firstName, _lastName, _emailAddress, _dob, _userAddress);

    return latestAppId;
  }

  function getAppointment() public { 

  }

  function createMedicalData(uint _userId, bytes32 _bloodType, bytes32[] _existingConditions,) public { 

  }

  function getMedicalData{} public { 

  }

  function createLocation() public { 

  }









}