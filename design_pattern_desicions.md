explains why design patterns were chosen

Module 10 https://solidity.readthedocs.io/en/develop/common-patterns.html

#### Fail early, Fail loud 
Included require statement to check if msg.sender is owner before executing the rest of the addMgr function
to fail as soon as possible and always throw an exception

included selfdestruct function

#### Circuit breaker
Allows admin to stop functions from executing

include modifiers so that only certain accounts can run certain functions

#### State Machine design pattern not necessary
