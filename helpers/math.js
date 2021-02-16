// 'fromValue' is 100% value,
// function returns xValue percent from 100%
exports.countPercent = (fromValue, xValue) => {
  return (xValue * 100) / fromValue;
}

// returns average from array of numbers
// or average from 'valueToCount' values in array of objects
exports.countAverage = (data, valueToCount, dataType = 'obj') => {
  if (data.length < 1) {
    return 0;
  }

  let sum = 0;

  if (dataType === 'arr') {
    sum = data.reduce( ( p, c ) => p + c, 0 );
  }

  if (dataType === 'obj') {
    let sum = 0;

    data.forEach((item) => {
      sum += item[valueToCount];
    });
  }

  return sum / data.length;
}

// returns number floored to 'floorTo'
// which is the concurrency of 'cnt' to 'percent'
exports.countSimpleUsefulnessIndex = (cnt, percent, floorTo = 3) => {
  return parseFloat((cnt / percent).toFixed(floorTo));
}

exports.isEven = (n) => {
  return n % 2 === 0;
}

exports.isOdd = (n) => {
  return !(n % 2 === 0);
}
