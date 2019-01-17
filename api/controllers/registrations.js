const Registrations = require('../../database/models/Registrations');

const registrations = {
  getAll: async (req, res) => {
    let registrations = new Registrations();
    let allRegistrations = null;

    try {
      allRegistrations = await registrations.getAll();
    } catch (error) {
      res.send(error);
    }
    return res.send(allRegistrations.rows);
  },

  getOne: async (req, res) => {
    const id = req.params.id;

    let registrations = new Registrations();
    let registration = null;

    try {
      registration = await registrations.getOne('registration_id', id);
    } catch (error) {
      res.send(error);
    }
    return res.send(registration.rows);
  },

  createOne: async (req, res) => {
    const keyValue = {
      user_id: req.body.user_id,
      action_id: req.body.action_id,
    };

    let registrations = new Registrations();
    let newRegistration = null;

    try {
      newRegistration = await registrations.createOne(keyValue);
    } catch (error) {
      res.send(error);
    }
    return res.send({ 'New registration created': newRegistration.rows[0] });
  },

  deleteOne: async (req, res) => {
    const id = req.params.id;

    let registrations = new Registrations();
    let deletedRegistration = null;

    try {
      deletedRegistration = await registrations.deleteOne('registration_id', id);
    } catch (error) {
      res.send(error);
    }
    return res.send({ 'Registration deleted': deletedRegistration.rows });
  },
};

module.exports = registrations;
