var mr = 0.01

function Vehicle(x,y, dna, r){
    this.acceleration = createVector(0,0)
    this.velocity = createVector(0,-2)
    this.position = createVector(x,y)
    this.r = 4
    
    this.maxForce = 0.5
    this.health = 1
    this.dna = []

    //if r is hereded base health is increased
    if(r != undefined){
        this.r = r
        this.health += this.r / 4
    }

    if(random(1)<mr){
        this.r += random(-0.2, 0.2)        
        console.log(this)
    }

    if(dna == undefined){
        //Food weight
        this.dna[0] = random(-2, 2)
        //Poison wieght
        this.dna[1] = random(-2, 2)
        //Food perception
        this.dna[2] = random(0, 100)
        //Poison Perseption
        this.dna[3] = random(0, 100)
    }else{
        //Mutation
        this.dna[0] = dna[0]
        if(random(1) < mr){
            this.dna[0] += random(-0.01, 0.1)
        }
        this.dna[1] = dna[1]
        if(random(1) < mr){
            this.dna[1] += random(-0.01, 0.1)
        }
        this.dna[2] = dna[2]
        if(random(1) < mr){
            this.dna[2] += random(-3, 10)
        }
        this.dna[3] = dna[3]
        if(random(1) < mr){
            this.dna[3] += random(-3, 10)
        }
        
        
    }

    this.maxSpeed = this.r * 0.75
}

//Method to update location
Vehicle.prototype.update = function(){
    //Update velocity
    this.velocity.add(this.acceleration)
    //Limited speed
    this.velocity.limit(this.maxSpeed)
    this.position.add(this.velocity)
    //Reset acceleration to 0 each cycle
    this.acceleration.mult(0)
    this.health += -0.005

}

Vehicle.prototype.applyForce = function(force){
    //We could add mass here if we want A = F / M
    this.acceleration.add(force)
}

//A method that calculates a steering force
//STEER = DESIRED MINUS VELOCITY
Vehicle.prototype.seek = function(target){
    var desired = p5.Vector.sub(target, this.position)

    //Scale to maximum speed
    desired.setMag(this.maxSpeed)

    //Steering = Desired minus Velocity
    var steer = p5.Vector.sub(desired, this.velocity)
    steer.limit(this.maxForce)

    return steer
    //this.applyForce(steer)
}

Vehicle.prototype.display = function(){
    //Draw a triangle rotated in the direction of velocity
    var angle = this.velocity.heading() + PI / 2

    push()
    translate(this.position.x, this.position.y)
    rotate(angle)

    
    if(debug.checked()){
        stroke(0,255,0)
        noFill()
        line(0,0,0,-this.dna[0] *25)
        strokeWeight(3)
        ellipse(0, 0,this.dna[2] * 2)
        stroke(255,0,0)
        line(0,0,0,-this.dna[1] *25)
        strokeWeight(2)
        ellipse(0, 0,this.dna[3] * 2)
    }    

    var gr = color(0, 255, 0)
    var rd = color(255, 0, 0)
    var col = lerpColor(rd,gr,this.health)
    if(this.health > averageHealth){
        col = color(0,0,255)
    }

    fill(col)
    stroke(col)
    strokeWeight(2)
    beginShape()
    vertex(0, -this.r * 2)
    vertex(-this.r, this.r * 2)
    vertex(this.r, this.r * 2)
    endShape(CLOSE)

    pop()

}

Vehicle.prototype.eat = function(list, nutrition, perception){
    var record = Infinity
    var closest = null
    for(var i = list.length -1; i>= 0 ; i--){
        //var d = dist(this.position.x, this.position.y, list[i].x, list[i].y)
        var d = this.position.dist(list[i])

        if(d < this.r){
            list.splice(i, 1)
            this.health += nutrition
            this.r += nutrition / this.r
        }else{
            if( d < record && d < perception){
                record = d
                closest = list[i]
            }  
        }

              
    }
    //this is the moment to eat
    if(closest != null){
        return this.seek(closest)
    }   
    return createVector(0, 0) 
}

Vehicle.prototype.behaviors = function(good, bad){
    var steerG = this.eat(good, 0.3, this.dna[2])
    var steerB = this.eat(bad, -0.75, this.dna[3])

    steerG.mult(this.dna[0])
    steerB.mult(this.dna[1])

    this.applyForce(steerG)
    this.applyForce(steerB)
}

Vehicle.prototype.dead = function(){
    return (this.health < 0)
}

Vehicle.prototype.boundaries = function() {
    var d = 25;

    var desired = null;

    if (this.position.x < d) {
      desired = createVector(this.maxSpeed, this.velocity.y);
    } else if (this.position.x > width - d) {
      desired = createVector(-this.maxSpeed, this.velocity.y);
    }

    if (this.position.y < d) {
      desired = createVector(this.velocity.x, this.maxSpeed);
    } else if (this.position.y > height - d) {
      desired = createVector(this.velocity.x, -this.maxSpeed);
    }

    if (desired !== null) {
      desired.normalize();
      desired.mult(this.maxSpeed);
      var steer = p5.Vector.sub(desired, this.velocity);
      steer.limit(this.maxForce);
      this.applyForce(steer);
    }
}

Vehicle.prototype.clone = function() {
    if (random(1) < 0.001) {
      return new Vehicle(this.position.x, this.position.y, this.dna, this.r);
    } else {
      return null;
    }
  }