const CreateAccount = artifacts.require("CreateAccount");

module.exports = function(deployer) {
    deployer.deploy(CreateAccount);
}