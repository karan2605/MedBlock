// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract CreateAccount {
    mapping (address => string) public dataHash;
    mapping (string => address) public nhsNumtoAddr;
    mapping (string => string) public areaToNhsNum;

    function setHash(string memory _ipfsHash, string memory nhsNumber, string memory area) public {
        dataHash[msg.sender] = _ipfsHash;
        nhsNumtoAddr[nhsNumber] = msg.sender;
        areaToNhsNum[area] = nhsNumber;
    } 

    function setHashbyAddr(string memory _ipfsHash, address _addr) public {
        dataHash[_addr] = _ipfsHash;
    }

    function getHash() public view returns (string memory) {
        return dataHash[msg.sender];
    }

    function getHashByAddr(address _address) public view returns (string memory) {
        return dataHash[_address];
    }

    function returnNhsToAddr(string memory nhsNumber) public view returns (address) {
        return nhsNumtoAddr[nhsNumber];
    } 

    function findHashFromArea(string memory area) public view returns (address) {
        string memory nhsNum = areaToNhsNum[area];
        return nhsNumtoAddr[nhsNum];
    }
}