const bcrypt = require('bcrypt');

import Users from '../../database/models/Users';
import { hashPassword, generateToken } from '../lib/authentication';

const emailRegex = /[a-z0-9]+[_a-z0-9\.-]*[a-z0-9]+@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})/;

const users = {
  createOne: async (req, res) => {
    let users = new Users();

    const emailAlreadyExist = await users.getUserByEmail(req.body.email).rowCount;
    if (emailAlreadyExist) {
      res.json({ success: false, msg: 'Cet e-mail existe déjà.' });
    } else if (!emailRegex.test(req.body.email)) {
      res.json({
        success: false,
        msg: 'Veuillez taper un e-mail valide.',
      });
    } else {
      // On hash le password avant d'enregistrer le user dans la base de données
      const hashedPassword = await hashPassword(req.body.password);

      const userInfos = {
        role: 'bénévole', // Le user est bénévole par défaut
        email: req.body.email,
        password: hashedPassword,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phone: req.body.phone,
        image: null,
      };
      let newUser = null;
      try {
        newUser = await users.createOne(userInfos);
      } catch (error) {
        res.json(error.message);
      }
      const token = generateToken(newUser.rows[0].user_id);
      res.json({ success: true, msg: 'Inscription réussie', token });
    }
  },

  login: async (req, res) => {
    let users = new Users();
    let userToLog = null;
    try {
      userToLog = await users.getUserByEmail(req.body.email);
      if (!userToLog.rowCount) {
        res.send({ success: false, msg: "L'utilisateur n'existe pas." });
      }
      const isPasswordRight = await bcrypt.compare(req.body.password, userToLog.rows[0].password);
      if (!isPasswordRight) {
        res.send({ success: false, msg: 'Le mot de passe est incorrect.' });
      }
    } catch (error) {
      res.send(error.message);
    }
    const token = generateToken(userToLog.rows[0].user_id);
    res.json({ success: true, msg: 'Connexion réussie', token });
  },

  getAll: async (req, res) => {
    let users = new Users();
    let allUsers = null;

    try {
      allUsers = await users.getAll();
    } catch (error) {
      res.send(error.message);
    }
    return res.send(allUsers.rows);
  },

  getOne: async (req, res) => {
    const id = req.params.id;

    let users = new Users();
    let user = null;

    try {
      user = await users.getOne('user_id', id);
    } catch (error) {
      res.send(error.message);
    }
    return res.send(user.rows);
  },

  getOneById: async id => {
    let users = new Users();
    let user = null;

    try {
      user = await users.getOne('user_id', id);
    } catch (error) {
      console.log(error.message);
    }
    return user.rows[0];
  },

  updateOne: async (req, res) => {
    const id = req.params.id;
    const keyValue = {
      role: 'volunteer',
      email: req.body.email,
      password: hashedPassword,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      phone: req.body.phone,
      image: req.body.image,
    };

    let users = new Users();
    let updatedUser = null;

    try {
      updatedUser = await users.updateOne(keyValue, 'user_id', id);
    } catch (error) {
      res.send(error.message);
    }
    return res.send({ 'User updated': updatedUser.rows });
  },

  deleteOne: async (req, res) => {
    const id = req.params.id;

    let users = new Users();
    let deletedUser = null;

    try {
      deletedUser = await users.deleteOne('user_id', id);
    } catch (error) {
      res.send(error.message);
    }
    return res.send({ 'User deleted': deletedUser.rows });
  },
};

export default users;
