import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import FlightSuretyApp from '../contracts/FlightSuretyApp.json';
import web3 from '../index';
import config from '../config.json';

function AirlineView({ account }) {
    const [name, setName] = useState("Airline");

    // Fetch airline name as soon as account connects 
    useEffect(() => {
        async function fetchName() {
            const address = config.local.appContractAddress;
            const contract = new web3.eth.Contract(FlightSuretyApp.abi, address);
            try {
                const response = await contract.methods.getAirlineByAddress(account).call();
                if (response.name) setName(response.name);
            } catch (error) { console.log(error) }
        }
        account && fetchName();
    }, [account]);

    return (
        <div>
            <h1>{name}</h1>
            <h2>Register New Airline</h2>
            <Form>
                <Form.Group>
                    <Form.Label>Airline Address</Form.Label>
                    <Form.Control type="text" placeholder="e.g. 0x6c540196bF38a54d559630161544b9C9FDaB6ae0"></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Airline Name</Form.Label>
                    <Form.Control type="text" placeholder="e.g. Rainbow Airways"></Form.Control>
                </Form.Group>
                <Button>Submit</Button>
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
