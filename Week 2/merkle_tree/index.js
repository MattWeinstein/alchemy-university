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
                let newArr = []
                for(let i =0;i<Math.floor(treeLayerArr.length/2);i++){
                    let twoHash = this.concatHelperFunction(treeLayerArr[i*2],treeLayerArr[i*2+1])
                    newArr.push(twoHash)
                }
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

    getProof(index){
        // Initialize variables
        let proofArray = []
        let testIndex = index
        let layerArray = this.leaves

        // Loop through each layer of the tree
        for(let i =0;i<Math.floor(this.leaves.length/2)-1;i++){
        let testArray = [] // Array to store values of each concatenated layer
        
        // If the array has an odd length, remove off the last hash and add it later
        let lastEle = ''
        if(layerArray.length%2===1){
            lastEle = layerArray.pop()
        }

        // If test index is even get the hashed element on the right
        // If test index is odd get the hashed element on the left
            // The first element is not hashed
        if(testIndex%2===0){
            if(this.leaves[testIndex+1] && i===0){
            proofArray.push({
                data: this.leaves[index+1],
                left: false
            })
            }else if(layerArray[testIndex+1]){
            proofArray.push({
                data: layerArray[testIndex+1],
                left: false
            })
            }
        } else if (testIndex%2===1){
            if(this.leaves[testIndex-1] && i===0){
            proofArray.push({
                data: this.leaves[index-1],
                left: true
            })
            } else if (layerArray[testIndex-1]){
            proofArray.push({
                data: layerArray[testIndex-1],
                left: true
            })}
        }

        // Loop through each element of that layer and concatenate/hash
        for(let j = 0;j<Math.floor(layerArray.length/2);j++ ){
            const element = this.concat(layerArray[2*j],layerArray[2*j+1])
            testArray.push(element)
        }
        
        // Add last element back if it was removed
        if(lastEle){
            testArray.push(lastEle)
        }
        layerArray=testArray;
        testIndex = Math.floor(testIndex/2)
        }
        return proofArray
    }
}

module.exports = MerkleTree;
