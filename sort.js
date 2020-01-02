'use strict';
const { createReadStream } = require('fs');
const { stdin, stdout, stderr } = process;
const {
  chooseInputStream,
  parseOptions,
  performSort
} = require('./src/sortLib');

const write = function ({ error, sortedContent }) {
  stdout.write(sortedContent);
  stderr.write(error);
};

const main = function (args) {
  const { filePath } = parseOptions(args);
  const createStdin = () => stdin;
  const stream = chooseInputStream(filePath, createStdin, createReadStream);
  performSort(stream, write);
};
main(process.argv);
