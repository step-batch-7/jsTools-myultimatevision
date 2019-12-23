const assert = require("chai").assert;
const { performSort, loadData, sort } = require("../src/sortLib");

describe("sortLib", function() {
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
      const reader = function(filePath, encoding) {
        assert.isTrue(filePath == "path");
        assert.isTrue(encoding == "utf8");
        return "hello";
      };

      const doesFileExist = function(filePath) {
        assert.isTrue(filePath == "path");
        return true;
      };

      const actual = loadData(reader, "path", doesFileExist);
      assert.strictEqual(actual, "hello");
    });

    it("should return error if file path is not present ", function() {
      const reader = function(filePath, encoding) {
        assert.isTrue(filePath == "path");
        assert.isTrue(encoding == "utf8");
        return "";
      };

      const doesFileExist = function(filePath) {
        assert.isTrue(filePath == "path");
        return false;
      };

      const actual = loadData(reader, "path", doesFileExist);
      assert.isFalse(actual);
    });
  });

  describe("sort", function() {
    it("should return sorted data when single file is given", function() {
      const reader = function(filePath, encoding) {
        assert.isTrue(filePath == "path");
        assert.isTrue(encoding == "utf8");
        return "welcome\nto\nthoughtworks";
      };

      const doesFileExist = function(filePath) {
        assert.isTrue(filePath == "path");
        return true;
      };

      const cmdArgs = ["node", "sort.js", "path"];
      const actual = sort(cmdArgs, reader, doesFileExist);
      const expected = "thoughtworks\nto\nwelcome";
      assert.strictEqual(actual, expected);
    });

    it("should throw error when file is given is not present", function() {
      const reader = function(filePath, encoding) {
        assert.isTrue(filePath == "path");
        assert.isTrue(encoding == "utf8");
        return "";
      };

      const doesFileExist = function(filePath) {
        assert.isTrue(filePath == "path");
        return false;
      };

      const cmdArgs = ["node", "sort.js", "path"];
      const actual = sort(cmdArgs, reader, doesFileExist);
      assert.strictEqual(actual, "sort : path no such file or directory");
    });
  });
});
