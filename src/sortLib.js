const loadData = function(filePath, { readFileSync, existsSync }) {
  let content, error;
  const errorMessage = `sort : No such file or directory`;
  if (!existsSync(filePath)) return { error: errorMessage, content };
  content = readFileSync(filePath, "utf8");
  return { content, error };
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
