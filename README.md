# CS310-Project - MedBlock: A Patient Medical Record System using Ethereum Blockchain

## Description:
A scalable prototype website that allows patients to access their medical data and interact with doctors and other medical workers. Website is built using React.js and system back-end composing of the Ethereum Blockchain network and InterPlanetary File System (IPFS).

## Prequisites:
  - **Ganache** - Used to run a private Ethereum blockchain network locally on your device for test and development purposes. Downloaded and installed from here: https://trufflesuite.com/ganache/

## Installation:
Download the folder and open a terminal window in this directory, run `npm install` to install all required libraries.

## Running the Website:
 1. Open the Ganache program and create a new project, open `truffle-config.js` and change the host and port if different.
 2. Run `truffle migrate --reset` to deploy smart contract to the Ganache blockchain, once deployed the contracts should display on Ganache on the 'Contracts' tab.
 3. Run `npm run start` to start the Node.js server for the website. Once initiated, the local URL for the website will be provided.
 4. Press `Ctrl-C` to stop the Node server once finished
  
