var controller = require('../controllers/{controllerName}.js');

module.exports = function(router) {

  /*
   * GET
   */
  router.get('/{modelName}', function(req, res) {
    controller.list(req, res);
  });

  /*
   * GET
   */
  router.get('/{modelName}/:id', function(req, res) {
    controller.show(req, res);
  });

  /*
   * POST
   */
  router.post('/{modelName}', function(req, res) {
    controller.create(req, res);
  });

  /*
   * PUT
   */
  router.put('/{modelName}/:id', function(req, res) {
    controller.update(req, res);
  });

  /*
   * DELETE
   */
  router.delete('/{modelName}/:id', function(req, res) {
    controller.remove(req, res);
  });

};
