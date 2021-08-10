/*

In order to deploy your smart contract onto the ethereum network: You must have your own providerURL, and Mnemonic Phrase.

  To Get a providerURL:
    You can get this for free at the website infura.io (Google search it). Make an account. Hit the Ethereum tab. 
    Create a new project (with any name you want). Change the EndPoint from MainNet to Rinkeby. Get the endpoint/URL which should look like: 
    "https://rinkeby.infura.io/v3/ExampleOfURL"

  To get a Mnemonic Phrase:
    You must have an ethereum wallet set up. I recommend using Metamask (a product of Google). 
      Metamask installation: 
        It it a Chrome extension, so I also recommend using Chrome as your browser. In the Chrome Webstore Search: Metamask .
        Hit add to Chrome Extension. (For easy access, you can add the extension to your chrome browser's toolbar on the top right.) Once you have your Metamask account set up, 
        Metamask will autogenerate your multi word "mnemonic" password. This password is the key for managaing all of your funds in your new ethereum wallet. 
        The mnemonicPhrase should look like: "meteor giraffe stink steal solid assault grade roll belly dress flying hamster" 
        (Also change to Rinkeby Network instead of Mainnet. Rinkeby is the test network so you can use that instead of using real money.)
    
  Replace the providerURL and mnemonicPhrase below with your own.  

*/

const providerURL = ""; //Input ProviderURL here.
const mnemonicPhrase = ""; //Input Mnemonic Phrase here.

const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/ArtPieceFactory.json');

const provider = new HDWalletProvider({
    mnemonic: {
      phrase: mnemonicPhrase
    },
    providerOrUrl: providerURL
  });
  
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account', accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({ data: compiledFactory.bytecode, arguments: ['Hi there!']} )
        .send({ gas: '1000000', from: accounts[0] });

    console.log('Contract deployed to', result.options.address);
};
deploy();

/*

To deploy the new contract, cd to the ethereum folder, then run node compile.js, then run node deploy.js.

(This will run the script in this file. It will use the ArtPieceFactory.json in ethereum/build as the information for the smart contract, and deploy it!)

After deploying:
  In the terminal you should see:            Contract deployed to: **YourContract'sNewAddress**
  Copy the address
  Replace the contractAddress in the factory.js file with the new address.

To run website in development mode:
  In the terminal, cd to the root of the project, aka nifty, and run npm run dev.
  Voila! Open the website in the browser and add, sell, and buy your own NFT's using the ethereum blockchain! 

*/
