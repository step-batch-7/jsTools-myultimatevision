const performSort = function(unSorted) {
  return unSorted.sort();
};

const loadData = function(loader, filePath, isFileExists) {
  return isFileExists(filePath) && loader(filePath, "utf8");
};

const sort = function(cmdArgs, loader, doesFileExist) {
  const filepath = cmdArgs[2];
  const unSorted = loadData(loader, filepath, doesFileExist);
  const error = new Error(`sort : ${filepath} file not found`).message;
  if (!unSorted) return error;
  return performSort(unSorted.split("\n")).join("\n");
};

module.exports = { performSort, loadData, sort };
