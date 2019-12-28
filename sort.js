'use strict';
const fs = require('fs');
const { stdout, stderr } = process;
const { performSort } = require('./src/sortLib');

const write = function ({ error, sortedContent }) {
  stdout.write(sortedContent);
  stderr.write(error);
};

const main = function (args) {
  const pathPosition = 2;
  performSort(args[pathPosition], fs.readFile, write);
};
main(process.argv);
