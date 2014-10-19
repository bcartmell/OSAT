var path = require('path');

exports.resolveFile = function(url) {
  return path.resolve(path.normalize(url));
};

exports.whatsFilename = function(filePath, withExt) {
  var extIndex;

  console.log('\nwhatsFilename report: \nreceived filePath: '+ filePath);

  filePath = filePath.split('/');
  // create array of path parts.
  console.log('=>'+ filePath);

  filePath = filePath[filePath.length-1];
  // the last one is the file name.
  console.log('=>'+ filePath);

  extIndex = filePath.indexOf('.');
  if (!withExt && extIndex > -1) filePath = filePath.slice(0, filePath.indexOf('.'));
  // if a truthy value was not past for withExt, chop off the extension.
  console.log('=>'+ filePath);

  return filePath;
}
