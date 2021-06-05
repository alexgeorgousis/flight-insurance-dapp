import "./App.scss";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import AirlineView from './AirlineView';
import Button from "react-bootstrap/esm/Button";
import { useEffect, useState } from "react";
import web3 from "../index";


function App() {
    const [account, setAccount] = useState("");

    // Check if already connected to provider
    useEffect(() => {
        web3.eth.getAccounts()
            .then(accounts => accounts.length && setAccount(accounts[0]))
            .catch(console.log);
    }, []);

    // Listen for account changes and disconnects 
    useEffect(() => {
        window.ethereum.on("accountsChanged", accounts => {
            if (accounts.length > 0) setAccount(accounts[0]);
            else setAccount("");
        });
    }, []);

    const connectWallet = () => {
        web3.eth.requestAccounts()
            .then(accounts => accounts.length && setAccount(accounts[0]))
            .catch(console.log);
    }

    return (
        <div id="App">

            <div id="navbar">
                <Navbar bg="dark" expand="md" fixed="top">
                    <Navbar.Brand><span id="brandText">Flight Surety</span></Navbar.Brand>
                    <Button
                        variant={account ? "outline-secondary" : "outline-primary"}
                        disabled={account}
                        onClick={() => connectWallet()}>
                        Connect Wallet
                    </Button>
                </Navbar>
            </div>

            <Container id="main">
                <AirlineView />
            </Container>

        </div>
    );
}

export default App;
