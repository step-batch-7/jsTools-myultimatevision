'use strict';
const { createReadStream } = require('fs');
const { stdin, stdout, stderr, argv } = process;
const { parseOptions, ContentReader } = require('./src/sortLib');

const write = function ({ error, sortedContent }) {
  stdout.write(sortedContent);
  stderr.write(error);
};

const main = function (args) {
  const createStdin = () => stdin;
  const { stream } = parseOptions(args, { createStdin, createReadStream });
  const contentReader = new ContentReader(stream);
  contentReader.readContent(write);
};

main(argv);
