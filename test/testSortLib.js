const { assert } = require('chai');
const sinon = require('sinon');
const { sortLines, read, performSort } = require('../src/sortLib');

describe('performSort', function () {
  it('should sort data when given file has more than one line', function () {
    const readFile = sinon.fake.yields(null, 'welcome\nto\nthoughtworks');
    const onComplete = sinon.spy();
    const cmdArgs = 'path';
    const sortedContent = 'thoughtworks\nto\nwelcome';
    const expected = { error: '', sortedContent };
    performSort(cmdArgs, { readFile }, onComplete);
    assert.isTrue(onComplete.calledWith(expected));
  });

  it('should sort empty string when given file is empty', function () {
    const readFile = sinon.fake.yields(null, '');
    const onComplete = sinon.spy();
    const cmdArgs = 'path';
    const expected = { error: '', sortedContent: '' };
    performSort(cmdArgs, { readFile }, onComplete);
    assert.isTrue(onComplete.calledWith(expected));
  });

  it('should sort same string taken from file when file have single line',
    function () {
      const readFile = sinon.fake.yields(null, 'welcome to thoughtworks');
      const onComplete = sinon.spy();
      const cmdArgs = 'path';
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
    const cmdArgs = 'path';
    performSort(cmdArgs, { readFile }, onComplete);
    assert.isTrue(onComplete.calledWith(expected));
  });

  // it('should throw error when file is not given', function () {

  //   const readFile = sinon.fake.yields(true, undefined);
  //   const onComplete = sinon.spy();
  //   const error = 'sort : No such file or directory';
  //   const expected = { sortedContent: '', error };
  //   let cmdArgs;
  //   performSort(cmdArgs, { readFile }, onComplete);
  //   assert.isTrue(onComplete.calledWith(expected));
  // });
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

