import web3 from './web3';
import ArtPieceFactory from './build/ArtPieceFactory.json';

const contractAddress = '0x4D0fa3Ee7d743e89e0a40d44df99e03168DaFAE9'; //If you deployed a new contract, replace the address here!

const instance = new web3.eth.Contract(
    JSON.parse(ArtPieceFactory.interface),
    contractAddress
);


export default instance;

//Here we are taking the web3 that we just created in web3.js and creating an instance of it. 
//At the same time we are telling web3 that a deployed copy of the 'ArtPieceFactory' exists, and passing in the address that the contract is located at. 0x4D0fa3Ee7d743e89e0a40d44df99e03168DaFAE9

