
var allowedFieldsTypes = {
  string: String,
  number: Number,
  date: Date,
  boolean: Boolean,
  array: Array,
};

/**
 * Convert string into camelCase or UpperCamelCase format.
 * @author http://stackoverflow.com/a/2970667
 * @param  {string} str
 * @param  {boolean} upper (default false)
 * @return {string}
 */
function camelize(str, upper) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
    return index === 0 && !upper ? letter.toLowerCase() : letter.toUpperCase();
  }).replace(/\s+/g, '');
}

/**
 * Format the fields for the model template
 * @param fields {array} fields input
 * @returns {string} formatted fields
 */
function getFieldsForModelTemplate(fields) {
  var lg = fields.length - 1;

  var modelFields = '{\n';
  fields.forEach(function(field, index, array) {
    modelFields += '  ' + field.name + ': ';
    modelFields += (allowedFieldsTypes[field.type]).name;
    modelFields += ',\n';
  });
  modelFields += '}';

  return modelFields;
}

/**
 * Puts a word in the plural
 * @param word
 * @returns {string}
 */
function pluralize(word) {
  return word + 's';
}

module.exports = {
  camelize: camelize,
  getFieldsForModelTemplate: getFieldsForModelTemplate,
  pluralize: pluralize,
};
