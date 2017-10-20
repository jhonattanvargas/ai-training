var data
var graph
var dropdown
function preload(){
    data = loadJSON('data/kevinbacon.json')
}

function setup(){
    graph = new Graph()
    dropdown = createSelect()
    dropdown.changed(bfs)

    noCanvas()

    var movies = data.movies

    movies.map( (x,i) =>{
        //New Node with the title
        var movieNode = new Node(x.title)
        graph.addNode(movieNode)
        x.cast.map( (x,i) => {
            var actorNode = graph.getNode(x)
            if(actorNode == undefined){
                actorNode = new Node(x)
                dropdown.option(x)
            }                
            graph.addNode(actorNode)
            //Connect with the actors
            movieNode.addEdge(actorNode)
        })
    })    
}

function bfs(){
    graph.reset()
    var start = graph.setStart(dropdown.value())
    var end = graph.setEnd("Kevin Bacon")

    console.log(graph)

    var queue = []

    start.searched = true
    queue.push(start)

    while(queue.length > 0){
        var current = queue.shift()
        //console.log(current.value)
        if(current == end){
            console.log("Found "+ current.value)
            break
        }
        var edges = current.edges
        edges.map( (x)=>{
            var neighbor = x
            if(!neighbor.searched){
                neighbor.searched = true
                neighbor.parent = current
                queue.push(neighbor)
            }
        })
    }

    var path = []
    path.push(end)
    var next = end.parent
    while (next != null){
        path.push(next)
        next = next.parent
    }

    var txt = ''
    for(var i = path.length-1; i >= 0; i--){
        txt += path[i].value
        if(i != 0)
            txt += ' --> '
    }
    createP(txt)
}

