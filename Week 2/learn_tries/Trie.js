const TrieNode = require('./TrieNode');

class Trie {
    constructor() {
        this.root = new TrieNode(null)
    }

    insert(word){
        const letterArr = word.split('')
        const trieNodeArr = []
        let currentNode

        for(let i = 0;i<=letterArr.length;i++){
            let letter = letterArr[i]
            // Set Node to root at beginning of each word
            if (i === 0){
                currentNode = this.root
            } 
            // The last iteration will not have a letter
            if(letter){
                let key = Object.keys(currentNode.children)
                if(key.length===0){ // If the node has no children, add a node.
                    let nextNode = new TrieNode(letter)
                    currentNode.children[letter] = nextNode
                    currentNode = nextNode
                } else if (key.length>0){ // If the node has children
                    if(currentNode.children[key].key === letter){ // If its child matches the next letter on the word being tested move on to the next letter
                        currentNode = currentNode.children[key]
                    } else{ // If it does not match, create a new node, and append itself to the child
                        let nextNode = new TrieNode(letter)
                        currentNode.children[letter] = nextNode
                        currentNode = nextNode
                    }
                }
            }else{
                currentNode.isWord = true
            }
        }    
    }

    contains(word){
        const letterArr = word.split('')
        
        let testArr = []
        let currentNode = this.root
        for(let i = 0;i<letterArr.length;i++){
            const letter = letterArr[i]
            let keys = Object.keys(currentNode.children)

            // If the objects children contains the letter being tested
                // Add it to the testArr 
                // Replace the current node with the children node
            if(keys.includes(letter)){
                testArr.push(letter)
                currentNode = currentNode.children[letter]
            } else{
                return false
            }
            
            // Once the word has traveresed the tree, make sure it is the ending of the word
            if(testArr.join('') === word && currentNode.isWord){
                return true
            }
        }
    }

}

module.exports = Trie;
