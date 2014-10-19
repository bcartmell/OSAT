var path = require('path');

exports.resolveFile = function(url) {
  return path.resolve(path.normalize(url));
};

exports.whatsFilename = function(filePath, withExt) {
  var extIndex;

  filePath = filePath.split('/');
  // create array of path parts.

  filePath = filePath[filePath.length-1];
  // the last one is the file name.

  extIndex = filePath.indexOf('.');
  if (!withExt && extIndex > -1) filePath = filePath.slice(0, filePath.indexOf('.'));
  // if a truthy value was not past for withExt, chop off the extension.

  return filePath;
}
