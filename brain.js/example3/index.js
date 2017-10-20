var jhon = {
    nombre : 'Jhonattan Alfredo',
    apellidoP : 'Vargas',
    apellidoM : 'Salazar',
    direccion : 'Villa las carmenes psj tirso de molina #050'
}

var cary = {
    nombre : 'Carolyn Alejandra',
    apellidoP : 'Vargas',
    apellidoM : 'Salazar',
    direccion : 'Villa las carmenes pasaje tirso de molina N° 050'
}

var cata = {
    nombre : 'Catalina Alejandra',
    apellidoP : 'Vargas',
    apellidoM : 'Peña',
    direccion : 'Villa las carmenes pasaje tirso de molina #050'
}

var ivonne = {
    nombre : 'Ivonne Patricia',
    apellidoP : 'Salazar',
    apellidoM : 'Peña',
    direccion : 'Villa las carmenes pasaje tirso de molina 50'
}

var peque = {
    nombre : 'Richard',
    apellidoP : 'Poblete',
    apellidoM : 'Mondaca',
    direccion : '1 Ote 16 Sur # 050'
}

//Levenshtein distance
// ------------------

function editDistance(s1, s2) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();
  
    var costs = new Array();
    for (var i = 0; i <= s1.length; i++) {
      var lastValue = i;
      for (var j = 0; j <= s2.length; j++) {
        if (i == 0)
          costs[j] = j;
        else {
          if (j > 0) {
            var newValue = costs[j - 1];
            if (s1.charAt(i - 1) != s2.charAt(j - 1))
              newValue = Math.min(Math.min(newValue, lastValue),
                costs[j]) + 1;
            costs[j - 1] = lastValue;
            lastValue = newValue;
          }
        }
      }
      if (i > 0)
        costs[s2.length] = lastValue;
    }
    return costs[s2.length];
}

function similarity(s1, s2) {
  var longer = s1;
  var shorter = s2;
  if (s1.length < s2.length) {
    longer = s2;
    shorter = s1;
  }
  var longerLength = longer.length;
  if (longerLength == 0) {
    return 1.0;
  }
  return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
}



var brain = require('brain.js')

var net = new brain.NeuralNetwork()

let train = new Array()

addTrain(jhon,cary,true)
addTrain(jhon,ivonne,false)
addTrain(jhon,peque,false)
addTrain(cary,cata,true)

//console.log(train)

net.train (train)


function addTrain(elem1,elem2,result){
    if(result){
        train.push({
            input: {
                apellidoP: similarity(elem1.direccion,elem2.direccion),
                apellidoM: similarity(elem1.apellidoP,elem2.apellidoP),
                direccion: similarity(elem1.apellidoM,elem2.apellidoM)
            },
            output: {
                si:1
            }
        })
    }else{
        train.push({
            input: {
                apellidoP: similarity(elem1.direccion,elem2.direccion),
                apellidoM: similarity(elem1.apellidoP,elem2.apellidoP),
                direccion: similarity(elem1.apellidoM,elem2.apellidoM)
            },
            output: {
                no:1
            }
        })
    }    
}

function eval (elem1, elem2){
    console.log(`Evaluando hermandad de ${elem1.nombre} ${elem1.apellidoP} ${elem1.apellidoM} con ${elem2.nombre} ${elem2.apellidoP} ${elem2.apellidoM}`)
    console.log('--------------------')
    console.log('Similitud')
    console.log( similarity(elem1.direccion,elem2.direccion) )
    console.log( similarity(elem1.apellidoP,elem2.apellidoP) )
    console.log( similarity(elem1.apellidoM,elem2.apellidoM) )
    console.log('--------------------')
    console.log('Evaluacion')
    console.log('--------------------')
    console.log(
        net.run(
            {
                apellidoP: similarity(elem1.direccion,elem2.direccion),
                apellidoM: similarity(elem1.apellidoP,elem2.apellidoP),
                direccion: similarity(elem1.apellidoM,elem2.apellidoM)
            }
        )
    )
    console.log('')
}

eval(jhon,cary)
eval(jhon,cata)
eval(jhon,ivonne)
eval(jhon,peque)