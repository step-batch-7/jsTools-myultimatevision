'use strict';
const { createReadStream } = require('fs');
const { stdin, stdout, stderr, argv } = process;
const { createStream, parseOptions, performSort } = require('./src/sortLib');

const write = function ({ error, sortedContent }) {
  stdout.write(sortedContent);
  stderr.write(error);
};

const main = function (args) {
  const createStdin = () => stdin;
  const { filePath } = parseOptions(args);
  const stream = createStream(filePath, createStdin, createReadStream);
  performSort(stream, write);
};
main(argv);
