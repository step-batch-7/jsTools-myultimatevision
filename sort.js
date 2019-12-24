"use strict";

const { sort } = require("./src/sortLib");
const fs = require("fs");
const { stdout, stderr } = require("process");

const main = function(args) {
  const { error, sorted } = sort(args, fs);
  stdout.write(sorted);
  stderr.write(error);
};
main(process.argv);
