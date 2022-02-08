const CreateAccount = artifacts.require("CreateAccount");
const VerifyData = artifacts.require("VerifyData")

module.exports = function(deployer) {
    deployer.deploy(CreateAccount);
    deployer.deploy(VerifyData);
}