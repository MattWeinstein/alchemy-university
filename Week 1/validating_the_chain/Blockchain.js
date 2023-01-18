const Block = require('./Block');

class Blockchain {
    constructor() {
        this.chain = [new Block()];
    }

    addBlock(block) {
        //Calling the toHash method, it takes the block found with [this.chain.length-1]
        block.previousHash = this.chain[this.chain.length - 1].toHash(); 
        this.chain.push(block);
        console.log(this.chain)

    }
    isValid(){
        for (let i = 0 ; i < this.chain.length;i++){
            if(i!=0){
                const previousHash = this.chain[i-1].toHash().toString()
                const expected = this.chain[i].previousHash.toString()
                return previousHash === expected
            }
        }
    }
}

module.exports = Blockchain;
