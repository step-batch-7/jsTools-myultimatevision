const performSort = function(unSorted) {
  return unSorted.sort();
};

const loadData = function(reader, filePath, doesFileExist) {
  return doesFileExist(filePath) && reader(filePath, "utf8");
};

const sort = function(cmdArgs, reader, doesFileExist) {
  const filepath = cmdArgs[2];
  const unSorted = loadData(reader, filepath, doesFileExist);
  const error = new Error(`sort : ${filepath} file not found`).message;
  if (!unSorted) return error;
  const sorted = performSort(unSorted.trim().split("\n"));
  return sorted.join("\n");
};

module.exports = { performSort, loadData, sort };
