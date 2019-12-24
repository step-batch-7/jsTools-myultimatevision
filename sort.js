"use strict";

const { sort } = require("./src/sortLib");
const fs = require("fs");
const { stdout, stderr } = require("process");

const main = function(args) {
  const read = fs.readFileSync;
  const doesFileExist = fs.existsSync;
  const { sorted, error } = sort(args, { read, doesFileExist });
  stdout.write(sorted);
  stderr.write(error);
};
main(process.argv);
