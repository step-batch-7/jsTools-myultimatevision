const { sort, getWriter } = require("./src/sortLib");
const fs = require("fs");
const { stdout, stderr } = require("process");

const main = function(args) {
  const read = fs.readFileSync;
  const doesFileExist = fs.existsSync;
  const writers = { error: stderr, output: stdout };
  const { std, resultType } = sort(args, { read, doesFileExist });
  writer = getWriter(writers, resultType);
  writer.write(std);
};
main(process.argv);
