// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Party {
    uint cost;
    address[] friends;
    mapping(address => bool) public hasRSVP;

    constructor(uint256 _cost){
        cost = _cost;
    }

    function rsvp () external payable{
        require(msg.value == cost);
        require(hasRSVP[msg.sender] != true);

        hasRSVP[msg.sender] = true;
        friends.push(msg.sender);
    }

    function payBill (address _venue,uint _totalCost) public {
        (bool success, ) = _venue.call{value:_totalCost}('');
        require(success);
        uint leftover = address(this).balance;
        if(leftover>0 ){
        
        uint returnPerPerson = leftover/friends.length;

        for(uint i = 0;i<friends.length;i++){
            (bool yes, ) = friends[i].call{value:returnPerPerson}('');
            require(yes);
        }
        }

    }
	
}
