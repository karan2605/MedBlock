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

    
}