import Model from './Model';
import { run } from '../connection';

class Users extends Model {
  constructor() {
    super('users');
  }

  getUserByEmail(email) {
    return run(`SELECT * FROM users WHERE email='${email}'`);
  }

  getAllAdmin() {
    return run(`SELECT * FROM users WHERE role='admin'`);
  }
}

export default Users;
