var {model} = require('../models/{modelName}.js');

/**
 * @module models/{controllerName}.js
 * @description Server-side logic for managing {pluralName}.
 */
module.exports = {

  /**
   * GET {controllerName}
   */
  list: function(req, res) {
    {model}.find(function(err, {pluralName}) {
      if (err) {
        return res.status(500).json({
          message: 'Error getting {name}.',
        });
      }
      return res.json({pluralName});
    });
  },

  /**
   * GET {controllerName}
   */
  show: function(req, res) {
    var id = req.params.id;
    {model}.findOne({_id: id}, function(err, {name}) {
      if (err) {
        return res.status(500).json({
          message: 'Error getting {name}.',
        });
      }
      if (!{name}) {
        return res.status(404).json({
          message: 'No such {name}',
        });
      }
      return res.json({name});
    });
  },

  /**
   * POST {controllerName}
   */
  create: function(req, res) {
    var {name} = new {model}({{createFields}
    });

    {name}.save(function(err, {name}) {
      if (err) {
        return res.status(500).json({
          message: 'Error saving {name}',
          error: err,
        });
      }
      return res.json({
        message: 'saved',
        _id: {name}._id,
      });
    });
  },

  /**
   * PUT {controllerName}
   */
  update: function(req, res) {
    var id = req.params.id;
    {model}.findOne({_id: id}, function(err, {name}) {
      if (err) {
        return res.status(500).json({
          message: 'Error saving {name}',
          error: err,
        });
      }
      if (!{name}) {
        return res.status(404).json({
          message: 'No such {name}',
        });
      }

      {updateFields}

      {name}.save(function(err, {name}) {
        if (err) {
          return res.status(500).json({
            message: 'Error getting {name}.',
          });
        }
        if (!{name}) {
          return res.status(404).json({
            message: 'No such {name}',
          });
        }
        return res.json({name});
      });
    });
  },

  /**
   * DELETE {controllerName}
   */
  remove: function(req, res) {
    var id = req.params.id;
    {model}.findByIdAndRemove(id, function(err, {name}) {
      if (err) {
        return res.status(500).json({
          message: 'Error getting {name}.',
        });
      }
      return res.json({name});
    });
  },

};
