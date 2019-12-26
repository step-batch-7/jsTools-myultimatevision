"use strict";

const { sort } = require("./src/sortLib");
const fs = require("fs");
const { stdout, stderr } = require("process");

const main = function(args) {
  const { error, sortedLines } = sort(args, fs);
  stdout.write(sortedLines);
  stderr.write(error);
};
main(process.argv);
