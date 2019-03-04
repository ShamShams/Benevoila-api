import { Client } from 'pg';

import { db } from '../config';

const client = new Client({
  host: db.host,
  port: db.port,
  database: db.database,
  user: db.user,
  password: db.password,
});

(async () => {
  await client.connect();
})();

export default {
  run: async sql => {
    let response = await client.query(sql);
    return response;
  },
};
