import web3 from '../index';
import config from '../config.json';
import FlightSuretyApp from '../contracts/FlightSuretyApp.json';


const contractAddress = config.local.appContractAddress;

export async function fetchAirlineInfo(accountAddress) {
    const contract = new web3.eth.Contract(FlightSuretyApp.abi, contractAddress);
    try {
        return await contract.methods.getAirlineByAddress(accountAddress).call();
    } catch (error) { console.log(error) }
}

export async function registerAirline(address, name) {
    const contract = new web3.eth.Contract(FlightSuretyApp.abi, contractAddress);
    try {
        return await contract.methods.registerAirline(address, name).call();
    } catch (error) { console.log(error) }
}
