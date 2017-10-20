const synaptic = require('synaptic');

const Architect = synaptic.Architect;
const Layer = synaptic.Layer;

const lstmOptions = {
    peepholes: Layer.connectionType.ALL_TO_ALL,
    hiddenToHidden: false,
    outputToHidden: false,
    outputToGates: false,
    inputToOutput: true,
};
const lstm = new Architect.LSTM(1, 4, 4, 4, 1, lstmOptions);

const trainSet = [
    { input: [0], output: [0] },
    { input: [1], output: [1] },
    { input: [1], output: [0] },
    { input: [0], output: [1] },
    { input: [0], output: [0] },
];
const trainOptions = {
    rate: 0.2,
    iterations: 10000,
    error: 0.005,
    cost: null,
    crossValidate: null,
};

var trainer = new synaptic.Trainer(lstm)


const trainResults = trainer.train(trainSet,trainOptions) //lstm.trainer.train(trainSet, trainOptions);
console.log(trainResults);

const testResults = [];
testResults[0] = lstm.activate([0]);
testResults[1] = lstm.activate([1]);
testResults[2] = lstm.activate([1]);
testResults[3] = lstm.activate([0]);
testResults[4] = lstm.activate([0]);
console.log(testResults);