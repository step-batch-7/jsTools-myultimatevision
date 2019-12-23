const performSort = function(unSorted) {
  return unSorted.sort();
};

const loadData = function(read, filePath, doesFileExist) {
  return doesFileExist(filePath) && read(filePath, "utf8");
};

const sort = function(cmdArgs, { read, doesFileExist }) {
  const filepath = cmdArgs[2];
  const content = loadData(read, filepath, doesFileExist);
  const error = new Error(`sort : ${filepath} no such file or directory`);
  if (!content) return { std: error.message, writer: process.stderr };
  const sorted = performSort(content.trim().split("\n"));
  return { std: sorted.join("\n"), writer: process.stdout };
};

module.exports = { performSort, loadData, sort };
