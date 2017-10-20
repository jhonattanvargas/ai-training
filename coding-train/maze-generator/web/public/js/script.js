var cols,rows
var w = 20
var grid = []
var current
var stack = []

function setup(){
    createCanvas(400,400)
    cols = floor(width/w)
    rows = floor(height/w)
    //frameRate(60)
    for(var j = 0; j< rows; j++){
        for(var i = 0; i< cols; i++){
            var cell = new Cell(i,j)
            grid.push(cell)
        }
    }

    current = grid[0]
}

function draw(){
    background(51)
    grid.map( g => {
        g.show()
    })

    current.visited = true
    current.highlight()
    //STEP 1
    var next = current.checkNeighbors()
    if(next){
        next.visited = true
        //STEP 2
        stack.push(current)
        //STEP 3
        removeWalls(current, next)
        //STEP 4
        current = next
    }else if(stack.length > 0){
        current = stack.pop()
    }
}

function removeWalls(a, b){
    var x = a.i - b.i
    var y = a.j - b.j
    if( x == 1){
        a.walls[3] = false
        b.walls[1] = false
    }else if( x == -1){
        a.walls[1] = false
        b.walls[3] = false
    }else if(y == 1){
        a.walls[0] = false
        b.walls[2] = false
    }else if( y == -1){
        a.walls[2] = false
        b.walls[0] = false
    }
}