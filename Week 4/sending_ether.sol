// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Contract {

    address public charity;
    address public owner;
    
    constructor(address _charity){
        owner = msg.sender;
        charity = _charity;
    }

    // Send all ether to the owner
    function tip() public payable {
    (bool res,) = owner.call{ value: msg.value} ("");
    require(res);
    }

    // Take all remaining funds in this contract and donate them to charity
    function donate() public payable {
    (bool res,) = charity.call{ value: address(this).balance} ("");
    require(res);

    // Once all remaining balance has been donated to charity, destroy this contract
    // and send any ether to whoever called the contract.
    selfdestruct(payable(msg.sender));
    }
    
    // Fallback fn
    receive() external payable {   
    }
}
