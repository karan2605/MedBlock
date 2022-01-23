// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract CreateAccount {
    mapping (address => string) ipfsHash;

    function setHash(string memory _ipfsHash) public {
        ipfsHash[msg.sender] = _ipfsHash;
    }

    function getHash() public view returns (string memory) {
        return ipfsHash[msg.sender];
    }
}