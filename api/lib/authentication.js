import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import users from '../controllers/users';

export const authenticate = async (req, res) => {
  const { token } = req.body;
  if (!token) {
    res.send({ success: false, msg: 'Pas de token', user: false });
  } else {
    let user = null;
    try {
      const decoded = jwt.verify(token, process.env.APP_SECRET);
      user = await users.getOneById(decoded.userId);
    } catch (err) {
      res.send({ success: false, msg: err, user: false });
    }
    res.json({ success: true, user });
  }
};

// Middleware qui vérifie avant chaque route (en dehors des 3 suivantes) s'il y a un token valide
export const verifyToken = (req, res, next) => {
  if (
    req.originalUrl === '/users/register' ||
    req.originalUrl === '/users/login' ||
    req.originalUrl === '/authenticate'
  ) {
    next();
  } else {
    const token = req.headers['x-access-token'];
    jwt.verify(token, process.env.APP_SECRET, (err, decoded) => {
      if (err) {
        console.log(`Token invalide pour la route ${req.originalUrl}`);
      } else {
        next();
      }
    });
  }
};

export const hashPassword = async password => {
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

export const generateToken = userId => {
  if (process.env.APP_SECRET) {
    const payload = {
      userId,
    };
    const token = jwt.sign(payload, process.env.APP_SECRET, { expiresIn: '1d' });
    return token;
  } else {
    console.log('Cannot generate token, secret not found');
  }
};
