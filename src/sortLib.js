const sortLines = function (content) {
  const lines = content.split('\n');
  return lines.sort().join('\n');
};

const read = function (err, content) {
  let sortedContent = '';
  let error = '';
  if (err) { error = 'sort : No such file or directory'; }
  else { sortedContent = sortLines(content); }
  this.onComplete({ error, sortedContent });
};

const performSort = function (args, readFile, onComplete) {
  const filePath = args || '';
  const readContent = read.bind({ onComplete });
  readFile(filePath, 'utf8', readContent);
};

module.exports = { performSort };
