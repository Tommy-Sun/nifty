import web3 from './web3';
import ArtPieceFactory from './build/ArtPieceFactory.json';

const contractAddress = '0x91bFd7D1273a7B34f9284FB2F96A930866999ACD'; //If you deployed a new contract, replace the address here!

const instance = new web3.eth.Contract(
    JSON.parse(ArtPieceFactory.interface),
    contractAddress
);


export default instance;

//Here we are taking the web3 that we just created in web3.js and creating an instance of it. 
//At the same time we are telling web3 that a deployed copy of the 'ArtPieceFactory' exists, and passing in the address that the contract is located at.

