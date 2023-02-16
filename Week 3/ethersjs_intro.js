const { utils, providers, Wallet } = require('ethers');
const { ganacheProvider } = require('./config');

const provider = new providers.Web3Provider(ganacheProvider);

async function donate(privateKey, charities) {
    const wallet = new Wallet(privateKey,provider)
    // Loop through the charity array and give each 1 ether
    for(let i = 0;i<charities.length;i++) {
        const txn = {
        to:charities[i],
        value: utils.parseEther('1','ether')
    }
    await wallet.sendTransaction(txn)
    }
}

module.exports = donate;
