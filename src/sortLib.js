const loadData = function(filePath, { readFileSync, existsSync }) {
  const error = `sort : No such file or directory`;
  if (!existsSync(filePath)) return { error };
  content = readFileSync(filePath, "utf8");
  return { content };
};

const sort = function(cmdArgs, fileSystem) {
  const filepath = cmdArgs[2];
  const { error, content } = loadData(filepath, fileSystem);
  if (error != undefined) return { error, sortedLines: "" };
  const sorted = content.split("\n").sort();
  const sortedLines = sorted.join("\n");
  return { sortedLines, error: "" };
};

module.exports = { loadData, sort };
