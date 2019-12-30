const sortLines = function (lines) {
  return lines.sort().join('\n');
};

const read = function (err, content) {
  if (err) {
    const error = 'sort : No such file or directory';
    this.onComplete({ error, sortedContent: '' });
    return;
  }
  const lines = content.split('\n');
  const sortedContent = sortLines(lines);
  this.onComplete({ error: '', sortedContent });
};

const performSort = function (args, readFile, onComplete) {
  const filePath = args || '';
  const readContent = read.bind({ onComplete });
  readFile(filePath, 'utf8', readContent);
};

module.exports = { performSort };
