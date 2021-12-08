// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../../contracts/UserStorage.sol";

contract TestUserStorage {
  function testCreateFirstUser() public {
    // Get the deployed contract
    UserStorage _storage = UserStorage(DeployedAddresses.UserStorage());

    uint _expectedId = 1;

    Assert.equal(_storage.createUser("karan2605", "karan", "patel"), _expectedId, "Should create user with ID 1");
  }
}