#Nifty 
A Non-Fungible Token (NFT) marketplace. 

#Description
This is a decentralized platform in which users can upload, buy, and sell visual-based NFT's as pieces of art. The Smart Contract is also included in the project and, if interested, may be deployed with the instructions in the deploy.js file. 

The web framework used for building this app is React.js combined with Next.js. Next.js is used for the purposes of easy server-side rendering set up. Server-side rendering is essential for using any ethereum-based application (Data cannot be fetched and displayed from the ethereum network otherwise). The languages used in this app are Solidity, Javascript, HTML, and CSS. 

2 smart contracts were written in the .sol file. The first smart contract was setup so that its instance can host a list of the other smart contracts' instances (The NFT's). This was done so that users pay for each smart contract (each NFT) themselves. For clarity: The first smart contract instance is where the NFT's are hosted, and the other smart contract instance is the NFT itself.  

#How to install
This project uses npm to install it. 
Step 1. Download the code
Step 2. Unzip the folder "nifty-master"
Step 3. Open a terminal at the root of the project (cd "/path/to/nifty-master") 
Step 4. Run "npm install" in the terminal
Step 5. After the dependencies have finished downloading, type "npm run dev" in the terminal (at the root of the project - nifty-master)
Step 6. After the development server successfully starts: Input "localhost: 3000" as the URL in a browser

Note: If you have Metamask as an extension of Chrome, please change your network to "Rinkeby Test Network" (as opposed to the Ethereum Main Network or other network). Otherwise, the app will throw an error after clicking any link.




