const FlightSuretyApp = artifacts.require("FlightSuretyApp");

contract("FlightSuretyApp", async accounts => {
    let instance;
    before(async () => {
        instance = await FlightSuretyApp.deployed();
    });

    it("should set contract owner on deployment", async () => {
        const owner = await instance.owner.call();
        assert.equal(owner, accounts[0], "Account 0 is not the owner.");
    });

    it("should set contract owner as first airline", async () => {
        const ownerAirline = await instance.getAirlineByAddress(accounts[0]);
        assert.equal(ownerAirline.name, "Owner Airline", "Owner Airline not set.");
    });

    it("should register new airline", async () => {
        const address = "0x27d546acb70271e951058728fa4bfd1a5c5fa29c";
        const name = "rainbow airlines 2.0";

        await instance.registerAirline(address, name);
        const newAirline = await instance.getAirlineByAddress(address);
        assert.equal(newAirline.name, name, "New airline registration failed.");
    });
});
