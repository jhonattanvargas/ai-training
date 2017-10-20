var tree = new Tree()

function setup(){
    createCanvas(400,400)
    background(51)
    for(var i=0; i<10; i++){
        tree.addValue(Math.floor(Math.random()*100 + 1))
    }
    tree.traverse()
    console.log( tree.search(67) )
}