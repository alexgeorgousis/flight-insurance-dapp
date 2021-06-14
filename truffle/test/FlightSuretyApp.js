const truffleAssert = require("truffle-assertions");
const FlightSuretyApp = artifacts.require("FlightSuretyApp");

contract("FlightSuretyApp", async accounts => {
    let instance;
    beforeEach(async () => {
        instance = await FlightSuretyApp.new();
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
        const numAirlines = await instance.getNumAirlines();

        assert.equal(newAirline.name, name, "New airline registration failed.");
        assert.equal(numAirlines, 2, "The number of airlines did not increase.");
    });

    describe('registerAirline()', () => {
        it("should require sender is owner airline if num airlines < 5", async () => {
            const address = "0x27d546acb70271e951058728fa4bfd1a5c5fa29c";
            const name = "rainbow airlines 2.0";

            await truffleAssert.reverts(
                instance.registerAirline(address, name, { from: address }),
                "Sender is not owner airline"
            )
        });

        it("should require sender is any airline if num airlines >= 5", async () => {
            const airline2 = { address: "0x27D546Acb70271E951058728FA4bfd1A5C5FA29C", name: "airline2" };
            const airline3 = { address: "0xCA490178F3754218CBc5c7e8063082554D1C1c62", name: "airline3" };
            const airline4 = { address: "0x2FB2680d27b1501fFC3A113c98B4574cf7016e56", name: "airline4" };
            const airline5 = { address: "0x8F84609ACd33fD5e7b16De60710fe71F6e713A1F", name: "airline5" };

            await instance.registerAirline(airline2.address, airline2.name);
            await instance.registerAirline(airline3.address, airline3.name);
            await instance.registerAirline(airline4.address, airline4.name);
            await instance.registerAirline(airline5.address, airline5.name);

            const airline6 = { address: "0x45C2dFB18c1fa6473afDFA5929055DB1cC265bB5", name: "airline6" }
            await truffleAssert.reverts(
                instance.registerAirline(airline6.address, airline6.name, { from: airline6.address }),
                "Sender must be an airline"
            );

            await truffleAssert.passes(
                instance.registerAirline(airline6.address, airline6.name, { from: airline2.address }),
            );
        });

        it("should reject duplicates", async () => {
            const airline1 = { address: "0x27D546Acb70271E951058728FA4bfd1A5C5FA29C", name: "airline1" };
            await instance.registerAirline(airline1.address, airline1.name);

            await truffleAssert.reverts(
                instance.registerAirline(airline1.address, airline1.name),
                "An airline has already been registered with this address"
            );
        });
    });
});
