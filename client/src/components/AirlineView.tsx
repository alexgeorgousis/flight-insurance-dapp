import { FormEvent, useEffect, useState } from 'react';
import './AirlineView.scss';
import { useWeb3React } from '@web3-react/core';
import config from '../config.json';
import FlightSuretyApp from '../contracts/FlightSuretyApp.json';
import { useCallback } from 'react';
import { ethers } from 'ethers';
import { FC } from 'react';
import { Heading, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import { Flex } from '@chakra-ui/layout';


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
            <Flex flexDirection="column">
                <Heading size="xl" textAlign="center" mb="10px">Welcome {name}</Heading>
                <Heading size="lg">Register New Airline</Heading>

                <form onSubmit={(e) => onSubmitRegister(e)}>
                    <FormControl id="airlineAddress" isRequired mt={4}>
                        <FormLabel>Airline Address</FormLabel>
                        <Input
                            placeholder="e.g. 0x6c540196bF38a54d559630161544b9C9FDaB6ae0"
                            value={inAirlineAddress || ""}
                            onChange={e => setInAirlineAddress(e.target.value)} />
                    </FormControl>
                    <FormControl id="airlineName" isRequired mt={4}>
                        <FormLabel>Airline Name</FormLabel>
                        <Input
                            placeholder="e.g. Rainbow Airways"
                            value={inAirlineName || ""}
                            onChange={e => setInAirlineName(e.target.value)} />
                    </FormControl>
                    <Button
                        type="submit"
                        colorScheme="blue"
                        mt={4}>
                        Submit
                    </Button>
                </form>

                <Heading size="lg" mt={8}>Register New Flight</Heading>
                <form>
                    <FormControl id="flightNumber" isRequired mt={4}>
                        <FormLabel>Flight Number</FormLabel>
                        <Input
                            placeholder="e.g. RA1234"
                        />
                    </FormControl>
                    <FormControl id="flightTime" isRequired mt={4}>
                        <FormLabel>Flight Time</FormLabel>
                        <Input
                            placeholder="TODO: figure out time format"
                        />
                    </FormControl>
                    <Button
                        type="submit"
                        colorScheme="blue"
                        mt={4}>
                        Submit
                    </Button>
                </form>

                <Heading size="lg" mt={8}>Fund Insurance Pool</Heading>
                <form>
                    <FormControl id="amount" isRequired mt={4}>
                        <FormLabel>Amount (ETH)</FormLabel>
                        <Input
                            type="number"
                            placeholder="0.0"
                        />
                    </FormControl>
                    <Button
                        type="submit"
                        colorScheme="blue"
                        mt={4}>
                        Submit
                    </Button>
                </form>
            </Flex>
        </div>
    );
}

export default AirlineView;
