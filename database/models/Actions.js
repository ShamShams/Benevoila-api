import Model from './Model';
import { run } from '../connection';

class Actions extends Model {
  constructor() {
    super('actions');
  }

  getAllWithType() {
    return run(`SELECT * FROM actions NATURAL LEFT OUTER JOIN action_types`);
  }
}

export default Actions;
