const assert = require("chai").assert;
const { formatData, sortData } = require("../src/libForSort");

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

  describe("sortData", function() {
    it("should give empty array when empty array is given", function() {
      assert.deepStrictEqual(sortData([]), []);
    });

    it("should give same array when one element array is given", function() {
      assert.deepStrictEqual(sortData(["hello"]), ["hello"]);
    });

    it("should sort the array when array is given", function() {
      const actual = sortData(["hello", "android"]);
      const expected = ["android", "hello"];
      assert.deepStrictEqual(actual, expected);
    });

    it("should sort the array when array is given", function() {
      const actual = sortData(["hello", "android", 1, 2, 11]);
      const expected = [1, 11, 2, "android", "hello"];
      assert.deepStrictEqual(actual, expected);
    });
  });
});
