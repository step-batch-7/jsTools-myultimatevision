const { assert } = require('chai');
const sinon = require('sinon');
const { parseOptions, createStream, performSort } = require('../src/sortLib');

describe('parseOptions', function () {
  it('should return undefined when file was not given', () => {
    const actual = parseOptions(['node', 'sort.js']);
    assert.deepStrictEqual(actual, { filePath: undefined });
  });

  it('should return file when file was not given', () => {
    const actual = parseOptions(['node', 'sort.js', 'file_to_sort.txt']);
    assert.deepStrictEqual(actual, { filePath: 'file_to_sort.txt' });
  });
});

describe('createStream', function () {
  it('should return stream when filepath is not defined', () => {
    const stream = { on: sinon.fake(), setEncoding: sinon.fake() };
    const createStdin = sinon.fake.returns(stream);
    const createReadStream = sinon.fake();
    const actual = createStream(undefined, createStdin, createReadStream);
    assert.strictEqual(actual, stream);
  });

  it('should return createReadStream when filepath is defined', () => {
    const stream = { on: sinon.fake(), setEncoding: sinon.fake() };
    const createStdin = sinon.fake();
    const createReadStream = sinon.fake.returns(stream);
    const actual = createStream('file.txt', createStdin, createReadStream);
    assert.strictEqual(actual, stream);
  });
});

describe('performSort', function () {
  let onComplete, stream;
  beforeEach(() => {
    onComplete = sinon.spy();
    stream = { on: sinon.fake(), setEncoding: sinon.fake() };
  });
  it('should sort empty string when given file is empty', () => {
    const expectedParameters = { error: '', sortedContent: '' };

    performSort(stream, onComplete);// testing function

    stream.on.secondCall.args[1]('');
    stream.on.thirdCall.args[1]();
    assert.strictEqual(stream.on.secondCall.args[0], 'data');
    assert.strictEqual(stream.on.thirdCall.args[0], 'end');
    assert.isTrue(stream.setEncoding.calledWith('utf8'));
    assert.isTrue(onComplete.calledWith(expectedParameters));
  });

  it('should sort same string taken from file when file have a line', () => {
    const sortedContent = 'welcome to thoughtworks';

    performSort(stream, onComplete);// testing function

    stream.on.secondCall.args[1]('welcome to thoughtworks');
    stream.on.thirdCall.args[1]();
    assert.strictEqual(stream.on.secondCall.args[0], 'data');
    assert.strictEqual(stream.on.thirdCall.args[0], 'end');
    assert.isTrue(stream.setEncoding.calledWith('utf8'));
    assert.isTrue(onComplete.calledWith({ error: '', sortedContent }));
  });

  it('should sort data when given file has more than one line', () => {
    const sortedContent = 'thoughtworks\nto\nwelcome';
    const expectedParameters = { error: '', sortedContent };

    performSort(stream, onComplete);// testing function

    stream.on.secondCall.args[1]('thoughtworks\nto\nwelcome');
    stream.on.thirdCall.args[1]();
    assert.strictEqual(stream.on.secondCall.args[0], 'data');
    assert.strictEqual(stream.on.thirdCall.args[0], 'end');
    assert.isTrue(stream.setEncoding.calledWith('utf8'));
    assert.isTrue(onComplete.calledWith(expectedParameters));
  });

  it('should throw file not present error when file is not present', () => {
    const error = 'sort: No such file or directory';

    performSort(stream, onComplete);// testing function

    stream.on.firstCall.args[1]({ code: 'ENOENT' });
    assert.strictEqual(stream.on.firstCall.args[0], 'error');
    assert.isTrue(stream.setEncoding.calledWith('utf8'));
    assert.isTrue(onComplete.calledWith({ sortedContent: '', error }));
  });

  it('should throw  is a directory error when file is not present', () => {
    const error = 'sort: Is a directory';

    performSort(stream, onComplete);// testing function

    stream.on.firstCall.args[1]({ code: 'EISDIR' });
    assert.strictEqual(stream.on.firstCall.args[0], 'error');
    assert.isTrue(stream.setEncoding.calledWith('utf8'));
    assert.isTrue(onComplete.calledWith({ sortedContent: '', error }));
  });

  it('should throw permission denied error when file is not present', () => {
    const error = 'sort: permission denied';

    performSort(stream, onComplete);// testing function

    stream.on.firstCall.args[1]({ code: 'EACCES' });
    assert.strictEqual(stream.on.firstCall.args[0], 'error');
    assert.isTrue(stream.setEncoding.calledWith('utf8'));
    assert.isTrue(onComplete.calledWith({ sortedContent: '', error }));
  });

  it('should read standard input and sort data when file is not given', () => {
    const sortedContent = 'lines\nsort';

    performSort(stream, onComplete);// testing function

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

