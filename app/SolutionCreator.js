const path = require('path');
const fs = require('fs');

class SolutionCreator {
  constructor(inputFilename, solverFilename) {
    if (!inputFilename) {
      console.warn('Please provide input file name');

      return;
    }

    if (!solverFilename) {
      console.warn('Please provide solver file name');

      return;
    }

    this.inputFilename = inputFilename;
    this.solverFilename = solverFilename;
  }

  inputFileExtensions = ['in', '', 'txt'];
  solverFileExtension = 'js';
  outputFileExtension = 'out';

  inputDirname = 'input';
  outputDirname = 'output';

  generateSolutionOutputFile() {
    const solverDataSet = this.parseInputFile();

    const solution = this.generateSolution(solverDataSet);

    if (!solution) {
      console.warn('Solver must have solutionResult method!');

      return;
    }

    this.createSolutionOutputFile(solution);
  }

  parseInputFile() {
    let fileContent;

    for (let extension of this.inputFileExtensions) {
      const filepath = this.getFilePath(this.inputFilename, extension, this.inputDirname);

      try {
        fileContent = fs.readFileSync(filepath, {
          encoding: 'utf-8',
        });
        break;
      } catch(e) {
        continue;
      }
    }

    const fileLines = fileContent.split('\n')

    const dataSet = [];

    fileLines.forEach((line) => {
      if (line.trim().length > 0) {
        dataSet.push(line.split(' '));
      }
    })

    return dataSet;
  }

  generateSolution(solverDataSet) {
    // TODO: remove hardcode
    const solverPath = `../solvers/${this.solverFilename}.${this.solverFileExtension}`

    const SolverClass = require(solverPath);
    const solver = new SolverClass(solverDataSet);

    if (!solver.solutionResult) {
      return null;
    }

    const solution =  solver.solutionResult();

    // TODO separate score counting, solver creating and solution generating

    if (solver.countPreliminaryScore) {
      const preliminaryScore = solver.countPreliminaryScore();

      if (preliminaryScore) {
        console.warn(`Your preliminary score with solver ${this.solverFilename} is: ${preliminaryScore}`);
      }
    }

    return solution;
  }

  createSolutionOutputFile(solution) {
    let outputFilePath = this.getFilePath(this.inputFilename, this.outputFileExtension, this.outputDirname);

    solution = solution.map((line) => {
      return line.join(' ');
    });

    const outputFileContent = solution.join('\n');

    fs.writeFileSync(outputFilePath, outputFileContent);
  }

  getFilePath(fileName, extension, fileDirname) {
    const rootDir = path.dirname(require.main.filename);
    return extension ? path.join(rootDir, `${fileDirname}`, `${fileName}.${extension}`) :path.join(rootDir, `${fileDirname}`, `${fileName}`)
  }
}

module.exports = SolutionCreator;
