const BandApp = artifacts.require("BandApp");

//test addMgr function
//get value of bandmgrindex
//call addmgr function
// bandmgrindex should be increasd by 1
contract("BandApp", accounts => {
    it("should increase bandmgrindex by 1 when calling addMgr function", () => {
        let indexBefore;
        let indexAfter;
        let contract;
        return BandApp.deployed()
        .then(instance => {
            contract = instance;
            return instance.bandMgrIndex();
        })
        .then(result => {
            indexBefore = result.toNumber();    
        })
        .then( () => {
            contract.addMgr(accounts[0]);
        })
        .then( () => {
            return contract.bandMgrIndex();
        })
        .then(newIndex => {
            indexAfter = newIndex.toNumber();        
        })
        .then( () => {
            assert.equal(indexBefore+1, indexAfter, "bandMgrIndex should have increased by 1")    
        })
    })
})

//test addSong function

//test buySong function


