const sort = require("./src/sortLib").sort;
const fs = require("fs");

const main = function(args) {
  const read = fs.readFileSync;
  const doesFileExist = fs.existsSync;
  const { std, writer } = sort(args, { read, doesFileExist });
  writer.write(std);
};
main(process.argv);
