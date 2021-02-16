// creating array of unique Items from 'items'
// according to 'uniqueSet' with maxLength of 'maxItemsCnt'
exports.findUniqueItems = (uniqueSet, items, maxItemsCnt = items.length) => {
  let res = [];

  for (let i = 0; i < items.length; i++) {
    if (res.length === maxItemsCnt) {
      return res;
    }

    if (!uniqueSet.has(items[i])) {
      res.push(items[i]);
    }
  }
}
