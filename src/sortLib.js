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
  if (!content) return { std: errormessage, resultType: "error" };
  const sorted = performSort(content.split("\n"));
  return { std: sorted.join("\n"), resultType: "output" };
};

const getWriter = function(writers, resultType) {
  return writers[resultType];
};
module.exports = { performSort, loadData, sort, getWriter };
