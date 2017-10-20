//var vehicle
var food = []
var poison = []
var vehicles = []
var averageHealth = Infinity
var averageRadius = Infinity

var debug

function setup(){

    debug = createCheckbox()

    createCanvas(640,360)
    for(var i = 0; i< 50; i++){
        var x = random(width)
        var y = random(height)
        vehicles[i] = new Vehicle(x, y)
    }
    

    for(var i = 0; i< 50; i++){
        var x = random(width)
        var y = random(height)
        food.push(createVector(x,y))
    }
    for(var i = 0; i< 10; i++){
        var x = random(width)
        var y = random(height)
        poison.push(createVector(x,y))
    }
}

function draw(){
    //console.log('draw')
    background(51)
    /*
    var target = createVector(mouseX, mouseY)

    fill(127)
    stroke(200)
    strokeWeight(2)
    ellipse(target.x, target.y, 48, 48)
    */
    var maxR = 0
    var maxH = 0
    var accumulatedHealth = 0
    var accumulatedRadius = 0
    

    if(random(1) <0.1){
        var x = random(width)
        var y = random(height)
        food.push(createVector(x,y))
    }
    if(random(1) <0.01){
        var x = random(width)
        var y = random(height)
        poison.push(createVector(x,y))
    }

    for(var i = 0; i< food.length; i++){
        fill(0,255,0)
        noStroke()
        ellipse(food[i].x, food[i].y, 4 ,4)      
        //console.log('draw food')  
    }

    for(var i = 0; i< poison.length; i++){
        fill(255,0,0)
        noStroke()
        ellipse(poison[i].x, poison[i].y, 4 ,4)
        //console.log('draw poison')         
    }

    for(var i = vehicles.length -1; i>= 0; i--){
        vehicles[i].boundaries()
        vehicles[i].behaviors(food, poison)
        vehicles[i].update()
        vehicles[i].display()        

        var newVehicle = vehicles[i].clone()
        if(newVehicle != null){
            vehicles.push(newVehicle)
        }
        if( vehicles[i].r > maxR){
            maxR = vehicles[i].r
            document.getElementById('maxR').innerHTML = `The max Radius is ${maxR}`
        }
        if( vehicles[i].health > maxH){
            maxH = vehicles[i].health
            document.getElementById('maxH').innerHTML = `The max Health is ${maxH}`
        }
        

        if(vehicles[i].dead()){
            var drop = floor(vehicles[i].r / 4)
            for(var j = 0; j< drop; j++){
                var x = vehicles[i].position.x + random(0,2)
                var y = vehicles[i].position.y + random(0,2)
                food.push(createVector(x,y))
            }
            
            vehicles.splice(i,1)
        }else{
            accumulatedHealth += vehicles[i].health / vehicles.length
            accumulatedRadius += vehicles[i].r / vehicles.length
        }

        
        
    }
    averageHealth = accumulatedHealth
    averageRadius = accumulatedRadius
    document.getElementById('avgR').innerHTML = `Average Radius is ${averageRadius}`
    document.getElementById('avgH').innerHTML = `Average Health is ${averageHealth}`
    document.getElementById('totalVehicles').innerHTML = `Total vehicles : ${vehicles.length}`
    //vehicle.seek(mouse)
    
}