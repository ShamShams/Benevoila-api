const { Model } = require('./Model');

class ActionTypes extends Model {
  constructor() {
    super('action_types');
  }
}

module.exports = ActionTypes;
