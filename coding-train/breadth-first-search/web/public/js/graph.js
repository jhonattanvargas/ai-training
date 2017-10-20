function Graph(){
    this.nodes = []
    this.graph = {}
    this.end = null
    this.start = null
}

Graph.prototype.addNode = function(n){
    //Node into array
    this.nodes.push(n)
    var title = n.value
    //Node into "hash"
    this.graph[title] = n
}

Graph.prototype.getNode = function(actor){
    return this.graph[actor]
}

Graph.prototype.setStart = function(actor){
    this.start = this.graph[actor]
    return this.start
}

Graph.prototype.setEnd = function(actor){
    this.end = this.graph[actor]
    return this.end
}

Graph.prototype.reset = function(){
    this.nodes.map(x => {
        x.searched = false
        x.parent = null
    })
}
