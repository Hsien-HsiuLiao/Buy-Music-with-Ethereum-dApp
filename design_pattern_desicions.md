
# Design Pattern Decisions

○          What other design patterns have you used / not used?

■          Why did you choose the patterns that you did?

■          Why not others?

explains why design patterns were chosen

Module 10 https://solidity.readthedocs.io/en/develop/common-patterns.html

#### Fail early, Fail loud 
Included require statement to check if msg.sender is owner before executing the rest of the addMgr function
to fail as soon as possible and always throw an exception


#### Circuit breaker
Allows admin to stop functions from executing. On the front , there is an Emergency Stop button that only the admin can see. When pressed , purchasing a song will no longer work.

include modifiers so that only certain accounts can run certain functions

#### State Machine 
design pattern not necessary, admin can always add band managers and band managers can always add songs for sale
This could change in the future if it was decided to have a sale on songs, then prices would be reduced for a specified time and shown to visitors
