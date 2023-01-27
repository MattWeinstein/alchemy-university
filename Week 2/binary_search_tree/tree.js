class Tree {
    constructor() {
        this.root = null
    }
    addNode(node){
        if(!this.root){
            this.root = node
        } else{
            newNodeLocationHelper(this.root)
        }

        function newNodeLocationHelper (rootNode){
            if (node.data > rootNode.data){
                if(rootNode.right){
                    newNodeLocationHelper(rootNode.right)
                } else{
                    rootNode.right = node
                }
        };

            if (node.data < rootNode.data){
                if(rootNode.left){
                    newNodeLocationHelper(rootNode.left)
                } else{
                    rootNode.left = node
                }
            }
        }
    }

    hasNode(node){
        let result 
        if(!this.root){
            result = false
        } else if(this.root){
            traverseTree(this.root)
        };

        function traverseTree (rootNode) {
            if(rootNode.data === node){
                result = true
            }        

            if(node > rootNode.data){
                if(!rootNode.right){
                    result = false
                } else if(node === rootNode.right.data){
                    result = true
                } else{
                    traverseTree(rootNode.right)
                }
            }

            if(node < rootNode.data){
                if(!rootNode.left){
                    result = false
                }else if(node === rootNode.left.data){
                    result = true
                } else{
                    traverseTree(rootNode.left)
                }
            }
        }
    return result
    }

}

module.exports = Tree;
