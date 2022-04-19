var MemoryStorage = artifacts.require("./MemoryStorage.sol");

module.exports = function(deployer) {
  deployer.deploy(MemoryStorage);
};
