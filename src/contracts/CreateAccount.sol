// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract CreateAccount {
    mapping (address => string) public dataHash; // maps public key to IPFS CID's
    mapping (string => address) public nhsNumtoAddr; // stores mapping from NHS numbers to public keys

    /**
     * @notice Assigns data to the three mappings created above. Function is invoked upon account 
               creation and updating medical records.
     * @param _ipfsHash - Users IPFS CID
     * @param nhsNumber - NHS number of user
     */
    function setHash(string memory _ipfsHash, string memory nhsNumber) public {
        dataHash[msg.sender] = _ipfsHash;
        nhsNumtoAddr[nhsNumber] = msg.sender;
    } 

    /**
     * @notice Sets the IPFS hash according to a given address on the blockchain
     * @param _ipfsHash - Users IPFS CID
     * @param _addr - Blockchain address of user 
    */

    function setHashbyAddr(string memory _ipfsHash, address _addr) public {
        dataHash[_addr] = _ipfsHash;
    }

    /**
     * @notice Returns IPFS CID of the user who called the contract function
     * @return string - Users IPFS CID 
     */
    function getHash() public view returns (string memory) {
        return dataHash[msg.sender];
    }

    /**
     * @notice Gets the IPFS hash according to a given address on the blockchain
     * @param _address - Blockchain address of user 
     * @return string - Users IPFS CID 
     */
    function getHashByAddr(address _address) public view returns (string memory) {
        return dataHash[_address];
    }

    /**
     * @notice Gets a users blockchain address from a given NHS number provided
     * @param nhsNumber - NHS number of user 
     * @return address - Blockchain address of a user
     */
    function returnNhsToAddr(string memory nhsNumber) public view returns (address) {
        return nhsNumtoAddr[nhsNumber];
    } 
}