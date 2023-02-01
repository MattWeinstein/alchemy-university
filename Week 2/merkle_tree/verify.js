function verifyProof(proof, node, root, concat) {
    let currentHash = node
    for (let i = 0;i<proof.length;i++){
        const isLeft = proof[i].left
        const data = proof[i].data
        if(isLeft){
            currentHash = concat(data,currentHash)
        } else if (!isLeft){
            currentHash = concat(currentHash,data)
        }
    }

    console.log(currentHash)
    console.log(root)

    return currentHash === root;
}

module.exports = verifyProof;
