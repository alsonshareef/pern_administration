const getOccurence = (array, value) => {
  return array.filter((v) => v === value).length;
};

module.exports = getOccurence;
