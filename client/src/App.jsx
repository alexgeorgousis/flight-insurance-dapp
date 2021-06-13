import "./App.scss";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import AirlineView from './components/AirlineView';
import Button from "react-bootstrap/esm/Button";
import { useEffect } from "react";
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { injectedConnector } from './config';


function App() {
    const { account, activate, error } = useWeb3React();
    const isUnsupportedNetwork = error instanceof UnsupportedChainIdError;

    useEffect(() => {
        injectedConnector.isAuthorized()
            .then(isAuthorized => {
                if (isAuthorized) {
                    activate(injectedConnector);
                }
            });
    }, [activate]);

    const connectWallet = () => {
        activate(injectedConnector);
    }

    if (isUnsupportedNetwork) {
        return (
            <div id="UnSupportedNetworkError">
                <center><h1>You're connected to an unsupported network</h1></center>
            </div>
        );
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
