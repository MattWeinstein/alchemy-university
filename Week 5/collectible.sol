// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Collectible {
    address owner;
    uint salePrice;  

    event Deployed(address indexed _address);
    event Transfer(address indexed _originalOwner,address indexed _newOwner);
    event ForSale(uint _price, uint _timestamp);
    event Purchase(uint _purchaseAmount, address indexed _buyer);

    constructor(){
        // Owner of contract will emit the deployed event
            // Owner will start with collectible
        emit Deployed(msg.sender); 
        owner = msg.sender;
        salePrice = 0;
    }
    function transfer(address _recipient)external{
        // Current owner cannot send to themself
        require(owner != _recipient);
        emit Transfer(msg.sender,_recipient);
        owner = _recipient;
    }

    function markPrice (uint _askingPrice)external {
        // Only the current colelctible owner can set the price
        require(msg.sender == owner, "Only the collectible owner can set the price");
        emit ForSale (_askingPrice, block.timestamp);
        salePrice = _askingPrice;
    }
    
    function purchase () external payable{
        require(msg.value >= salePrice,"Cannot purchase collectible - not enough funds ");
        require(salePrice >0,"Item is not for sale" );

        (bool success, ) = owner.call{ value: msg.value }("");
        require(success,"Funds did not transfer correctly");
        owner = msg.sender;
        emit ForSale (0, block.timestamp);
        salePrice = 0;

        emit Transfer(owner,msg.sender);
        emit Purchase (msg.value,msg.sender);
    }
}
