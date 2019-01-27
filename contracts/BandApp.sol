pragma solidity ^0.4.17;

import "./SafeMath.sol";

/** @title Band Merchandise Web Store Application */
contract BandApp {
    using SafeMath for uint256;

    mapping (uint => address) public bandMgrs;
    uint public bandMgrIndex = 0;
    uint public songIndex = 0;
    address public owner;

    struct Song {
    string songname;
    uint price;
    address seller;
    address buyer;
    }

    mapping ( uint => Song) public songs;
    bool public stopped = false;

    modifier stopInEmergency { require(!stopped); _; }

    //currently commented out to investigate other ways of verifying band manager without looping through an array
    modifier isBandMgr { 
        
        /* for (i=0;i<bandMgrIndex+1; i++){
            if (msg.sender == bandMgrs[bandMgrIndex]){
            found = 1
            }
            }
        require(found>=1);
        */
        _;
    }

    constructor() public {
        owner = msg.sender;
    }

    /**
     * @dev Adds admin inputted address to bandMgrs mapping
     * @param bandMgraddress Account address of band manager to be added
     */
    function addMgr (address bandMgraddress) public {
        require(owner == msg.sender);
        bandMgrs[bandMgrIndex] = bandMgraddress;
        bandMgrIndex = bandMgrIndex.add(1);
        //bandMgrIndex++;
    }
    
    /**
     * @dev Band manager input song name and song price into songs mapping
     * @param _songname The name of the song being added by the band manager
     * @param _price The purchase price of the song in ether
     */
    function addSong (string _songname, uint  _price) public {
        songs[songIndex] = Song({songname: _songname, price: _price, seller: msg.sender, buyer: 0 });
        songIndex++;
    }

    /**
     * @dev Function for when a visitor to the app purchases a song, but will not run if the admin pauses the contract in an emergency
     * @param _seller Account address of the band manager who added the song being bought
     */
    function buySong (address _seller) stopInEmergency public payable {
        _seller.transfer(msg.value);

    }

    /**
     * @dev toggles the value of stopped if run
     */
    function circuitBreakerPressed () public {
        stopped = !stopped;
    }
}