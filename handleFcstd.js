'use strict';
var child = require('child_process');

exports.create = function(source, destination) {
  child.spawn('python', ['doctools.py', 'create', source, destination]);
}

exports.extract = function(source, destination) {
  child.spawn('python' ,['doctools.py', 'extract', source, destination]);
}
