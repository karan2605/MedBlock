const CreateAccount = artifacts.require("CreateAccount");
const VerifyData = artifacts.require("VerifyData")

module.exports = function(deployer) {
    deployer.deploy(CreateAccount); // deploys the CreateAccount smart contract to the blockchain
}