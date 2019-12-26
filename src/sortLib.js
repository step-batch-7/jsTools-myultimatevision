const loadData = function(filePath, { readFileSync, existsSync }) {
  const errormessage = `sort : No such file or directory`;
  if (!existsSync(filePath)) return new Error(errormessage);
  return readFileSync(filePath, "utf8");
};

const sort = function(cmdArgs, fileSystem) {
  const filepath = cmdArgs[2];
  const content = loadData(filepath, fileSystem);
  if (content instanceof Error) return { error: content.message, sorted: "" };
  const sorted = content.split("\n").sort();
  return { sorted: sorted.join("\n"), error: "" };
};

module.exports = { loadData, sort };
