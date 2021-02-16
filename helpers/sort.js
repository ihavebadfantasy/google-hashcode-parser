const collect = require('collect.js');

// sort array of objects by 'sortValue' in 'order'
exports.sortByValue = (data, sortValue, order = 'asc') => {
  return order === 'asc' ? collect(data).sortBy(sortValue).all() : collect(data).sortBy(sortValue).all();
}
