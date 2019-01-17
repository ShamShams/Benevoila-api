const { Model } = require('./Model');
const { run } = require('../connection');

class Actions extends Model {
  constructor() {
    super('actions');
  }

  getAllWithType() {
    return run(`SELECT * FROM actions NATURAL LEFT OUTER JOIN action_types`);
  }
}

module.exports = Actions;
