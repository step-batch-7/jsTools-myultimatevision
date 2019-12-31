const sortContent = function (content) {
  const lines = content.split('\n');
  return lines.sort().join('\n');
};

const parseOptions = function (cmdLineArgs) {
  const [, , filePath] = cmdLineArgs;
  return { filePath };
};

const chooseInputStream = function (filePath, stdin, createReadStream) {
  return filePath ? createReadStream(filePath) : stdin;
};

const readContent = function (stream, onComplete) {
  const error = 'sort : No such file or directory';
  let content = '';
  stream.setEncoding('utf8');
  stream.on('error', () => onComplete({ error, sortedContent: '' }));
  stream.on('data', (data) => { content = content.concat(data); });
  stream.on('end', () => {
    onComplete({ sortedContent: sortContent(content), error: '' });
  });
};

const performSort = function (inputStream, onComplete) {
  readContent(inputStream, onComplete);
};

module.exports = {
  parseOptions, sortContent, chooseInputStream,
  performSort, readContent
};
