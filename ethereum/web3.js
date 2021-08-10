import Web3 from "web3";
 
let web3;
 
if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  // We are in the browser and metamask is running.
  window.ethereum.request({ method: "eth_requestAccounts" });
  web3 = new Web3(window.ethereum);
} else {
  // We are on the server *OR* the user is not running metamask
  const provider = new Web3.providers.HttpProvider(
    "https://rinkeby.infura.io/v3/28094ba44b764e06bf23fe8a04d6c157"
  );
  web3 = new Web3(provider);
}
 
export default web3;



// We hijacked the provider from metamask and we connected it with our own version of web3 (the newer one). 