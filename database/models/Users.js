const { Model } = require('./Model');

class Users extends Model {

    constructor () {
        super('users');
    }

}

module.exports = Users;
