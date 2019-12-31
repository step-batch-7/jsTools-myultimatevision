const { assert } = require('chai');
const sinon = require('sinon');
const {
  sortContent,
  parseOptions,
  chooseInputStream,
  readContent,
  performSort
} = require('../src/sortLib');

describe('sortContent', function () {
  it('should return empty string when empty string is given', function () {
    assert.strictEqual(sortContent(''), '');
  });

  it('should return same string in  array when string do not have new line',
    function () {
      assert.strictEqual(sortContent('step'), 'step');
    });

  it('should return same string in  array when array is given',
    function () {
      const actual = sortContent('step\nthoughtworks\n ');
      assert.strictEqual(actual, ' \nstep\nthoughtworks');
    });
});

describe('parseOptions', function () {
  it('should return undefined when file was not given', function () {
    const actual = parseOptions(['node', 'sort.js']);
    assert.deepStrictEqual(actual, { filePath: undefined });
  });

  it('should return file when file was not given', function () {
    const actual = parseOptions(['node', 'sort.js', 'file_to_sort.txt']);
    assert.deepStrictEqual(actual, { filePath: 'file_to_sort.txt' });
  });
});

describe('chooseInputStream', function () {
  it('should return stream when filepath is not defined', function () {
    const stream = sinon.fake();
    const createReadStream = sinon.fake();
    const actual = chooseInputStream(undefined, stream, createReadStream);
    assert.strictEqual(actual, stream);
  });

  it('should return createReadStream when filepath is defined', function () {
    const stream = sinon.fake();
    const createReadStream = sinon.fake();
    const actual = chooseInputStream('file_to_sort.txt', stream, createReadStream);
    assert.strictEqual(actual, createReadStream('file_to_sort.txt'));
  });
});






describe('readContent', function () {
  it('should call oncomplete with error when file is not present', function () {
    const onComplete = sinon.spy();
    const error = 'sort : No such file or directory';
    const expectedParameters = { sortedContent: '', error };
    const stream = { on: sinon.fake(), setEncoding: sinon.fake() };
    readContent(stream, onComplete);//testing function
    stream.on.firstCall.args[1]();
    assert.strictEqual(stream.on.firstCall.args[0], 'error');
    assert.isTrue(stream.setEncoding.calledWith('utf8'));
    assert.isTrue(onComplete.calledWith(expectedParameters));
  });

  it('should call oncomplete with no error and empty string when file is empty',
    function () {
      const onComplete = sinon.spy();
      const stream = { on: sinon.fake(), setEncoding: sinon.fake() };
      const expectedParameters = { sortedContent: '', error: '' };
      readContent(stream, onComplete);//testing function
      stream.on.secondCall.args[1]('');
      stream.on.thirdCall.args[1]();
      assert.isTrue(stream.setEncoding.calledWith('utf8'));
      assert.isTrue(onComplete.calledWith(expectedParameters));
    });

  it('should call oncomplete with sorted data  when file is not empty',
    function () {
      const onComplete = sinon.spy();
      const stream = { on: sinon.fake(), setEncoding: sinon.fake() };
      const sortedContent = 'thoughtworks\nto\nwelcome';
      const expectedParameters = { sortedContent, error: '' };
      readContent(stream, onComplete);//testing function
      stream.on.secondCall.args[1]('welcome\nto\nthoughtworks');
      stream.on.thirdCall.args[1]();
      assert.isTrue(stream.setEncoding.calledWith('utf8'));
      assert.isTrue(onComplete.calledWith(expectedParameters));
    });
});





describe('performSort', function () {
  it('should sort data when given file has more than one line', function () {
    const stream = { on: sinon.fake(), setEncoding: sinon.fake() };
    const onComplete = sinon.spy();
    const sortedContent = 'thoughtworks\nto\nwelcome';
    const expectedParameters = { error: '', sortedContent };
    performSort(stream, onComplete);//testing function
    stream.on.secondCall.args[1]('thoughtworks\nto\nwelcome');
    stream.on.thirdCall.args[1]();
    assert.strictEqual(stream.on.secondCall.args[0], 'data');
    assert.strictEqual(stream.on.thirdCall.args[0], 'end');
    assert.isTrue(stream.setEncoding.calledWith('utf8'));
    assert.isTrue(onComplete.calledWith(expectedParameters));
  });

  it('should sort empty string when given file is empty', function () {
    const onComplete = sinon.spy();
    const stream = { on: sinon.fake(), setEncoding: sinon.fake() };
    const expectedParameters = { error: '', sortedContent: '' };
    performSort(stream, onComplete);//testing function
    stream.on.secondCall.args[1]('');
    stream.on.thirdCall.args[1]();
    assert.strictEqual(stream.on.secondCall.args[0], 'data');
    assert.strictEqual(stream.on.thirdCall.args[0], 'end');
    assert.isTrue(stream.setEncoding.calledWith('utf8'));
    assert.isTrue(onComplete.calledWith(expectedParameters));
  });

  it('should sort same string taken from file when file have single line',
    function () {
      const stream = { setEncoding: sinon.fake(), on: sinon.fake() };
      const onComplete = sinon.spy();
      const sortedContent = 'welcome to thoughtworks';
      performSort(stream, onComplete);//testing function
      stream.on.secondCall.args[1]('welcome to thoughtworks');
      stream.on.thirdCall.args[1]();
      assert.strictEqual(stream.on.secondCall.args[0], 'data');
      assert.strictEqual(stream.on.thirdCall.args[0], 'end');
      assert.isTrue(stream.setEncoding.calledWith('utf8'));
      assert.isTrue(onComplete.calledWith({ error: '', sortedContent }));
    });

  it('should throw error when file given is not present', function () {
    const onComplete = sinon.spy();
    const stream = { setEncoding: sinon.fake(), on: sinon.fake() };
    const error = 'sort : No such file or directory';
    performSort(stream, onComplete); //testing function
    stream.on.firstCall.args[1]();
    assert.strictEqual(stream.on.firstCall.args[0], 'error');
    assert.isTrue(stream.setEncoding.calledWith('utf8'));
    assert.isTrue(onComplete.calledWith({ sortedContent: '', error }));
  });

  /* eslint max-statements:[0]*/
  it('should read from standard input and sort data when file is not given',
    function () {
      const stream = { setEncoding: sinon.fake(), on: sinon.fake() };
      const onComplete = sinon.spy();
      const sortedContent = 'lines\nsort';
      performSort(stream, onComplete);//testing function
      stream.on.secondCall.args[1]('sort\n');
      stream.on.secondCall.args[1]('lines');
      stream.on.thirdCall.args[1]();
      assert.strictEqual(stream.on.secondCall.args[0], 'data');
      assert.strictEqual(stream.on.thirdCall.args[0], 'end');
      assert.isTrue(stream.on.calledThrice);
      assert.isTrue(stream.on.thirdCall.calledAfter(stream.on.secondCall));
      assert.isTrue(stream.setEncoding.calledWith('utf8'));
      assert.isTrue(onComplete.calledWith({ error: '', sortedContent }));
    });
});

