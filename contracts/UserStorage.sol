// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract UserStorage {

  mapping(uint => Profile) profiles;

  struct Profile {
    uint id;
    bytes32 username;
    bytes32 firstName;
    bytes32 lastName;
  }

  uint latestUserId = 0;
  
  function createUser(bytes32 _username, bytes32 _firstName, bytes32 _lastName) public returns(uint) {
    latestUserId++;
    profiles[latestUserId] = Profile(latestUserId, _username, _firstName, _lastName);

    return latestUserId;
  }

  function findUser(uint _id) public returns(Profile) {
    
  }
}