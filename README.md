# NiFTy 
A Non-Fungible Token (NFT) marketplace. 

## Description
This is a decentralized platform in which users can upload, buy, and sell visual-based NFT's as pieces of art. The Smart Contract is also included in the project and, if interested, may be deployed with the instructions in the deploy.js file. 

The web framework used for building this app is React.js combined with Next.js. Next.js is used for the purposes of easy server-side rendering set up. Server-side rendering is essential for using any ethereum-based application (Data cannot be fetched and displayed from the ethereum network otherwise). The languages used in this app are Solidity, Javascript, HTML, and CSS. 

2 smart contracts were written in the .sol file. The first smart contract was setup so that its instance can host a list of the other smart contracts' instances (The NFT's). This was done so that users pay for each smart contract (each NFT) themselves. For clarity: The first smart contract instance is where the NFT's are hosted, and the other smart contract instance is the NFT itself.  

## How to install
This project uses npm to install it. 
1. Download the code.
2. Unzip the folder "nifty-master".
3. Open a terminal at the root of the project (cd "/path/to/nifty-master").
4. Run "npm install" in the terminal.
5. After the dependencies have finished downloading, type "npm run dev" in the terminal (at the root of the project - nifty-master).
6. After the development server successfully starts: Input "localhost: 3000" as the URL in a browser (chrome is preferred).

Note: If you have Metamask as an extension of Chrome, please change your network to "Rinkeby Test Network" (as opposed to the Ethereum Main Network or other network). Otherwise, the app will throw an error after clicking any link. Solutions for this will be looked at in the future.

## How to use 
Once NiFTy is open in the browser, there are a few ways to interact.

### Create a New NFT 
Note: You must have Metamask and usable ETH on the Rinkbey Test Network to do this. Learn how to [obtain ETH from a Rinkbey Faucet]()
1. Click Create New NFT or the "+" on the top right of the page.
2. Upload your photographic file (as a jpeg, png, etc.)
3. Fill in the required information - title, artist name, description, etc.
4. Click "Submit".
5. Metamask will attempt to process the request. Hit confirm to complete the creation process. This will only cost ETH gas. 
6. Wait until finished creating. A new link will pop up to guide you back to the home page.

### Browse NFT's
You can browse all NFT's on the app at the home page. If you would like to look at only a particular artist's NFT's, you can click on the artish name. Similarly, if you would like to browse all the NFT's that a particular owner owns, you can click the owner's ethereum address. 

Lastly, you can see the detail page of any NFT by clicking on its picture. On the detail page, clicking on the artwork will give a screen-adjusted view of the artwork. 

### Buy an NFT
You can buy an NFT by simply clicking on one and going to its detail page. 
Near the bottom of the detail page, you will see the "Buy" button. Click to buy and confirm through Metamask. Will not allow if you already own the NFT.

### Change the Price of an NFT
If you are the owner of the NFT, you can change its price. Go to either the detail page of the NFT or navigate to your owner's page. There, you will see an icon next to the price. Clicking it will pop up a modal for inputting a new price. After inputting, click "Submit" and confirm in Metamask.

## Tests
Tests on the solidity code are included in the Nifty/test folder.
Tests were done using the Mocha, a JavaScript test framework. Ganache-cli is used for a local web3 "provider" in our tests. Ganache provides 10 local ethereum accounts with 100 ETH each for testing.   
### To Test
1. In the terminal, navigate to the root of the project (cd "/path/to/nifty-master") 
2. Run "npm run test" in the terminal. The 5 tests should pass. 










