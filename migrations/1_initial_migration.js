var Migrations = artifacts.require("./Migrations.sol");
var PunchClock = artifacts.require("./PunchClock.sol");
//var BusinessContract = artifacts.require("./BusinessContract.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(PunchClock);
 // deployer.deploy(BusinessContract);
};
