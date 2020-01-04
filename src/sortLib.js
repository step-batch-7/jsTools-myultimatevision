const ERRORS = {
  ENOENT: 'sort: No such file or directory',
  EISDIR: 'sort: Is a directory',
  EACCES: 'sort: permission denied'
};

const sortContent = function (content) {
  const lines = content.split('\n');
  return lines.sort().join('\n');
};

const parseOptions = function (cmdLineArgs, streamCreators) {
  const [, , filePath] = cmdLineArgs;
  const stream = createStream(filePath, streamCreators);
  return {stream};
};

const createStream = function (filePath, {createStdin, createReadStream}) {
  return filePath ? createReadStream(filePath) : createStdin();
};

const performSort = function (stream, onComplete) {
  let content = '';
  stream.setEncoding('utf8');
  stream.on('error', (err) => {
    onComplete({error: ERRORS[err.code], sortedContent: ''});
  });
  stream.on('data', (data) => {
    content = content.concat(data);
  });
  stream.on('end', () => {
    onComplete({sortedContent: sortContent(content), error: ''});
  });
};

module.exports = {parseOptions, createStream, performSort};
