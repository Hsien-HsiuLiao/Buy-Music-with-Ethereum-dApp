pragma solidity ^0.4.17;

contract BandApp {
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

    function BandApp() public {
        owner = msg.sender;
    }

    function addMgr (address bandMgraddress) public {
        bandMgrs[bandMgrIndex] = bandMgraddress;
        bandMgrIndex ++;
    }
    
    function addSong (string _songname, uint  _price) public {
        songs[songIndex] = Song({songname: _songname, price: _price, seller: msg.sender, buyer: 0 });
        songIndex++;
    }

    function buySong (address _seller) public payable {
        _seller.transfer(msg.value);

    }
}
