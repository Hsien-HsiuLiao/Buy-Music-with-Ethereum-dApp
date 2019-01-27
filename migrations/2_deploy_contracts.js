
var SafeMath = artifacts.require("./SafeMath");
var BandApp = artifacts.require("./BandApp.sol");

module.exports = function(deployer) {
  deployer.deploy(SafeMath);
  deployer.link(SafeMath, BandApp);
  deployer.deploy(BandApp);
};