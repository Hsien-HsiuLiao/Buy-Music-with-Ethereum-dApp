pragma solidity ^0.4.17;

contract BandApp {
    mapping (uint => address) public bandMgrs;
    uint public bandMgrIndex = 0;

    function addMgr (address bandMgraddress) public {
        bandMgrs[bandMgrIndex] = bandMgraddress;
        bandMgrIndex ++;
    }
    
}
