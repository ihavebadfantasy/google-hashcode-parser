const collect = require('collect.js');
const {
  performance
} = require('perf_hooks');
const ProblemSolver = require('./ProblemSolver');

const {sortByValue} = require('../helpers/sort');
const {countPercent, countAverage, countSimpleUsefulnessIndex, isEven, isOdd} = require('../helpers/math');
const {parseIntData} = require('../helpers/map');
const {findUniqueItems} = require('../helpers/find');

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
