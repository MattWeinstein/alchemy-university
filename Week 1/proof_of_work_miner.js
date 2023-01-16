const SHA256 = require('crypto-js/sha256');
const TARGET_DIFFICULTY = BigInt(0x0fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff);
const MAX_TRANSACTIONS = 10;

const mempool = []; // Place where each new transaction will be stored
const blocks = []; // This is where past blocks will get stored

function addTransaction(transaction) {
    mempool.push(transaction) // Take each transaction that must get validated and put it into mempool
}

function mine() {
    let transactions = []
    const numTransactions = mempool.length 
/* 
Put every transaction into a transactions array.
This array will be part of the block header, hence confirming the transactions.
MAX_TRANSACTIONS value is just how many transactions will be set in the block. 
*/
    for (let i = 0; i < numTransactions; i++){ 
        if(i<=MAX_TRANSACTIONS-1){
        const lastValue = mempool.pop()
        transactions.push(lastValue)        
        }
    }

    // Block header //
    const block = {
        id:blocks.length,
        transactions: transactions, // Each block contains a set # of previous blocks
        nonce: 0,
    }

    /*
    Add 1 to the nonce until the hash value is less than the target.
    -- Better way to loop through k?
    */
    for (let k = 0;k<1000;k++) {
        const jsonString = JSON.stringify(block) // 
        const shaHash = SHA256(jsonString)
        const hashBigInt = BigInt(`0x${shaHash}`)
        if(hashBigInt < TARGET_DIFFICULTY ){
            block.hash = shaHash
            blocks.push(block) 
            return blocks
        } else{
            block.nonce += 1
        } 
    }
    

}

module.exports = {
    TARGET_DIFFICULTY,
    MAX_TRANSACTIONS,
    addTransaction, 
    mine, 
    blocks,
    mempool
};
