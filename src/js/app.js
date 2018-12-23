App = {
  web3Provider: null,
  contracts: {},
  adminAcct: '0x0',
  BandMgrAcct: '0x0',

  init: async function() {
    // 
    $.getJSON('../BandApp.json', function(data) {
      //do something with data
      
    });

    return await App.initWeb3();
  },

  initWeb3: async function() {
    // Modern dapp browsers...
if (window.ethereum) {
  App.web3Provider = window.ethereum;
  try {
    // Request account access
    await window.ethereum.enable();
  } catch (error) {
    // User denied account access...
    console.error("User denied account access")
  }
}
// Legacy dapp browsers...
else if (window.web3) {
  App.web3Provider = window.web3.currentProvider;
}
// If no injected web3 instance is detected, fall back to Ganache
else {
  App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
}
web3 = new Web3(App.web3Provider);


    return App.initContract();
  },

  initContract: function() {
    $.getJSON('BandApp.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract
      var BandAppArtifact = data;
      App.contracts.BandApp = TruffleContract(BandAppArtifact);
    
      // Set the provider for our contract
      App.contracts.BandApp.setProvider(App.web3Provider);
    
      // 
      return App.render();
    });

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-adopt', App.handleAdopt);
  },

  

  render: function() {
    $("#adminpanel").hide();
    $("#bandmgrpanel").hide();
    let currentBandMgrs = [];
      
    function getCurrentBandMgrs() {
      var inumOfMgrs =0;
      var jnumOfMgrs = 0;
      //get bandmgrs from blockchain and store in array
      App.contracts.BandApp.deployed().then(function(app){
        return app.bandMgrIndex();
        }).then(function(index){
          numOfMgrs = index;
        }).then(function(){
            for (i=0; i<numOfMgrs; i++) {
              App.contracts.BandApp.deployed().then(function(app){
                //console.log(inumOfMgrs);
                inumOfMgrs++;
                return app.bandMgrs(inumOfMgrs-1);
                }).then(function(acct){
                  currentBandMgrs[jnumOfMgrs]=acct;
                  //$("#currentMgrs").append("<p>"+acct +","+ inumOfMgrs);
                  console.log("curentbandmgrs:"+currentBandMgrs[jnumOfMgrs]);
                  jnumOfMgrs++;
                  });
            }
          });
        
    }
    getCurrentBandMgrs();


    web3.eth.getCoinbase(function(err, account){
      if (err === null ){
        //App.adminAcct = account;
        //display owner
        App.contracts.BandApp.deployed().then(function(app){
          return app.owner();
          }).then(function(owner){
            App.adminAcct = owner;
            console.log("owner is " + owner);
            //$("#currentAddress").html("App.adminAcct:" + App.adminAcct);
            updateInterface();
            })

      }
    });
    let bmaIndex = 0;
    $("#submitMgr").click(function(){
      //alert('click');
      var inputAddress = '0x0';
      inputAddress = document.getElementById('BandMgrAcctAddress');
      App.BandMgrAcct=inputAddress.value;
      //bmaIndex++;
      //check if acct already submitted

      //App.BandMgrAcct = parseInt("0x"+ inputAddress);
      //$("#outputAddress").html("address entered:"+App.BandMgrAcct);
      // store address in account on blockchain
      App.contracts.BandApp.deployed().then(function(app){
        return app.addMgr(App.BandMgrAcct, {from: App.adminAcct});
      }).catch(function(err){
        console.log(err);
        })

        App.contracts.BandApp.deployed().then(function(app){
          //console.log("app.bandmgrindex=" + JSON.stringify(app.bandMgrIndex()));
          //console.log("app.bandMgrs(0) before returning and chaining then:" 
          //+ JSON.stringify(app.bandMgrs(0)));
          return app.bandMgrs(0);
          }).then(function(acct){
            console.log("app.bandMgrs(0) on the blockchain is " + acct)
            })
        // display bandmgrindex, how many band managers?
        App.contracts.BandApp.deployed().then(function(app){
          return app.bandMgrIndex();
          }).then(function(index){
            console.log("app.bandMgrIndex on the blockchain is " + index)
            })

            
      })
    
    function showCurrentMgrs() {
      var numOfMgrs = 0;
      var inumOfMgrs = 0;
      $("#currentMgrs").show();
      // display bandmgrindex, how many band managers?
      App.contracts.BandApp.deployed().then(function(app){
        return app.bandMgrIndex();
        }).then(function(index){
          numOfMgrs = index;
          //console.log("app.bandMgrIndex on the blockchain is " + index);
          $("#currentMgrs").html("<p>number of mgrs:" + numOfMgrs);
        }).then(function(){
            for (i=0; i<numOfMgrs; i++) {
              App.contracts.BandApp.deployed().then(function(app){
                //console.log(inumOfMgrs);
                inumOfMgrs++;
                return app.bandMgrs(inumOfMgrs-1);
                }).then(function(acct){
                  $("#currentMgrs").append("<p>"+acct +","+ inumOfMgrs);
                  //inumOfMgrs++;
                  });
            }
          });
    }

    function updateInterface(){
      console.log("Current:"+ web3.eth.accounts[0]);
      console.log("App.BandMgrAcct" + App.BandMgrAcct);
      console.log("app.adminacct:" + App.adminAcct);
      //isBandMgr? arr.includes(obj);
      //alert("isBandMgr?:"+currentBandMgrs.includes(web3.eth.accounts[0]));
      //check if current MMaccount === admin/owner on blockchain
      if( web3.eth.accounts[0] == App.adminAcct) {
        //hide first
        $("#bandmgrpanel").hide();
        $("#adminpanel").show();
        showCurrentMgrs();
        
      }
      // if current acct.status == band mgr, (use struct)
      //else if( web3.eth.accounts[0] == (App.BandMgrAcct/1)) {
        else if(currentBandMgrs.includes(web3.eth.accounts[0])) {
        $("#currentMgrs").hide();
        $("#bandmgrpanel").show();
        $("#adminpanel").hide();
      }
      else {
        //console.log("else");
        $("#adminpanel").hide();
        $("#bandmgrpanel").hide();
        $("#currentMgrs").hide();
      }
      
    }

//    $("#bandmgrpanel").hide();
 //   updateInterface();

    var MMaccount = web3.eth.accounts[0];
var accountInterval = setInterval(function() {
  if (web3.eth.accounts[0] !== MMaccount) {
    MMaccount = web3.eth.accounts[0];
    updateInterface();
    //alert('acct changed');
  }
}, 100);



    
  },

  handleAdopt: function(event) {
    event.preventDefault();

//    var petId = parseInt($(event.target).data('id'));

    /*
     * Replace me...
     */
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
