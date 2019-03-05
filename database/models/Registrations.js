import Model from './Model';
import { run } from '../connection';

class Registrations extends Model {
  constructor() {
    super('registrations');
  }

  getOneByUserAndActionId(userId, actionId) {
    return run(`SELECT * FROM registrations WHERE user_id=${userId} AND action_id=${actionId}`);
  }
}

export default Registrations;
