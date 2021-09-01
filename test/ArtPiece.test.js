const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

//This file is used to test our Solidity Code!
//Using the mocha package for testing. 

const compiledFactory = require('../ethereum/build/ArtPieceFactory.json');
const compiledArtPiece = require('../ethereum/build/ArtPiece.json');

let accounts;
let factory; 
let artPieceAddress;
let artPiece;

//beforeEach runs before every single test.

beforeEach(async () => {
    accounts = await web3.eth.getAccounts(); //create accounts

    factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({ data: compiledFactory.bytecode })
        .send({ from: accounts[0], gas: '1000000'}); //deploy factory

    await factory.methods.createArtPiece('The Monalisa', '5000000000000000000', 'Leonardo Da Vinci', 'The greatest artpiece', 'Some ipfsHash').send({
        from: accounts[0], gas: '1000000'
    }); //create new factory

    const addresses = await factory.methods.getDeployedArtPieces().call(); //get all artpieces' addresses (but we've only created one)
    artPieceAddress = addresses[0]; //specify the one artpiece address
    artPiece = await new web3.eth.Contract(
        JSON.parse(compiledArtPiece.interface),
        artPieceAddress
    ); //instruct web3 of the new artPiece's existence. Not creating a new artPiece.
});

//Each *it* statment is a test. Each test has 1 or more assertions.

describe('ArtPieces', () => {
    it('deploys a factory and an artpiece', () => {
        assert.ok(factory.options.address);
        assert.ok(artPiece.options.address);
    }); //test to make sure both contracts got deployed. Do that by looking for the existence of their addresses.

    it('checks to make sure the new artpiece has the correct owner', async () => {
        const owner = await artPiece.methods.owner().call();
        assert.strictEqual(accounts[0], owner); //1st argument is what we hope it is, 2nd argument is what it actually is
    });

    it('checks to make sure the new artpiece has the correct name', async () => {
        const title = await artPiece.methods.title().call();
        assert.strictEqual('The Monalisa', title); //1st argument is what we hope it is, 2nd argument is what it actually is
    });

    it('checks to make sure the new artpiece has the correct price', async () => {
        const price = await artPiece.methods.price().call();
        assert.strictEqual('5000000000000000000', price); //1st argument is what we hope it is, 2nd argument is what it actually is
    });

    it('processes the transfer of money and ownership of an artpiece', async () => {
        await artPiece.methods.buyArtPiece().send({ from: accounts[1], value: '5000000000000000000', gas: '1000000' });

        let balance1 = await web3.eth.getBalance(accounts[1]);
        balance1 = web3.utils.fromWei(balance1, 'ether');
        balance1 = parseFloat(balance1);

        let balance0 = await web3.eth.getBalance(accounts[0]);
        balance0 = web3.utils.fromWei(balance0, 'ether');
        balance0 = parseFloat(balance0);

        console.log(balance1);
        console.log(balance0);
        const owner = await artPiece.methods.owner().call();

        assert(balance0 > 104);
        assert(balance1 < 96);
        assert.strictEqual(accounts[1], owner);
    });
});

