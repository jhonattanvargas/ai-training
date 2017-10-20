var tree
var Tree = require('./Tree.js')

function setup(){
    //noCanvas()
    tree = new Tree()
    for(var i=0; i<10; i++){
        tree.addValue(Math.floor(Math.random()*100 + 1))
    }
    
    console.log(JSON.stringify(tree))
    console.log('------------')
    tree.traverse()
    console.log( tree.search(67) )
}

setup()