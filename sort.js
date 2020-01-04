'use strict';
const {createReadStream} = require('fs');
const {stdin, stdout, stderr, argv} = process;
const {parseOptions, performSort} = require('./src/sortLib');

const write = function ({error, sortedContent}) {
  stdout.write(sortedContent);
  stderr.write(error);
};

const main = function (args) {
  const createStdin = () => stdin;
  const {stream} = parseOptions(args, {createStdin, createReadStream});
  performSort(stream, write);
};

main(argv);
