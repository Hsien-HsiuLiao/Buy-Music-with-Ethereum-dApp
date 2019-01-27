App = {
  web3Provider: null,
  contracts: {},
  adminAcct: '0x0',
  BandMgrAcct: '0x0',
  currentBandMgrs: [],

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

  
  },
//circuit breaker to stop contract from functioning in an emergency
  circuitBreakerPressed: function() {
    var instance;
    App.contracts.BandApp.deployed().then(function(app){
      app.circuitBreakerPressed();
      instance = app;
    }).then(function(){
      return instance.stopped();
    }).then(function(stopped){
     // alert(stopped);
    })

  },

  buyThisSong: function(songToBuy,songPrice, songSeller) {
    //alert(songToBuy+"," +songPrice+"," +songSeller);
    App.contracts.BandApp.deployed().then(function(app){
      console.log(songSeller, songPrice);
      return app.buySong(songSeller, {from: web3.eth.accounts[0], value: songPrice});
        }).catch(function(err){
          console.log(err);
          })

    //get song price,transfer money to band mgr from buyer/msg.sender
  
    //future implementation:
    //add song to user account to display songs bought
    //App.contracts.BandApp.deployed().then(function(app){
    //      return app.adtomylist(songtobuy, {from: web3.eth.accounts[0]});
    //    }).catch(function(err){
    //      console.log(err);
    //      })
  },  

  render: function() {
    $("#adminpanel").hide();
    $("#bandmgrpanel").hide();

    //default account set as admin
    web3.eth.getCoinbase(function(err, account){
      if (err === null ){
        
        //display owner
        App.contracts.BandApp.deployed().then(function(app){
          return app.owner();
          }).then(function(owner){
            App.adminAcct = owner;
            console.log("owner is " + owner);
            //$("#currentAddress").html("App.adminAcct:" + App.adminAcct);
          }).then(function(){
            getCurrentBandMgrs()
            console.log('getcurrentbandmgs');
          })
            .then(function(){
           updateInterface();
           console.log('updateinterface')
            })
      }
    });

    // get current managers to verify and display list
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
                inumOfMgrs++;
                return app.bandMgrs(inumOfMgrs-1);
                }).then(function(acct){
                  App.currentBandMgrs[jnumOfMgrs]=acct;
                  jnumOfMgrs++;
                  })
                  .then(function(){
                 //   updateInterface();
            console.log('getCurrentBandMgrs finished');
                  })
            }
          }).then(function(){
            
          })

        
    }

    //button submits band manager, updates list and band manager array
    let bmaIndex = 0;
    $("#submitMgr").click(function(){
      var inputAddress = '0x0';
      inputAddress = document.getElementById('BandMgrAcctAddress');
      App.BandMgrAcct=inputAddress.value;
      document.getElementById('BandMgrAcctAddress').value='';
      App.contracts.BandApp.deployed().then(function(app){
        return app.addMgr(App.BandMgrAcct, {from: App.adminAcct});
      }).catch(function(err){
        console.log(err);
        }).then(function(){
          showCurrentMgrs();
          getCurrentBandMgrs();
        })

        App.contracts.BandApp.deployed().then(function(app){
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
      });

        // allows band manager to submit a song for sale to visitors
      $("#submitSong").click(function(){
        let inputSong;
        let inputPrice;
        inputSong = document.getElementById('song');
        inputSong = inputSong.value;
        document.getElementById('song').value = '';
        inputPrice = document.getElementById('price');
        inputPrice = inputPrice.value;
        document.getElementById('price').value = '';
        
        App.contracts.BandApp.deployed().then(function(app){
          return app.addSong(inputSong, web3.toWei(inputPrice, "ether"), {from: web3.eth.accounts[0]});
        }).catch(function(err){
          console.log(err);
          }).then(function(){
            //showCurrentSongandPricelist();
            //showSongsForSale();
          })
      });


      $(document).on('click', '#buySong', function(){
      alert('bought');
    })
    
    // shows current list of band managers to Admin so they do not input address more than once
    function showCurrentMgrs() {
      var numOfMgrs = 0;
      var inumOfMgrs = 0;
      $("#currentMgrs").show();
      // display bandmgrindex, how many band managers?
      App.contracts.BandApp.deployed().then(function(app){
        return app.bandMgrIndex();
        }).then(function(index){
          numOfMgrs = index;
          $("#currentMgrs").html("<p><h3>Current number of band managers: " + numOfMgrs + "</h3>");
        }).then(function(){
            for (i=0; i<numOfMgrs; i++) {
              App.contracts.BandApp.deployed().then(function(app){
                inumOfMgrs++;
                return app.bandMgrs(inumOfMgrs-1);
                }).then(function(acct){
                  $("#currentMgrs").append("Band Manager account address<p>" + acct);
                  console.log("inumOfMgrs: " + inumOfMgrs)
                  });
            }
          });
    }

      //displays songs for sale to vistors
    function showSongsForSale() {
      var num = 0;
      var inum = 0;
      $("#songsforsale").show();
      // display bandmgrindex, how many band managers?
      App.contracts.BandApp.deployed().then(function(app){
        return app.songIndex();
        }).then(function(index){
          num = index;
          $("#songsforsale").html("<p>number of songs:" + num);
        }).then(function(){
            for (i=0; i<num; i++) {
              App.contracts.BandApp.deployed().then(function(app){
                inum++;
                return app.songs(inum-1);
                }).then(function(song){
                  $("#songsforsale").append("<p><p>Name: "+song[0]
                  +" | price: "+ web3.fromWei(song[1], 'ether')+" ether");
                  var currentSong = song[0];
                  var currentPrice = song[1];
                  var currentMgr = song[2];
                  //0:name, 1:price, 2:seller
                  var songButton = '<button onclick="App.buyThisSong(\'' + song[0] + '\','+ song[1] + ',\'' + song[2] + '\')"><b>BUY</b> '+song[0]+'</button>';
                  //var songButton = '<button onclick="App.buyThisSong(\''+song[0]+','+song[1]+','+song[2]+'\')">buy '+song[0]+'</button>';
                  
                  $("#songsforsale").append(songButton);
                  });
            }
          });
    }

      // updates web page whenever account changes in MetaMask
      // shows different views according to account
    function updateInterface(){
      console.log("Current:"+ web3.eth.accounts[0]);
      $("#currentAddress").html("Your account address: "+web3.eth.accounts[0]);
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
        $("#songsforsale").hide();
        
      }
      // if current acct.status == band mgr, (use struct)
        else if(App.currentBandMgrs.includes(web3.eth.accounts[0])) {
          $("#bandmgrpanel").show();
        $("#currentMgrs").hide();
        $("#adminpanel").hide();
        $("#songsforsale").hide();
        //showSongsForSale();

      }
      else {
        showSongsForSale();
        console.log("updateinterface, else, showsngsforsale")
        $("#adminpanel").hide();
        $("#bandmgrpanel").hide();
        $("#currentMgrs").hide();
      }
      
    }

    // checks to see if account has changed in MetaMask
    var MMaccount = web3.eth.accounts[0];
    var accountInterval = setInterval(function() {
      if (web3.eth.accounts[0] !== MMaccount) {
        MMaccount = web3.eth.accounts[0];
        updateInterface();
        getCurrentBandMgrs();
        }
    }, 100);



    
  },


};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
