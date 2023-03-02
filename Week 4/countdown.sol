// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

//Contract will selfdestruct after it is called 10 times
contract Contract {
    // Must initalize as state variable to be accessible in methods
    uint8 count;

    constructor(){
        count = 0;
    }

    function tick() external{
        count = count+1;
        if(count == 10){
            address payable contractAddress = payable(address(this));
            // Self destruct argument must be payable
                // Contract will automatically recieve funds
            selfdestruct(contractAddress);
        }
    }
}
