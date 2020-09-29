// Returns the amount of times the 'value' param appears in the 'array' param.
const getOccurence = (array, value) => {
  return array.filter((v) => v === value).length;
};

module.exports = getOccurence;
