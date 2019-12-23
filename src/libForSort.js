const joinLines = function(sortedData) {
  return sortedData.join("\n");
};

const sortData = function(unSortedData) {
  return unSortedData.sort();
};

const loadData = function(loader, isFileExists, filePath) {
  let loadedData = isFileExists(filePath) && loader(filePath, "utf8");
  return loadedData && loadedData.split("\n");
};

module.exports = { joinLines, sortData, loadData };
