import Registrations from '../../database/models/Registrations';

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

  getAllByUser: async (req, res) => {
    const { id } = req.params;

    let registrations = new Registrations();
    let userRegistrations = null;

    try {
      userRegistrations = await registrations.getAllByUser(id);
    } catch (error) {
      res.send(error.message);
    }
    return res.send(userRegistrations.rows);
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
    const { user_id, action_id } = req.body;
    let registrations = new Registrations();

    const registrationAlreadyExist = await registrations.getOneByUserAndActionId(
      user_id,
      action_id
    );
    if (registrationAlreadyExist.rowCount) {
      res.send({ success: false, msg: 'Vous êtes déjà inscrit à cette action' });
    } else {
      const keyValue = {
        user_id,
        action_id,
      };
      let newRegistration = null;
      try {
        newRegistration = await registrations.createOne(keyValue);
      } catch (error) {
        res.send({ success: false, error: error.message, msg: 'Erreur lors de l’inscription' });
      }
      return res.send({
        success: true,
        info: newRegistration.rows[0],
        msg: 'Vous avez bien été inscrit',
      });
    }
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

export default registrations;
