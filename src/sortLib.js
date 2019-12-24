const performSort = function(content) {
  return content.sort();
};

const loadData = function(read, filePath, doesFileExist) {
  return doesFileExist(filePath) && read(filePath, "utf8");
};

const sort = function(cmdArgs, { read, doesFileExist }) {
  const filepath = cmdArgs[2];
  const content = loadData(read, filepath, doesFileExist);
  const errormessage = `sort : ${filepath} no such file or directory`;
  if (!content) return { std: errormessage, writer: "error" };
  const sorted = performSort(content.split("\n"));
  return { std: sorted.join("\n"), writer: "output" };
};

module.exports = { performSort, loadData, sort };
