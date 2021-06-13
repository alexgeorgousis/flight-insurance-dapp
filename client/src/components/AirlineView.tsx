import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FormEvent, useEffect, useState } from 'react';
import './AirlineView.scss';
import { useWeb3React } from '@web3-react/core';
import config from '../config.json';
import FlightSuretyApp from '../contracts/FlightSuretyApp.json';
import { useCallback } from 'react';
import { ethers } from 'ethers';
import { FC } from 'react';


const AirlineView: FC = () => {
    const { library, account, chainId } = useWeb3React();
    const [name, setName] = useState("Airline");
    const [isRegisteredAirline, setIsRegisteredAirline] = useState(false);
    const [inAirlineAddress, setInAirlineAddress] = useState("");
    const [inAirlineName, setInAirlineName] = useState("");

    const fetchAirlineInfo = useCallback(async () => {
        const contractAddress = config.local.appContractAddress;
        const contract = new ethers.Contract(contractAddress, FlightSuretyApp.abi, library);
        try {
            return await contract.getAirlineByAddress(account);
        } catch (error) { console.log(error) }
    }, [account, library]);

    const registerAirline = async (address: string, name: string) => {
        const contractAddress = config.local.appContractAddress;
        const contract = new ethers.Contract(contractAddress, FlightSuretyApp.abi, library.getSigner());
        try {
            return await contract.registerAirline(address, name);
        } catch (error) { console.log(error) }
    }

    const onSubmitRegister = (e: FormEvent) => {
        e.preventDefault();
        registerAirline(inAirlineAddress, inAirlineName).catch(console.log);
        setInAirlineAddress("");
        setInAirlineName("");
    }

    // Fetch airline name on account or network change
    useEffect(() => {
        if (account) fetchAirlineInfo()
            .then(info => {
                if (info && info.name) {
                    setName(info.name);
                    setIsRegisteredAirline(true);
                } else setIsRegisteredAirline(false);
            }).catch(console.log);

    }, [account, chainId, fetchAirlineInfo]);

    if (!isRegisteredAirline) {
        return (
            <div id="AirlineViewError">
                <h1>Only registered Airline accounts can view this page</h1>
            </div>
        )
    }

    return (
        <div id="AirlineView">
            <h1>{name}</h1>
            <h2>Register New Airline</h2>
            <Form onSubmit={(e) => onSubmitRegister(e)}>
                <Form.Group>
                    <Form.Label>Airline Address</Form.Label>
                    <Form.Control
                        onChange={(e) => setInAirlineAddress(e.target.value)}
                        value={inAirlineAddress}
                        type="text" placeholder="e.g. 0x6c540196bF38a54d559630161544b9C9FDaB6ae0">
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Airline Name</Form.Label>
                    <Form.Control
                        onChange={(e) => setInAirlineName(e.target.value)}
                        value={inAirlineName}
                        type="text" placeholder="e.g. Rainbow Airways">
                    </Form.Control>
                </Form.Group>
                <Button type="submit">Submit</Button>
            </Form>

            <hr />

            <h2>Register New Flight</h2>
            <Form>
                <Form.Group>
                    <Form.Label>Flight Number</Form.Label>
                    <Form.Control type="text" placeholder="e.g. RA1234"></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Flight Time</Form.Label>
                    <Form.Control type="text" placeholder="e.g. some convenient timestamp format...."></Form.Control>
                </Form.Group>
                <Button>Submit</Button>
            </Form>

            <hr />

            <h2>Fund Insurance Pool</h2>
            <Form>
                <Form.Group>
                    <Form.Label>Amount (ETH)</Form.Label>
                    <Form.Control type="number" placeholder="0"></Form.Control>
                </Form.Group>
                <Button>Submit</Button>
            </Form>
        </div>
    );
}

export default AirlineView;
