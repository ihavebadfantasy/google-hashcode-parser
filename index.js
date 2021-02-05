const SolutionCreator = require('./app/SolutionCreator');

const inputFilename = process.argv[2];
const solverFilename = process.argv[3];

const solutionCreator = new SolutionCreator(inputFilename, solverFilename);

solutionCreator.generateSolutionOutputFile();
