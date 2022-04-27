// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../../src/contracts/CreateAccount.sol";

contract TestCreateAccount {
    /*
      Unit test for the updated setHash function, assertion checks if the IPFS hash is correctly assigned to the user
    */
    function testSetHashUpdate() public {
        CreateAccount createAcc = CreateAccount(DeployedAddresses.CreateAccount());
        Assert.equal(createAcc.setHash("QmWWQSuPMS6aXCbZKpEjPHPUZN2NjB3YrhJTHsV4X3vb2t", "0123456789", "Stanmore Medical Centre"), uint(1), "Should set IPFS hash");
    }

    /*
      Unit test for the original setHash function which doesn't take the NHS number of GP location as a parameter
    */
    function testSetHash() public {
        CreateAccount createAcc = CreateAccount(DeployedAddresses.CreateAccount());
        Assert.equal(createAcc.setHash("QmWWQSuPMS6aXCbZKpEjPHPUZN2NjB3YrhJTHsV4X3vb2t"), uint(1), "Should set IPFS hash");
    }

    /*
      Unit test for returnNHSToAddr function, checks if an NHS number already in the mapping returns the correct blockchain address
    */
    function testNhsToAddr() public {
        CreateAccount createAcc = CreateAccount( DeployedAddresses.CreateAccount());
        Assert.equal(createAcc.returnNhsToAddr("0123456789"), 0x9781fc0Cd6B568a12c90c76fa510f9Ee89552E4b, "Should get public key address given an NHS number");
    }

    /*
      Unit test for the getHash function, assertion checks if a given address on the blockchain returns the correct IPFS CID
    */
    function testGetHash() public {
        CreateAccount createAcc = CreateAccount(DeployedAddresses.CreateAccount());
        Assert.equal(createAcc.getHashByAddr("0x9781fc0Cd6B568a12c90c76fa510f9Ee89552E4b"), "QmWWQSuPMS6aXCbZKpEjPHPUZN2NjB3YrhJTHsV4X3vb2t","Should get IPFS hash");
    }
}