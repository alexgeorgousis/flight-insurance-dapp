const FlightSuretyApp = artifacts.require("FlightSuretyApp");
const fs = require("fs");

module.exports = function (deployer) {
  deployer.deploy(FlightSuretyApp)
    .then(() => {
      let config = {
        local: {
          appContractAddress: FlightSuretyApp.address
        }
      }
      fs.writeFileSync(__dirname + "/../../client/src/config.json", JSON.stringify(config, null, '\t'), 'utf-8');
      fs.writeFileSync(__dirname + "/../../server/config.json", JSON.stringify(config, null, '\t'), 'utf-8');
    });
};
