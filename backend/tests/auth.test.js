const test = require('node:test');
const assert = require('node:assert/strict');
const bcrypt = require('bcryptjs');
const { normalizeEmail, validatePassword } = require('../middleware/validate');
const ApiError = require('../utils/apiError');

test('normalizeEmail lowercases and trims', () => {
  assert.equal(normalizeEmail('  Test@Example.COM '), 'test@example.com');
});

test('validatePassword rejects short passwords', () => {
  assert.throws(() => validatePassword('short'), (err) => err instanceof ApiError);
});

test('bcrypt hashes password', async () => {
  const hash = await bcrypt.hash('password123', 10);
  assert.notEqual(hash, 'password123');
  assert.equal(await bcrypt.compare('password123', hash), true);
});
