class MerkleTree {
    constructor(leaves, concat) {
        this.leaves = leaves
        this.concat = concat
    }
    getRoot() {
        if(this.leaves.length===1){
            return this.leaves[0]
        } else{
            let treeLayerArr = this.leaves

            while(treeLayerArr.length!=1){
                console.log(treeLayerArr)
                let newArr = []
                // Loop through array except last index if odd
                for(let i =0;i<Math.floor(treeLayerArr.length/2);i++){
                    let twoHash = this.concatHelperFunction(treeLayerArr[i*2],treeLayerArr[i*2+1])
                    newArr.push(twoHash)
                }
                // Append last index element onto array
                if(treeLayerArr.length%2===1){
                newArr.push(treeLayerArr[treeLayerArr.length-1])
                }

                treeLayerArr=newArr
                
            }
            return treeLayerArr
        }
    }

    concatHelperFunction(a,b){
        if(a && b){
            return this.concat(a,b)
        } else{
            return this.concat(a)
        }
    }
}

module.exports = MerkleTree;
