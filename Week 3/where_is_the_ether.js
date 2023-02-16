const { providers } = require('ethers');
const { ganacheProvider } = require('./config');

const provider = new providers.Web3Provider(ganacheProvider);

async function findEther(address) {
    const addressArr = []
    // We want to search for the past 3 blocks
    for(let i = 0;i<3;i++){
        let block
        if(i===0){
            block = await provider.getBlockWithTransactions('latest')
        }else{
            block = await provider.getBlockWithTransactions(0-i)
        }
        // On each block, add the address of each txn to the addressArr
        block.transactions.forEach((txn)=>{
             addressArr.push(txn.to)
         })        
    }
    return addressArr

}

module.exports = findEther;
