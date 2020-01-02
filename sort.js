'use strict';
const { createReadStream } = require('fs');
const { stdin, stdout, stderr } = process;
const { createStream, parseOptions, performSort } = require('./src/sortLib');

const write = function ({ error, sortedContent }) {
  stdout.write(sortedContent);
  stderr.write(error);
};

const main = function (args) {
  const { filePath } = parseOptions(args);
  const createStdin = () => stdin;
  const stream = createStream(filePath, createStdin, createReadStream);
  performSort(stream, write);
};
main(process.argv);
