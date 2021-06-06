// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FlightSuretyApp {
    address private _owner;

    struct Airline {
        string name;
    }
    mapping(address => Airline) private _airlines;

    constructor() {
        _owner = msg.sender;
        Airline memory ownerAirline = Airline("Owner Airline");
        _airlines[_owner] = ownerAirline;
    }

    function owner() public view returns (address) {
        return _owner;
    }

    function registerAirline(address _addr, string memory _name) public {
        _airlines[_addr] = Airline(_name);
    }

    function getAirlineByAddress(address addr)
        public
        view
        returns (Airline memory)
    {
        return _airlines[addr];
    }
}
