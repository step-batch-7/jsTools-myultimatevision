const sortLines = function (lines) {
  return lines.sort().join('\n');
};

const read = function (err, content) {
  let error = '', sortedContent = '';
  if (err) {
    error = 'sort : No such file or directory';
  } else {
    sortedContent = sortLines(content.split('\n'));
  }
  this.onComplete({ error, sortedContent });
};

const readStandardContent = function ({ stdin }, onComplete) {
  const lines = [];
  stdin.setEncoding('utf8');
  stdin.on('data', (data) => lines.push(data.trimRight()));
  stdin.on('end', () => {
    onComplete({ sortedContent: sortLines(lines), error: '' });
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

module.exports = { sortLines, read, performSort, readStandardContent };
