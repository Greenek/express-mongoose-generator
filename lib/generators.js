/**
 * Module dependencies
 */
var ft = require('./fileTools');
var formatTools = require('./formatTools');

/**
 * Generate a Mongoose model
 * @param path {string}
 * @param modelName {string}
 * @param modelFields {array}
 */
function generateModel(path, modelName, modelFields) {
  ft.createDirIfIsNotDefined(path, 'models', function() {
    var fields = formatTools.getFieldsForModelTemplate(modelFields);
    var schemaName = modelName + 'Schema';

    var model = ft.loadTemplateSync('model.js');
    model = model.replace(/{modelName}/g, modelName);
    model = model.replace(/{schemaName}/g, schemaName);
    model = model.replace(/{fields}/, fields);

    ft.writeFile(path + '/models/' + modelName + 'Model.js', model);
  });
}

/**
 * Generate a Express router
 * @param path {string}
 * @param modelName {string}
 */
function generateRouter(path, modelName) {
  ft.createDirIfIsNotDefined(path, 'routes', function() {
    var router = ft.loadTemplateSync('router.js');
    router = router.replace(/{controllerName}/, modelName + 'Controller');
    router = router.replace(/{modelName}/g, modelName);

    ft.writeFile(path + '/routes/' + modelName + 's.js', router);
  });
}

/**
 * Generate Controller
 * @param path {string}
 * @param modelName {string}
 * @param modelFields {array}
 */
function generateController(path, modelName, modelFields) {
  ft.createDirIfIsNotDefined(path, 'controllers', function() {
    var controller = ft.loadTemplateSync('controller.js');
    var model = formatTools.camelize(modelName, true);
    var pluralName = formatTools.pluralize(modelName);
    var controllerName = modelName + 'Controller';

    var updateFields = '';
    var createFields = '\n';
    modelFields.forEach(function(f, index, fields) {
      var field = f.name;

      updateFields += modelName + '.' + field + ' = req.body.' + field;
      updateFields += ' ? req.body.' + field + ' : ' + modelName + '.' + field + ';';

      if (index < modelFields.length - 1) {
        updateFields += '\n      ';
      }

      createFields += '      ' + field + ': req.body.' + field + ',\n';
    });

    controller = controller.replace(/{modelName}/g, modelName + 'Model');
    controller = controller.replace(/{model}/g, model);
    controller = controller.replace(/{name}/g, modelName);
    controller = controller.replace(/{pluralName}/g, pluralName);
    controller = controller.replace(/{controllerName}/g, controllerName);
    controller = controller.replace(/{createFields}/g, createFields);
    controller = controller.replace(/{updateFields}/g, updateFields);

    ft.writeFile(path + '/controllers/' + modelName + 'Controller.js',
      controller);
  });
}

module.exports = {
  generateModel: generateModel,
  generateRouter: generateRouter,
  generateController: generateController,
};
