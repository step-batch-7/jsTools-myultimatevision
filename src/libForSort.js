const formatData = function(formattedData) {
  return formattedData.join("\n");
};

const sortData = function(unFormattedData) {
  return unFormattedData.sort();
};

module.exports = { formatData, sortData };
