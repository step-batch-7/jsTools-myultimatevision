'use strict';
const { createReadStream } = require('fs');
const { stdin, stdout, stderr } = process;
const { chooseInputStream, parseOptions, performSort } = require('./src/sortLib');

const write = function ({ error, sortedContent }) {
  stdout.write(sortedContent);
  stderr.write(error);
};



const main = function (args) {
  const { filePath } = parseOptions(args);
  const inputStream = chooseInputStream(filePath, stdin, createReadStream);
  performSort(inputStream, write);
};
main(process.argv);
