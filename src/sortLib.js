const loadData = function(filePath, { readFileSync, existsSync }) {
  return existsSync(filePath) && readFileSync(filePath, "utf8");
};

const sort = function(cmdArgs, fileSystem) {
  const filepath = cmdArgs[2];
  const content = loadData(filepath, fileSystem);
  const errormessage = `sort : No such file or directory`;
  if (content === false) return { error: errormessage, sorted: "" };
  const sorted = content.split("\n").sort();
  return { sorted: sorted.join("\n"), error: "" };
};

module.exports = { loadData, sort };
