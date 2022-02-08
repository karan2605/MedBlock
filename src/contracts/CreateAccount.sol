// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract CreateAccount {
    mapping (address => string) public dataHash;

    mapping (uint256 => address) public nhsNumtoAddr;

    function setHash(string memory _ipfsHash) public {
        dataHash[msg.sender] = _ipfsHash;
    }

    function getHash() public view returns (string memory) {
        return dataHash[msg.sender];
    }

    function addNhsToAddr(uint256 nhsNumber) public {
        nhsNumtoAddr[nhsNumber] = msg.sender;
    }

    function returnNhsToAddr(uint256 nhsNumber) public view returns (address) {
        return nhsNumtoAddr[nhsNumber];
    } 
}