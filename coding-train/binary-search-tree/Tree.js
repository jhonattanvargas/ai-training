var Node = require('./Node.js')

function Tree(){
    this.root = null
}
Tree.prototype.addValue = function(val){
    n = new Node(val)
    if(this.root == null)
        this.root = n
    else
        this.root.addNode(n)
}

Tree.prototype.traverse = function(){
    this.root.visit()
}

Tree.prototype.search = function(val){
    return this.root.search(val)
}

module.exports = Tree