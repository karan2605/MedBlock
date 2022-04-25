// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../../src/contracts/CreateAccount.sol";

contract TestCreateAccount {
    function testSetHash() public {
        CreateAccount createAcc = CreateAccount(DeployedAddresses.CreateAccount());
        Assert.equal(createAcc.setHash("QmWWQSuPMS6aXCbZKpEjPHPUZN2NjB3YrhJTHsV4X3vb2t", "0123456789", "Stanmore Medical Centre"), uint(1), "Should set IPFS hash");
    }

    function testSetHash() public {
        /* create an instance of the contract */
        CreateAccount createAcc = CreateAccount(DeployedAddresses.CreateAccount());
        Assert.equal(createAcc.setHash("QmWWQSuPMS6aXCbZKpEjPHPUZN2NjB3YrhJTHsV4X3vb2t", "0123456789"), uint(1), "Should set IPFS hash");
    }
  
    function testNhsToAddr() public {
        CreateAccount createAcc = CreateAccount( DeployedAddresses.CreateAccount());
        Assert.equal(createAcc.returnNhsToAddr("0123456789"), 0x9781fc0Cd6B568a12c90c76fa510f9Ee89552E4b, "Should get public key address given an NHS number");
    }

    function testGetHash() public {
        /* create an instance of the contract */
        CreateAccount createAcc = CreateAccount(DeployedAddresses.CreateAccount());
        Assert.equal(createAcc.getHashByAddr("0x9781fc0Cd6B568a12c90c76fa510f9Ee89552E4b"), 0x9781fc0Cd6B568a12c90c76fa510f9Ee89552E4b,"Should get IPFS hash");
    }
}