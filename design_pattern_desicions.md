
# Design Pattern Decisions

○          What other design patterns have you used / not used?

■          Why not others?


Module 10 https://solidity.readthedocs.io/en/develop/common-patterns.html

#### Fail early, Fail loud 
Included require statement instead of if statement to check if msg.sender is owner before executing the rest of the addMgr function
to fail as soon as possible and always throw an exception


#### Circuit breaker
Allows admin to stop functions from executing. On the front , there is an Emergency Stop button that only the admin can see. When pressed , purchasing a song will no longer work.

#### Restrciting access
Included modifiers and require statements so that only certain accounts can run certain functions. Only an admin can see and perform admin functions. And only a band manager can see and perform band manager functions.

#### State Machine 
Design pattern not necessary, admin can always add band managers and band managers can always add songs for sale.
This could change in the future if it was decided to have a sale on songs, then prices would be reduced for a specified time and shown to visitors

#### Withdrawal from Contracts
Would like to investigate if this is a needed method, instead ofthe current implementation of tranferring funds to the seller during a sale
