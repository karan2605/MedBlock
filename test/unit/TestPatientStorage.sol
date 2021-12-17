// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../../contracts/PatientStorage.sol";

contract TestPatientStorage {
  function testCreateFirstUser() public {
    // Get the deployed contract
    PatientStorage _storage = PatientStorage(DeployedAddresses.PatientStorage());

    uint _expectedId = 1;

    Assert.equal(_storage.createUser("karan2605", "karan", "patel"), _expectedId, "Should create user with ID 1");
  }
}