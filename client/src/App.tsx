import "./App.scss";
import AirlineView from './components/AirlineView';
import { useEffect, FC } from "react";
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { injectedConnector } from './config';
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    CloseButton,
    Flex,
    Button,
    Link,
    Container
} from "@chakra-ui/react";
import { LinkIcon } from "@chakra-ui/icons";


const App: FC = () => {
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
            <div id="UnsupportedNetworkError">
                <Alert status="error">
                    <AlertIcon />
                    <AlertTitle>You're connected to an unsupported network.</AlertTitle>
                    <AlertDescription>Please connect to Mainnet, Rinkeby, or Truffle.</AlertDescription>
                    <CloseButton right="8px" top="8px" />
                </Alert>
            </div>
        );
    }

    return (
        <div id="App">
            <Flex justifyContent="space-between" alignItems="center" bgColor="blackAlpha.700" py="10px">
                <Link color="blue.400" ml="10px">Flight Surety</Link>
                <Button
                    colorScheme="blue"
                    isDisabled={account ? true : false}
                    onClick={() => connectWallet()}
                    mr="10px">
                    Connect Wallet<LinkIcon ml="4px" />
                </Button>
            </Flex>

            <Container maxWidth="container.lg" mt="20px" p="50px" bgColor="blackAlpha.800" textColor="white">
                <AirlineView />
            </Container>
        </div>
    );
}

export default App;
