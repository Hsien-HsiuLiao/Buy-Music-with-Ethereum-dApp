module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    }, 
    rinkeby: {
      provider: () => new HDWallet(mnemonic, 'https://rinkeby.infura.io/${infuraKey}'),
      network_id: 4,    //Rinkeby's id
      gas: 5500000,
    },
  },

  compilers: {
     solc: {
       version: "0.4.24"  // ex:  "0.4.20". (Default: Truffle's installed solc)
     }
  }
};
var infura = "https://rinkeby.infura.io/v3/e8746dd884324d37984f917e061064ee"
var HDWallet = require("truffle-hdwallet-provider");
const infuraKey = "e8746dd884324d37984f917e061064ee";
const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();