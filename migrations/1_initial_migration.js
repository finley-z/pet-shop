var Migrations = artifacts.require("./Migrations.sol");
var BusinessContract = artifacts.require("./BusinessContract.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(BusinessContract);
};
