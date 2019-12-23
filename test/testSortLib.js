const assert = require("chai").assert;
const { joinLines, performSort, loadData, sort } = require("../src/sortLib");

describe("libForSort", function() {
  describe("joinLines", function() {
    it("should create an empty string when empty array is given", function() {
      assert.strictEqual(joinLines([]), "");
    });
    it("should create a string without new line when single element array is given", function() {
      assert.strictEqual(joinLines(["formatData"]), "formatData");
    });
    it("should create a string with new line when array is given", function() {
      const actual = joinLines(["loadData", "performSort", "formatData"]);
      const expected = "loadData\nperformSort\nformatData";
      assert.strictEqual(actual, expected);
    });
  });

  describe("performSort", function() {
    it("should give empty array when empty array is given", function() {
      assert.deepStrictEqual(performSort([]), []);
    });

    it("should give same array when one element array is given", function() {
      assert.deepStrictEqual(performSort(["hello"]), ["hello"]);
    });

    it("should sort the array when array is given", function() {
      const actual = performSort(["hello", "android"]);
      const expected = ["android", "hello"];
      assert.deepStrictEqual(actual, expected);
    });

    it("should sort the array when array is given", function() {
      const actual = performSort([10, 3, 1, 2, 11]);
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

      const actual = loadData(loader, "path", isFileExists);
      assert.strictEqual(actual, "hello");
    });

    it("should return error if file path is not present ", function() {
      const loader = function(filePath, encoding) {
        assert.isTrue(filePath == "path");
        assert.isTrue(encoding == "utf8");
        return "";
      };

      const isFileExists = function(filePath) {
        assert.isTrue(filePath == "path");
        return false;
      };

      const actual = loadData(loader, "path", isFileExists);
      assert.isFalse(actual);
    });
  });

  describe("sort", function() {
    it("should return sorted data when single file is given", function() {
      const loader = function(filePath, encoding) {
        assert.isTrue(filePath == "path");
        assert.isTrue(encoding == "utf8");
        return "welcome\nto\nthoughtworks";
      };

      const isFileExists = function(filePath) {
        assert.isTrue(filePath == "path");
        return true;
      };

      const cmdArgs = ["node", "sort.js", "path"];
      const actual = sort(cmdArgs, loader, isFileExists);
      const expected = "thoughtworks\nto\nwelcome";
      assert.strictEqual(actual, expected);
    });

    it("should throw error when file is given is not present", function() {
      const loader = function(filePath, encoding) {
        assert.isTrue(filePath == "path");
        assert.isTrue(encoding == "utf8");
        return "";
      };

      const isFileExists = function(filePath) {
        assert.isTrue(filePath == "path");
        return false;
      };

      const cmdArgs = ["node", "sort.js", "path"];
      const actual = sort(cmdArgs, loader, isFileExists);
      assert.strictEqual(actual, "sort : path file not found");
    });
  });
});
