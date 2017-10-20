var cols = 100
var rows = cols
var w, h
var grid = new Array(cols)
for(var i = 0; i< cols; i++){
    grid[i] = new Array(rows)
}

var openSet = []
var closedSet = []
var start
var end
var path = []

function setup(){
    createCanvas(400,400)
    console.log('A*')

    w = width / cols
    h = height / rows

    for(var i = 0; i< cols; i++){
        for(var j = 0; j< rows; j++){
            grid[i][j] = new Spot(i,j)
        }
    }

    for(var i = 0; i< cols; i++){
        for(var j = 0; j< rows; j++){
            grid[i][j].addNeighbors(grid)
        }
    }

    start = grid[0][0]
    end = grid[cols -1][rows -1]
    start.wall = false
    end.wall = false

    openSet.push(start)
}

function draw(){

    if(openSet.length > 0){
        //we can keep going
        var winner = 0
        for(var i = 0; i< openSet.length; i++){
            if(openSet[i].f < openSet[winner].f)
                winner = i
        }

        var current = openSet[winner]

        if(openSet[winner] == end){
            
            noLoop()
            console.log('DONE !')
        }

        removeFromArray(openSet,current)
        closedSet.push(current)

        var neighbors = current.neighbors
        for(var i = 0; i< neighbors.length; i++){
            var neighbor = neighbors[i]
            
            if(!closedSet.includes(neighbor) && !neighbor.wall){
                var tempG = current.g + 1
                
                var newPath = false
                if(openSet.includes(neighbor)){
                    if(tempG < neighbor.g){
                        neighbor.g = tempG
                        newPath = true
                    }
                }else{
                    neighbor.g = tempG
                    newPath = true
                    openSet.push(neighbor)
                }

                if(newPath){
                    neighbor.h = heuristic(neighbor,end)
                    neighbor.f = neighbor.g + neighbor.h
                    neighbor.previous = current
                }

                
            }           
            
        }
    }else{
        //no solution
        console.log('no solution')
        noLoop()
        return;
    }

    background(255)

    for(var i = 0; i< cols; i++){
        for(var j = 0; j< rows; j++){
            grid[i][j].show(color(255))
        }
    }
    
    //Find the path
    path = []
    var temp = current
    path.push(temp)
    while( temp.previous){
        path.push(temp.previous)
        temp = temp.previous
    }

    path.map(p => {
        //p.show(color(0, 0, 255))
    })
    noFill()
    stroke(255,0,200)
    strokeWeight(w/2)
    beginShape()
    path.map( (x)=>{
        vertex(x.x * w + w/2, x.y* h + h/2)
    })
    endShape()
}


function removeFromArray( arr, el){
    for(var i = arr.length -1; i >= 0 ; i--){
        if(arr[i] == el)
            arr.splice(i, 1)
    }
}

function heuristic(a,b){
    return d = dist(a.x, a.y, b.x, b.y)
    //return abs(a.x - b.x) + abs(b.y - a.y)
}

