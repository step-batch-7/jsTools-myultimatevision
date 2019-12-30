const { assert } = require('chai');
const sinon = require('sinon');
const { performSort } = require('../src/sortLib');

describe('performSort', function () {
  it('should sort data when given file has more than one line', function () {
    const readFile = sinon.fake.yields(undefined, 'welcome\nto\nthoughtworks');
    const onComplete = sinon.spy();
    const cmdArgs = 'path';
    const sortedContent = 'thoughtworks\nto\nwelcome';
    const expected = { error: '', sortedContent };
    performSort(cmdArgs, readFile, onComplete);
    assert.isTrue(onComplete.calledWith(expected));
  });

  it('should sort empty string when given file is empty', function () {
    const readFile = sinon.fake.yields(undefined, '');
    const onComplete = sinon.spy();
    const cmdArgs = 'path';
    const expected = { error: '', sortedContent: '' };
    performSort(cmdArgs, readFile, onComplete);
    assert.isTrue(onComplete.calledWith(expected));
  });

  it('should sort same string taken from file when file have single line',
    function () {
      const readFile = sinon.fake.yields(undefined, 'welcome to thoughtworks');
      const onComplete = sinon.spy();
      const cmdArgs = 'path';
      const sortedContent = 'welcome to thoughtworks';
      const expected = { error: '', sortedContent };
      performSort(cmdArgs, readFile, onComplete);
      assert.isTrue(onComplete.calledWith(expected));
    });

  it('should throw error when file given is not present', function () {
    const readFile = sinon.fake.yields(true, undefined);
    const onComplete = sinon.spy();
    const error = 'sort : No such file or directory';
    const expected = { sortedContent: '', error };
    const cmdArgs = 'path';
    performSort(cmdArgs, readFile, onComplete);
    assert.isTrue(onComplete.calledWith(expected));
  });

  it('should throw error when file is not given', function () {

    const readFile = sinon.fake.yields(true, undefined);
    const onComplete = sinon.spy();
    const error = 'sort : No such file or directory';
    const expected = { sortedContent: '', error };
    let cmdArgs;
    performSort(cmdArgs, readFile, onComplete);
    assert.isTrue(onComplete.calledWith(expected));
  });
});
