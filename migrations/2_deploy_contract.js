const Migrations = artifacts.require("landRegistration");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};
