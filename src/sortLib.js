const performSort = function(content) {
  return content.sort();
};

const loadData = function(read, filePath, doesFileExist) {
  return doesFileExist(filePath) && read(filePath, "utf8");
};

const sort = function(cmdArgs, { read, doesFileExist }) {
  const filepath = cmdArgs[2];
  const content = loadData(read, filepath, doesFileExist);
  const errormessage = `sort : No such file or directory`;
  if (content === false) return { error: errormessage, sorted: "" };
  const sorted = performSort(content.split("\n"));
  return { sorted: sorted.join("\n"), error: "" };
};

module.exports = { performSort, loadData, sort };
