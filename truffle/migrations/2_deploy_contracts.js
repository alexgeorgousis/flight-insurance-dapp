const FlightSuretyApp = artifacts.require("FlightSuretyApp");

module.exports = function (deployer) {
  deployer.deploy(FlightSuretyApp);
};
