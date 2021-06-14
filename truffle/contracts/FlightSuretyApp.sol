// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FlightSuretyApp {
    address private _owner;

    struct Airline {
        string name;
    }
    mapping(address => Airline) private _airlines;
    uint8 private _numAirlines;

    constructor() {
        _owner = msg.sender;
        Airline memory ownerAirline = Airline("Owner Airline");
        _airlines[_owner] = ownerAirline;
        _numAirlines = 1;
    }

    function owner() public view returns (address) {
        return _owner;
    }

    function registerAirline(address _addr, string memory _name) public {
        if (_numAirlines < 5)
            require(
                msg.sender == _owner,
                "Sender is not owner airline"
            );
        else
            require(
                bytes(_airlines[msg.sender].name).length > 0,
                "Sender must be an airline"
            );

        require(
            bytes(_airlines[_addr].name).length == 0,
            "An airline has already been registered with this address"
        );

        _airlines[_addr] = Airline(_name);
        _numAirlines += 1;
    }

    function getAirlineByAddress(address addr)
        public
        view
        returns (Airline memory)
    {
        return _airlines[addr];
    }

    function getNumAirlines() public view returns (uint8) {
        return _numAirlines;
    }
}
