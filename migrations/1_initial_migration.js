const Migrations = artifacts.require("./Migrations");

module.exports = function(deployer) {
    deployer.deploy(Migrations); // initial migration to upload the migrations smart contract to the blockchain
}