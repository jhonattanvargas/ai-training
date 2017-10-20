function Spot(i,j){
    this.x = i
    this.y = j
    this.f = 0
    this.g = 0
    this.h = 0
    this.neighbors = []
    this.previous = undefined
    this.wall = false

    if(random(1) <0.3)
        this.wall = true
}

Spot.prototype.show = function(col){
    fill(col)
    if(this.wall)
        fill(0)
    noStroke()
    ellipse(this.x * w + w/2, this.y * h+h/2, w/2, h/2)
    //rect(this.x * w, this.y * h, w, h)
}

Spot.prototype.addNeighbors = function(grid){
    var i = this.x
    var j = this.y
    if( i < cols -1)
        this.neighbors.push(grid[i +1][j])
    if( i > 0)
        this.neighbors.push(grid[i -1][j])
    if( j < rows -1)
        this.neighbors.push(grid[i][j +1])
    if( j > 0)
        this.neighbors.push(grid[i][j -1])
    if( i > 0 && j > 0)
        this.neighbors.push(grid[i -1][j -1])
    if( i < cols -1 && j > 0)
        this.neighbors.push(grid[i +1][j -1])
    if( i > 0 && j < rows -1)
        this.neighbors.push(grid[i -1][j +1])
    if( i < cols -1 && j < rows -1)
        this.neighbors.push(grid[i +1][j +1])
    
}