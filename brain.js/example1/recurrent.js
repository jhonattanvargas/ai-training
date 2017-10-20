var brain = require('brain.js')

//create a simple recurrent neural network
var net = new brain.recurrent.RNN();

net.train([{input: [0, 0], output: [0]},
           {input: [0, 1], output: [1]},
           {input: [1, 0], output: [1]},
           {input: [1, 1], output: [0]}]);

console.log( net.run([0, 0]) )
console.log( net.run([0, 1]) )
console.log( net.run([1, 0]) )
console.log( net.run([1, 1]) )