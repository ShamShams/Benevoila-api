const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  hashPassword: async password => {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    return hash;
  },

  generateToken: id => {
    if (process.env.APP_SECRET) {
      const payload = {
        userId: id,
      };
      const token = jwt.sign(payload, process.env.APP_SECRET, { expiresIn: '1d' });
      return token;
    } else {
      throw new Error('Cannot generate token, secret not found');
    }
  },
};
