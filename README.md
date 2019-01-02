# consensys-final-project-dApp
final project for the Developer Program 2018-2019
## What does this project do?

#### Admin - can see everything and approve changes, approves and adds band managers by account address, can see a list of current band managers
#### band manager - can add/remove band members, book tour dates, add songs and merchandise for sale
#### band member -
#### club owner -
#### fan

## How to set up
### (run a local development server)
Implement/ use a library or an EthPM package 
Requirements

●          User Interface Requirements:

○          Run the app on a dev server locally for testing/grading

○          You should be able to visit a URL and interact with the application

■          App recognizes current account

■          Sign transactions using MetaMask / uPort

■          Contract state is updated

■          Update reflected in UI

 

●          Test Requirements:

○          Write 5 tests for each contract you wrote

■          Solidity or JavaScript

○          Explain why you wrote those tests

○          Tests run with truffle test

 

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

●          Stretch requirements (for bonus points, not required):

    Implement an upgradable design pattern
    Write a smart contract in LLL or Vyper

○          Integrate with an additional service, maybe even one we did not cover in this class

For example:

■      IPFS

    Users can dynamically upload documents to IPFS that are referenced via their smart contract

■      uPort

■      Ethereum Name Service

    A name registered on the ENS resolves to the contract, verifiable on rinkeby.etherscan.io/contract_name

■      Oracle
