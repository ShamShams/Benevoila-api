const { Model } = require('./Model');
const { run } = require('../connection');

class Users extends Model {
    constructor () {
        super('users');
    }

    getUserByEmail(email) {
        return run(`
            SELECT
                *
            FROM
                users
            WHERE
                email='${email}'
        `);
    }
}

module.exports = Users;
