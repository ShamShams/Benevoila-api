import Actions from '../../database/models/Actions';

const actions = {
  getAll: async (req, res) => {
    let actions = new Actions();
    let allActions = null;

    try {
      allActions = await actions.getAll();
    } catch (error) {
      res.send(error);
    }
    return res.send(allActions.rows);
  },

  getOne: async (req, res) => {
    const id = req.params.id;

    let actions = new Actions();
    let action = null;

    try {
      action = await actions.getOne('action_id', id);
    } catch (error) {
      res.send(error);
    }
    return res.send(action.rows[0]);
  },

  createOne: async (req, res) => {
    const keyValue = {
      action_type_id: req.body.action_type_id,
      address: req.body.address,
      zipcode: req.body.zipcode,
      city: req.body.city,
      need: req.body.need,
      referent_id: req.body.referent_id,
      details: req.body.details,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
    };

    let actions = new Actions();
    let newAction = null;

    try {
      newAction = await actions.createOne(keyValue);
    } catch (error) {
      res.send(error);
    }
    return res.json({ success: true, msg: 'L’action a été créée avec succès' });
  },

  updateOne: async (req, res) => {
    const id = req.params.id;
    const keyValue = {
      action_type_id: req.body.action_type_id,
      address: req.body.address,
      zipcode: req.body.zipcode,
      city: req.body.city,
      need: req.body.need,
      referent_id: req.body.referent_id,
      details: req.body.details,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
    };

    let actions = new Actions();
    let updatedAction = null;

    try {
      updatedAction = await actions.updateOne(keyValue, 'action_id', id);
    } catch (error) {
      res.send(error);
    }
    return res.json({ success: true, msg: 'L’action a été modifiée avec succès' });
  },

  deleteOne: async (req, res) => {
    const id = req.params.id;

    let actions = new Actions();
    let deletedAction = null;

    try {
      deletedAction = await actions.deleteOne('action_id', id);
    } catch (error) {
      res.send(error);
    }
    return res.send({ success: true, msg: 'L’action a été supprimée avec succès' });
  },

  // CUSTOM METHODS
  getAllWithType: async (req, res) => {
    let actions = new Actions();
    let actionsWithType = null;

    try {
      actionsWithType = await actions.getAllWithType();
    } catch (error) {
      res.send(error);
    }
    return res.send(actionsWithType.rows);
  },
};

export default actions;
