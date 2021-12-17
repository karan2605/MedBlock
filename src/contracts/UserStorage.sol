// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract UserStorage {

  mapping(uint => User) users;

  struct User {
    uint id;
    bytes32 role;
    uint priority;
    bytes32 username;
    bytes32 firstName;
    bytes32 lastName;
    bytes32 emailAddress;
    uint256 dob;
    bytes32 userAddress;
  }

  uint latestUserId;

  constructor() public {
    latestUserId = 0;
  }
  
  function createUser(bytes32 _role, uint _priority, bytes32 _username, bytes32 _firstName, 
                      bytes32 _lastName, bytes32 _emailAddress, uint256 _dob, bytes32 _userAddress) public returns(uint) {
    latestUserId++;
    users[latestUserId] = User(latestUserId, _role, _priority, _username, _firstName, _lastName, _emailAddress, _dob, _userAddress);

    return latestUserId;
  }

  function getUser(uint _id) public returns(uint, bytes32, bytes32, bytes32, bytes32, uint, bytes32) {
    return(users[_id].id, users[_id].username, users[_id].firstName, users[_id].lastName, 
           users[_id].emailAddress, users[_id].dob, users[_id].userAddress);
  }
}