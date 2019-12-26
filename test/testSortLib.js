const assert = require("chai").assert;
const { performSort, loadData, sort, getWriter } = require("../src/sortLib");

describe("sortLib", function() {
  describe("loadData", function() {
    it("should load data if file path is present ", function() {
      const readFileSync = function(filePath, encoding) {
        assert.isTrue(filePath == "path");
        assert.isTrue(encoding == "utf8");
        return "hello";
      };

      const existsSync = function(filePath) {
        assert.isTrue(filePath == "path");
        return true;
      };

      const actual = loadData("path", { readFileSync, existsSync });
      assert.strictEqual(actual, "hello");
    });

    it("should return error if file path is not present ", function() {
      const readFileSync = function(filePath, encoding) {
        assert.isTrue(filePath == "path");
        assert.isTrue(encoding == "utf8");
        return "";
      };

      const existsSync = function(filePath) {
        assert.isTrue(filePath == "path");
        return false;
      };

      const actual = loadData("path", { readFileSync, existsSync });
      assert.isTrue(actual instanceof Error);
    });

    it("should return false if file path is not present ", function() {
      const readFileSync = function(filePath, encoding) {
        assert.isTrue(filePath == "path");
        assert.isTrue(encoding == "utf8");
        return "";
      };

      const existsSync = function(filePath) {
        assert.isTrue(filePath == undefined);
        return false;
      };
      let filePath;
      const actual = loadData(filePath, { readFileSync, existsSync });
      assert.isTrue(actual instanceof Error);
    });
  });

  describe("sort", function() {
    it("should return sorted data when given file has more than one line", function() {
      const readFileSync = function(filePath, encoding) {
        assert.isTrue(filePath == "path");
        assert.isTrue(encoding == "utf8");
        return "welcome\nto\nthoughtworks";
      };

      const existsSync = function(filePath) {
        assert.isTrue(filePath == "path");
        return true;
      };

      const cmdArgs = ["node", "sort.js", "path"];
      const actual = sort(cmdArgs, { readFileSync, existsSync });
      const expected = {
        sorted: "thoughtworks\nto\nwelcome",
        error: ""
      };
      assert.deepStrictEqual(actual, expected);
    });

    it("should return empty string when given file is empty", function() {
      const readFileSync = function(filePath, encoding) {
        assert.isTrue(filePath == "path");
        assert.isTrue(encoding == "utf8");
        return "";
      };

      const existsSync = function(filePath) {
        assert.isTrue(filePath == "path");
        return true;
      };

      const cmdArgs = ["node", "sort.js", "path"];
      const actual = sort(cmdArgs, { readFileSync, existsSync });
      const expected = {
        sorted: "",
        error: ""
      };
      assert.deepStrictEqual(actual, expected);
    });

    it("should return same string taken from file when file have single line", function() {
      const readFileSync = function(filePath, encoding) {
        assert.isTrue(filePath == "path");
        assert.isTrue(encoding == "utf8");
        return "welcome to thoughtworks";
      };

      const existsSync = function(filePath) {
        assert.isTrue(filePath == "path");
        return true;
      };

      const cmdArgs = ["node", "sort.js", "path"];
      const actual = sort(cmdArgs, { readFileSync, existsSync });
      const expected = { sorted: "welcome to thoughtworks", error: "" };
      assert.deepStrictEqual(actual, expected);
    });

    it("should throw error when file is given is not present", function() {
      const readFileSync = function(filePath, encoding) {
        assert.isTrue(filePath == "path");
        assert.isTrue(encoding == "utf8");
        return "";
      };

      const existsSync = function(filePath) {
        assert.isTrue(filePath == "path");
        return false;
      };

      const cmdArgs = ["node", "sort.js", "path"];
      const actual = sort(cmdArgs, { readFileSync, existsSync });
      assert.strictEqual(actual.error, "sort : No such file or directory");
      assert.strictEqual(actual.sorted, "");
    });

    it("should throw error when file is not given", function() {
      const readFileSync = function(filePath, encoding) {
        assert.isTrue(filePath == "path");
        assert.isTrue(encoding == "utf8");
        return "";
      };

      const existsSync = function(filePath) {
        assert.isTrue(filePath == undefined);
        return false;
      };

      const cmdArgs = ["node", "sort.js"];
      const actual = sort(cmdArgs, { readFileSync, existsSync });
      assert.strictEqual(actual.error, "sort : No such file or directory");
      assert.strictEqual(actual.sorted, "");
    });
  });
});
