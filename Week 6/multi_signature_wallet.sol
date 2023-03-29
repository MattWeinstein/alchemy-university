// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract MultiSig {
    address[] public owners;
    uint public required;
    Transaction[] public transactions;

    mapping (uint  => mapping (address => bool )) public confirmations;

    struct Transaction {
        address txnDestination;
        uint txnValue;
        bool executed;
        bytes data;
    }

    constructor(address[] memory _owners, uint _requiredConfirmations){
        require(_owners.length > 0);
        require(_requiredConfirmations != 0);
        require(_requiredConfirmations <= _owners.length);
        
        owners = _owners;
        required = _requiredConfirmations;
    }

    function transactionCount() public view returns(uint){
        return transactions.length;
    }

    function addTransaction(address _destination, uint _value, bytes memory _dataBytes) internal returns(uint){
        // Create txn, add it to array
        Transaction memory txn = Transaction(_destination,_value,false,_dataBytes);
        transactions.push(txn);
        return transactionCount() - 1; //ID will be length of array, without itself added
    }

    function confirmTransaction(uint _ID) public {
       bool isOwner = false;
        for (uint i = 0; i < owners.length; i++){
            if(msg.sender == owners[i]){
                isOwner = true;
            }
        }
        require(isOwner,"Only an owner can confirm a txn");
        confirmations[_ID][msg.sender] = true;

        // If txn is confirmed, execute it
        if(isConfirmed(_ID)){
            executeTransaction(_ID);
        }
    }

    function getConfirmationsCount(uint transactionId ) view public returns (uint){
        uint confirmationCount = 0;
        for (uint i = 0; i < owners.length; i++){
            if(confirmations[transactionId][owners[i]] == true){
                confirmationCount++;
            }
        }
        return confirmationCount;
    }

    function submitTransaction(address _destination, uint _value, bytes memory _bytes) external{
        addTransaction(_destination,_value, _bytes);
        confirmTransaction(transactions.length - 1);
    }

    function isConfirmed(uint _ID) public view returns (bool){
        return getConfirmationsCount(_ID) >= required;
    }

    function executeTransaction(uint _ID) public {
        require(isConfirmed(_ID),"Transaction must have enough confirmations");
        (bool success, ) = transactions[_ID].txnDestination.call{value:transactions[_ID].txnValue}(transactions[_ID].data);
        require(success,"Transaction failed sending funds");

        transactions[_ID].executed = true;
    }

    receive() external payable {

    }
    
}
