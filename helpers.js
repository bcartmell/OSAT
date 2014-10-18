var path = require('path');

exports.resolveFile = function(url) {
  return path.resolve(path.normalize(url));
};

exports.whatsFilename = function(filePath) {
  filePath = filePath.split('/');
  filePath = filePath[filePath.length-1];
  filePath = filePath.slice[0, filePath.indexOf('.')];
  return (filePath || "teapot_with_shapes") +".fcstd";
}
