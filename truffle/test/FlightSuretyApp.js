const FlightSuretyApp = artifacts.require("FlightSuretyApp");

contract("FlightSuretyApp", async accounts => {
    it("should set contract owner on deployment", async () => {
        const instance = await FlightSuretyApp.deployed();
        const owner = await instance.owner.call();

        assert.equal(owner, accounts[0], "Account 0 is not the owner.");
    });

    it("should set contract owner as first airline", async () => {
        const instance = await FlightSuretyApp.deployed();
        const ownerAirline = await instance.getAirlineByAddress(accounts[0]);

        assert.equal(ownerAirline.name, "Owner Airline", "Owner Airline not set.");
    });
});
