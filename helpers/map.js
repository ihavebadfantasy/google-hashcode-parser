// return numberized array
// or array of objects with numberized 'valueToParse'
exports.parseIntData = (data, dataType = 'arr', valueToParse) => {
    return data.map((item) => {
      return dataType === 'arr' ? parseInt(item) : parseInt(item[valueToParse]);
    });
}
