const assert = require("chai").assert;
const formatData = require("../src/libForSort").formatData;

describe("libForSort", function() {
  describe("formatData", function() {
    it("should create an empty string when empty array is given", function() {
      assert.strictEqual(formatData([]), "");
    });
    it("should create a string without new line when single element array is given", function() {
      assert.strictEqual(formatData(["formatData"]), "formatData");
    });
    it("should create a string with new line when array is given", function() {
      const actual = formatData(["loadData", "sortData", "formatData"]);
      const expected = "loadData\nsortData\nformatData";
      assert.strictEqual(actual, expected);
    });
  });
});
