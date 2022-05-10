/* eslint-env node */

const { types, scopes, allowCustomScopes } = require('./.commitizenrc.json');

const validTypes = types.map((type) => type.value);
const validScopes = scopes.map((scope) => scope.name);
const scopeValidationLevel = allowCustomScopes ? 1 : 2;

module.exports = {
  extends: ['@commitlint/config-conventional'],

  rules: {
    'scope-enum': [scopeValidationLevel, 'always', validScopes],
    'type-enum': [2, 'always', validTypes],
  },
};
