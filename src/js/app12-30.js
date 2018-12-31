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

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-adopt', App.handleAdopt);
  },

  buyThisSong: function(songToBuy,songPrice, songSeller) {
    alert(songToBuy+"," +songPrice+"," +songSeller);
 //   web3.eth.sendTransaction({from: web3.eth.accounts[0], to: songSeller, value: web3.toWei(songPrice, "ether")}, function(err, transactionHash){
   //   if(!err)
    //    console.log(transactionHash);
    //});
    App.contracts.BandApp.deployed().then(function(app){
      console.log(songSeller, songPrice);
      return app.buySong(songSeller, {from: web3.eth.accounts[0], value: songPrice});
        
          //return app.buySong(songSeller, {value: songPrice, from: web3.eth.accounts[0]});
        }).catch(function(err){
          console.log(err);
          })

    //get song price,transfer money to band mgr from buyer/msg.sender

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
    //let currentBandMgrs = [];

    //var inputElement = document. createElement('input');
    //inputElement.type = "button"
    //inputElement.addEventListener('click', function(){
    //  App.buyThisSong('test2', 70000000, web3.eth.accounts[0]);
    //});

    //document.body.appendChild(inputElement);
      
    


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
          }).then(function(){
            getCurrentBandMgrs()
            console.log('getcurrentbandmgs');
          })
            .then(function(){
           // updateInterface();
           //console.log('updateinterface')
            })
      }
    });

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
                console.log(inumOfMgrs);
                inumOfMgrs++;
                return app.bandMgrs(inumOfMgrs-1);
                }).then(function(acct){
                  App.currentBandMgrs[jnumOfMgrs]=acct;
                  //$("#currentMgrs").append("<p>"+acct +","+ inumOfMgrs);
                  console.log("curentbandmgrs:"+App.currentBandMgrs[jnumOfMgrs]);
                  jnumOfMgrs++;
                  })
                  .then(function(){
                    updateInterface();
            console.log('get finished');
                  })
            }
          }).then(function(){
            
          })

        
    }
//    getCurrentBandMgrs(); 

    let bmaIndex = 0;
    $("#submitMgr").click(function(){
      var inputAddress = '0x0';
      inputAddress = document.getElementById('BandMgrAcctAddress');
      App.BandMgrAcct=inputAddress.value;
      document.getElementById('BandMgrAcctAddress').value='';
      //bmaIndex++;
      //check if acct already submitted

      //App.BandMgrAcct = parseInt("0x"+ inputAddress);
      //$("#outputAddress").html("address entered:"+App.BandMgrAcct);
      // store address in account on blockchain
      App.contracts.BandApp.deployed().then(function(app){
        return app.addMgr(App.BandMgrAcct, {from: App.adminAcct});
      }).catch(function(err){
        console.log(err);
        }).then(function(){
          showCurrentMgrs();
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
      });

      $("#submitSong").click(function(){
        let inputSong;
        let inputPrice;
        inputSong = document.getElementById('song');
        inputSong = inputSong.value;
        inputPrice = document.getElementById('price');
        inputPrice = inputPrice.value;
        alert(inputPrice);
        App.contracts.BandApp.deployed().then(function(app){
          return app.addSong(inputSong, web3.toWei(inputPrice, "ether"), {from: web3.eth.accounts[0]});
        }).catch(function(err){
          console.log(err);
          }).then(function(){
            //showCurrentSongandPricelist();
          })
      });

//      $("#buySong").click(function(){
  //      alert('bought');
    //  })
    $(document).on('click', '#buySong', function(){
      alert('bought');
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

    function showSongsForSale() {
      var num = 0;
      var inum = 0;
      $("#songsforsale").show();
      // display bandmgrindex, how many band managers?
      App.contracts.BandApp.deployed().then(function(app){
        return app.songIndex();
        }).then(function(index){
          num = index;
          //console.log("app.bandMgrIndex on the blockchain is " + index);
          $("#songsforsale").html("<p>number of songs:" + num);
        }).then(function(){
            for (i=0; i<num; i++) {
              App.contracts.BandApp.deployed().then(function(app){
                //console.log(inumOfMgrs);
                inum++;
                return app.songs(inum-1);
                }).then(function(song){
                  $("#songsforsale").append("<p>Name:"+song[0]
                  +" | price: "+ web3.fromWei(song[1], 'ether')+" ether");
               //   +" <button id='buySong' type='submit'>Buy Song</button>");
                  var currentSong = song[0];
                  var currentPrice = song[1];
                  var currentMgr = song[2];
                  //0:name, 1:price, 2:seller
                  var songButton = '<button onclick="App.buyThisSong(\'' + song[0] + '\','+ song[1] + ',\'' + song[2] + '\')">buy '+song[0]+'</button>';
                  //var songButton = '<button onclick="App.buyThisSong(\''+song[0]+','+song[1]+','+song[2]+'\')">buy '+song[0]+'</button>';
                  
                  $("#songsforsale").append(songButton);
                  //inumOfMgrs++;
                  });
            }
          });
    }

    function updateInterface(){
      console.log("Current:"+ web3.eth.accounts[0]);
      $("#currentAddress").html("Current account address: "+web3.eth.accounts[0]);
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
        else if(App.currentBandMgrs.includes(web3.eth.accounts[0])) {
          //alert('bandmgr');
        $("#currentMgrs").hide();
        $("#bandmgrpanel").show();
        $("#adminpanel").hide();
        $("#songsforsale").hide();
      }
      else {
    //        alert("songsforsale");
        showSongsForSale();
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
    //updateInterface();
    getCurrentBandMgrs();
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
