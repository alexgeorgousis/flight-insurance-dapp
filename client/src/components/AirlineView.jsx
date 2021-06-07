import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useCallback, useEffect, useState } from 'react';
import FlightSuretyApp from '../contracts/FlightSuretyApp.json';
import web3 from '../index';
import config from '../config.json';

function AirlineView({ account }) {
    const [name, setName] = useState("Airline");
    const [authorised, setAuthorised] = useState(false);
    const [inAirlineAddress, setInAirlineAddress] = useState("");
    const [inAirlineName, setInAirlineName] = useState("");

    const fetchAirlineInfo = useCallback(async () => {
        const address = config.local.appContractAddress;
        const contract = new web3.eth.Contract(FlightSuretyApp.abi, address);
        try {
            return await contract.methods.getAirlineByAddress(account).call();
        } catch (error) { console.log(error) }
    }, [account]);

    const registerAirline = async () => {
        const address = config.local.appContractAddress;
        const contract = new web3.eth.Contract(FlightSuretyApp.abi, address);
        try {
            return await contract.methods.registerAirline(inAirlineAddress, inAirlineName).call();
        } catch (error) { console.log(error) }
    }

    const onSubmitRegister = (e) => {
        e.preventDefault();
        registerAirline(inAirlineAddress, inAirlineName)
            .then(success => {
                if (success) console.log("New airline registration successful");
                else console.log("New airline registration unsuccessful");
            }).catch(console.log);
    }

    // Fetch airline name as soon as account connects or changes 
    useEffect(() => {
        if (account) fetchAirlineInfo()
            .then(info => {
                if (info && info.name) {
                    setName(info.name);
                    setAuthorised(true);
                } else setAuthorised(false);
            }).catch(console.log);
    }, [account, fetchAirlineInfo]);

    if (!authorised) {
        return <div><center><h1>Only registered Airline accounts can view this page</h1></center></div>
    }

    return (
        <div>
            <h1>{name}</h1>
            <h2>Register New Airline</h2>
            <Form onSubmit={(e) => onSubmitRegister(e)}>
                <Form.Group>
                    <Form.Label>Airline Address</Form.Label>
                    <Form.Control
                        onChange={(e) => setInAirlineAddress(e.target.value)}
                        type="text" placeholder="e.g. 0x6c540196bF38a54d559630161544b9C9FDaB6ae0">
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Airline Name</Form.Label>
                    <Form.Control
                        onChange={(e) => setInAirlineName(e.target.value)}
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
