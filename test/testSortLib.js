const { assert } = require('chai');
const sinon = require('sinon');
const {
  sortLines,
  read,
  performSort
} = require('../src/sortLib');

describe('sortLines', function () {
  it('should return empty string when empty array is given', function () {
    assert.strictEqual(sortLines([]), '');
  });

  it('should return same string in  array when single element array is given',
    function () {
      assert.strictEqual(sortLines(['step']), 'step');
    });

  it('should return same string in  array when array is given',
    function () {
      const actual = sortLines(['step', 'thoughtworks', ' ']);
      assert.strictEqual(actual, ' \nstep\nthoughtworks');
    });
});

describe('read', function () {
  it('should call oncomplete with error when file is not present', function () {
    const onComplete = sinon.spy();
    const error = 'sort : No such file or directory';
    const expected = { sortedContent: '', error };
    read.call({ onComplete }, true, undefined);
    assert.isTrue(onComplete.calledWith(expected));
  });

  it('should call oncomplete with no error and empty string when file is empty',
    function () {
      const onComplete = sinon.spy();
      const expected = { sortedContent: '', error: '' };
      read.call({ onComplete }, null, '');
      assert.isTrue(onComplete.calledWith(expected));
    });

  it('should call oncomplete with no error string  when file is not empty',
    function () {
      const onComplete = sinon.spy();
      const sortedContent = 'thoughtworks\nto\nwelcome';
      const expected = { sortedContent, error: '' };
      read.call({ onComplete }, undefined, 'welcome\nto\nthoughtworks');
      assert.isTrue(onComplete.calledWith(expected));
    });
});

describe('performSort', function () {
  it('should sort data when given file has more than one line', function () {
    const readFile = sinon.fake.yields(null, 'welcome\nto\nthoughtworks');
    const onComplete = sinon.spy();
    const cmdArgs = 'sample.txt';
    const sortedContent = 'thoughtworks\nto\nwelcome';
    const expected = { error: '', sortedContent };
    performSort(cmdArgs, { readFile }, onComplete);
    assert.isTrue(onComplete.calledWith(expected));
  });

  it('should sort empty string when given file is empty', function () {
    const readFile = sinon.fake.yields(null, '');
    const onComplete = sinon.spy();
    const cmdArgs = 'sample.txt';
    const expected = { error: '', sortedContent: '' };
    performSort(cmdArgs, { readFile }, onComplete);
    assert.isTrue(onComplete.calledWith(expected));
  });

  it('should sort same string taken from file when file have single line',
    function () {
      const readFile = sinon.fake.yields(null, 'welcome to thoughtworks');
      const onComplete = sinon.spy();
      const cmdArgs = 'sample.txt';
      const sortedContent = 'welcome to thoughtworks';
      const expected = { error: '', sortedContent };
      performSort(cmdArgs, { readFile }, onComplete);
      assert.isTrue(onComplete.calledWith(expected));
    });

  it('should throw error when file given is not present', function () {
    const readFile = sinon.fake.yields(true, undefined);
    const onComplete = sinon.spy();
    const error = 'sort : No such file or directory';
    const expected = { sortedContent: '', error };
    const cmdArgs = 'sample.txt';
    performSort(cmdArgs, { readFile }, onComplete);
    assert.isTrue(onComplete.calledWith(expected));
  });

  it('should take standard input and sort data when file is not given',
    function () {
      const firstindex = 0, secondIndex = 1;
      const expectedCallCount = 2;
      const stdin = { setEncoding: sinon.fake(), on: sinon.spy() };
      const onComplete = sinon.spy();
      const sortedContent = 'lines\nsort';

      const calls = function () {
        performSort(undefined, { stdin }, onComplete);
        stdin.on.firstCall.args[secondIndex]('sort');
        stdin.on.firstCall.args[secondIndex]('lines');
        stdin.on.secondCall.args[secondIndex]();
      };

      const asserts = function () {
        assert.strictEqual(stdin.on.firstCall.args[firstindex], 'data');
        assert.strictEqual(stdin.on.secondCall.args[firstindex], 'end');
        assert.strictEqual(stdin.on.callCount, expectedCallCount);
        assert.isTrue(stdin.setEncoding.calledWith('utf8'));
        assert.isTrue(onComplete.calledWith({ error: '', sortedContent }));
      };
      calls();
      asserts();
    });
});
