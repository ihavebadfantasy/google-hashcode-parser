const {parseIntData} = require('../helpers/map');

class ProblemSolver {
  constructor(dataSet) {
    this.dataSet = dataSet;

    this.numberizeDataSet();
  }

  numberizeDataSet() {
    this.dataSet = this.dataSet.map((arr) => {
      return parseIntData(arr);
    })
  }
}

module.exports = ProblemSolver;
