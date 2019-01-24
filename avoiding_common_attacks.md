what measures were taken to ensure contracts are not susceptible to common attacks. (Module 9 Lesson 3)
## Integer arithmetic overflow
SafeMath library used to increment counter by 1, library checks to make sure integer does not wraparound

## tx.origin problem
msg.sender is always used in the contract

## Gas limits
no loops are currently used in the contract

## Poison data
For song input, the type is set to text for song name and number for price on the front end. If an incorrect address is input for a band manager, the band manager panel will not be shown 
