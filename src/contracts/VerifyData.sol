// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;
pragma experimental ABIEncoderV2;

import "./CreateAccount.sol";

contract VerifyData {

    address[] public validators;

    function addValidators(string[] memory names, string memory place) public returns(address[] memory) {
        CreateAccount worker = CreateAccount(msg.sender);

        for (uint i = 0; i < names.length; i++) {
            validators.push(worker.returnUserId(place, names[i]));
        }
        return validators;
    }

    function verifyData() public {
        
    }




}