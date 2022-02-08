// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract CreateAccount {
    mapping (address => string) public dataHash;

    function setHash(string memory _ipfsHash) public {
        dataHash[msg.sender] = _ipfsHash;
    }

    function getHash() public view returns (string memory) {
        return dataHash[msg.sender];
    }
}