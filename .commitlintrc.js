/* eslint-env node */

const { types, scopes, allowCustomScopes } = require('./.commitizenrc.json');

const validTypes = types.map((type) => type.value);
const scopeValidationLevel = allowCustomScopes ? 1 : 2;

module.exports = {
  extends: ['@commitlint/config-conventional'],

  rules: {
    'scope-enum': [scopeValidationLevel, 'always', scopes],
    'type-enum': [2, 'always', validTypes],
  },
};
