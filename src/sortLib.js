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

const readStandardContent = function ({ stdin }, onComplete) {
  const lines = [];
  stdin.on('data', (data) => {
    const line = data.toString().trim();
    lines.push(line);
  });
  stdin.on('end', () => {
    const sortedContent = sortLines(lines);
    onComplete({ sortedContent, error: '' });
  });
};

const performSort = function (args, readers, onComplete) {
  const filePath = args || '';
  const readContent = read.bind({ onComplete });
  if (filePath) {
    readers.readFile(filePath, 'utf8', readContent);
    return;
  }
  readStandardContent(readers, onComplete);
};

module.exports = { sortLines, read, performSort };
