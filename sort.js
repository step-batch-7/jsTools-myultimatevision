'use strict';
const { readFile } = require('fs');
const { stdin, stdout, stderr } = process;
const { performSort } = require('./src/sortLib');

const onComplete = function ({ error, sortedContent }) {
  stdout.write(sortedContent);
  stderr.write(error);
};

const main = function (args) {
  const [, , filePath] = args;
  performSort(filePath, { stdin, readFile }, onComplete);
};
main(process.argv);
