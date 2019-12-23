const assert = require("chai").assert;
const { formatData, sortData, loadData } = require("../src/libForSort");

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
      const actual = sortData([10, 3, 1, 2, 11]);
      const expected = [1, 10, 11, 2, 3];
      assert.deepStrictEqual(actual, expected);
    });
  });

  describe("loadData", function() {
    it("should load data if file path is present ", function() {
      const loader = function(filePath, encoding) {
        assert.isTrue(filePath == "path");
        assert.isTrue(encoding == "utf8");
        return "hello";
      };

      const isFileExists = function(filePath) {
        assert.isTrue(filePath == "path");
        return true;
      };
      const actual = loadData(loader, isFileExists, "path");
      assert.deepStrictEqual(actual, ["hello"]);
    });

    it("should return false if file path is not present ", function() {
      const loader = function(filePath, encoding) {
        assert.isTrue(filePath == "path");
        assert.isTrue(encoding == "utf8");
        return "hello";
      };

      const isFileExists = function(filePath) {
        assert.isTrue(filePath == "path");
        return false;
      };
      const actual = loadData(loader, isFileExists, "path");
      assert.strictEqual(actual, false);
    });
  });
});
