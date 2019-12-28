const assert = require('chai').assert;
const { performSort } = require('../src/sortLib');

describe('performSort', function () {
  it('should sort data when given file has more than one line', function () {
    const readFile = function (filePath, encoding, callBack) {
      assert.isTrue(filePath === 'path');
      assert.isTrue(encoding === 'utf8');
      callBack(undefined, 'welcome\nto\nthoughtworks');
    };

    const write = function (actual) {
      const expected = {
        sortedContent: 'thoughtworks\nto\nwelcome',
        error: ''
      };
      assert.deepStrictEqual(actual, expected);
    };

    const cmdArgs = 'path';
    assert.strictEqual(performSort(cmdArgs, readFile, write));
  });

  it('should sort empty string when given file is empty', function () {
    const readFile = function (filePath, encoding, sort) {
      assert.isTrue(filePath === 'path');
      assert.isTrue(encoding === 'utf8');
      sort(undefined, '');
    };
    const write = function (actual) {
      const expected = { sortedContent: '', error: '' };
      assert.deepStrictEqual(actual, expected);
    };

    const cmdArgs = 'path';
    assert.strictEqual(performSort(cmdArgs, readFile, write));
  });

  it('should sort same string taken from file when file have single line',
    function () {
      const readFile = function (filePath, encoding, callBack) {
        assert.isTrue(filePath === 'path');
        assert.isTrue(encoding === 'utf8');
        callBack(undefined, 'welcome to thoughtworks');
      };
      const write = function (actual) {
        const sortedContent = 'welcome to thoughtworks';
        const expected = { sortedContent, error: '' };
        assert.deepStrictEqual(actual, expected);
      };

      const cmdArgs = 'path';
      assert.strictEqual(performSort(cmdArgs, readFile, write));
    });

  it('should throw error when file is given is not present', function () {
    const readFile = function (filePath, encoding, sort) {
      assert.isTrue(filePath === 'path');
      assert.isTrue(encoding === 'utf8');
      sort(new Error('sort : No such file or directory'), undefined);
    };
    const write = function (actual) {
      const error = 'sort : No such file or directory';
      const expected = { sortedContent: '', error };
      assert.deepStrictEqual(actual, expected);
    };

    const cmdArgs = 'path';
    assert.strictEqual(performSort(cmdArgs, readFile, write));
  });

  it('should throw error when file is not given', function () {
    const readFile = function (filePath, encoding, sort) {
      assert.isTrue(filePath === '');
      assert.isTrue(encoding === 'utf8');
      sort(new Error('sort : No such file or directory'), undefined);
    };
    const write = function (actual) {
      const error = 'sort : No such file or directory';
      const expected = { sortedContent: '', error };
      assert.deepStrictEqual(actual, expected);
    };
    let cmdArgs;
    assert.strictEqual(performSort(cmdArgs, readFile, write));
  });
});
