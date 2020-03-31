const test = require('tape');
const validate = require('../src/index.js')

test('--- Gmail Alias Test', function (t) {
  const result = validate.syntax({
    email: 'user+name@gmail.com',
    options:{
      gmailAlias: true
    }
  });
  const expected = false;
  t.ok(result)
  t.deepEqual(result.validation, expected)
  t.end()
});

test('--- Valid Syntax Check', function (t) {
  const result = validate.syntax({email: 'username@gmail.com'});
  const expected = true;
  t.ok(result)
  t.deepEqual(result.validation, expected)
  t.end()
});

test('--- Blacklist Check', function (t) {
  const result = validate.syntax({
    email: 'username@vubby.com',
    options:{
      blacklist: true
    }
  });
  const expected = false;
  t.ok(result)
  t.deepEqual(result.validation, expected)
  t.end()
});

test('--- RFC Length Check', function (t) {
  const result = validate.syntax({
    email: 'usernameabcdefusernameabcdefusernameabcdefusernameabcdefusernameabcdefusernameabcdefusernameabcdefusernameabcdef@gmail.com',
    options:{
      blacklist: true,
      gmailAlias: true
    }
  });
  const expected = false;
  t.ok(result)
  t.deepEqual(result.validation, expected)
  t.end()
});