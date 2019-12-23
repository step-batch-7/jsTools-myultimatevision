const sort = require("./src/sortLib").sort;
const fs = require("fs");

const main = function(args) {
  const sorted = sort(args, fs.readFileSync, fs.existsSync);
  process.stdout.write(sorted);
};
main(process.argv);
