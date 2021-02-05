const collect = require('collect.js');
const {
  performance
} = require('perf_hooks');
const ProblemSolver = require('./ProblemSolver');

class ExampleSolver extends ProblemSolver{
  constructor(dataSet) {
    super(dataSet);
  }

  // it is mandatory method, should return solution data
  solutionResult() {
    return this.dataSet;
  }

  // to count preliminary score, it is optional and you can omit it's implementing
  countPreliminaryScore() {
  }
}

module.exports = ExampleSolver;
