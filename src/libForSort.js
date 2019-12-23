const formatData = function(formattedData) {
  return formattedData.join("\n");
};

const sortData = function(unFormattedData) {
  return unFormattedData.sort();
};

const loadData = function(loader, isFileExists, filePath) {
  let loadedData = isFileExists(filePath) && loader(filePath, "utf8");
  return loadedData && loadedData.split("\n");
};

module.exports = { formatData, sortData, loadData };
