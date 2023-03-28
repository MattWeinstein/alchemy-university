// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

contract Switch {
    address owner;
    address recipient;
    uint expiry;

    constructor (address _recipient) payable {
        owner = msg.sender;
        recipient = _recipient;
        expiry = block.timestamp + 52 weeks;
    }

    function withdraw () external {
        require(block.timestamp > expiry);
        (bool success, ) = recipient.call{value: address(this).balance}("");
        require(success) ;
    }

    function ping () public {
        require(msg.sender == owner,"Only the owner of the contract can ping");
        expiry = block.timestamp + 52 weeks;
    }
}
