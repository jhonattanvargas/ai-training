var brain = require('brain.js')

var net = new brain.NeuralNetwork()

let train = new Array()
//Piñas
train.push({
    input: {peso:1.5,color:-0.3},
    output: {piña:1}
})
train.push({
    input: {peso:0.9,color:0.05},
    output: {piña:1}
})
train.push({
    input: {peso:2.1,color:0.2},
    output: {piña:1}
})
//Manzanas
train.push({
    input: {peso:0.24,color:-0.87},
    output: {manzana:1}
})
train.push({
    input: {peso:0.45,color:-0.6},
    output: {manzana:1}
})
train.push({
    input: {peso:0.15,color:-0.43},
    output: {manzana:1}
})

net.train(train)

console.log( net.run({peso:0.2,color:-0.5}) )

