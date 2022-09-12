const FaucetGoerli = artifacts.require("FaucetGoerli");

module.exports = function (deployer) {
    deployer.deploy(FaucetGoerli);
};
