const sort = require("./src/sortLib").sort;
const fs = require("fs");
const { stdout, stderr } = require("process");

const main = function(args) {
  const read = fs.readFileSync;
  const doesFileExist = fs.existsSync;
  const { std, writer } = sort(args, { read, doesFileExist });
  const writers = { error: stderr, output: stdout };
  writers[writer].write(std);
};
main(process.argv);
