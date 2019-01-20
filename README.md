# Final project for the ConsenSys Developer Program 2018-2019
### What does this project do?

This is a decentralized application where a visitor can purchase songs for sale. The songs are listed for sale by the band manager who manages the artist/songs. The app admin is the only one that can that add band managers via their account address. Once added, the band managers can then add songs for sale to the site. Visitors can visit the site and purchase songs in Ether which is sent directly to the band manager who subitted the song.  

#### Admin - Adds band managers by account address, can see a list of current band managers
#### band manager - Can add songs for sale
#### (future functionality): an account will be created for the visitor to access songs that they purchased

## How to set up
### (run a local development server), install MetaMask

    ganache-cli

open browser with metamask extension,  import using seed phrase generated by ganache-cli

In the project directory, run 

    truffle compile

     truffle migrate

    npm run dev

The app should now be running in the browser. The first account is set as the admin account, and you will be able to add a band manager from here. For testing, we will use Account 2 to copy the address and input it as a band manager. After submitting the address, the list of band managers will be updated in the Admin panel. And if you switch to Account 2 in Metamask, you will now see a Band Manager panel.



## Testing
step 1. Make sure local blockchain is running, 

        $ ganche-cli

step 2. run 

    $ truffle test

 

●          Design Pattern Requirements:

○          Implement a circuit breaker (emergency stop) pattern

○          What other design patterns have you used / not used?

■          Why did you choose the patterns that you did?

■          Why not others?

 

●          Security Tools / Common Attacks:

○          Explain what measures you’ve taken to ensure that your contracts are not susceptible to common attacks

 

●          Use a library or extend a contract

○          Via EthPM or write your own

 

   Deploy your application onto one of the test networks. Include a document called deployed_addresses.txt that describes where your contracts live (which testnet and address).

   Students can verify their source code using etherscan for the appropriate testnet https://etherscan.io/verifyContract 
    Evaluators can check by getting the provided contract ABI and calling a function on the deployed contract at https://www.myetherwallet.com/#contracts or checking the verification on etherscan

● Future implementations:

   Implement an upgradable design pattern
   Write a smart contract in LLL or Vyper

○  IPFS

   Users can dynamically upload documents to IPFS that are referenced via their smart contract

■      uPort

■      Ethereum Name Service

   A name registered on the ENS resolves to the contract, verifiable on rinkeby.etherscan.io/contract_name

■      Oracle
