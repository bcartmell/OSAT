'use strict';
var jsz = require('jszip');
var fs = require('fs');
var path = require('path');
var dir = require('node-dir');

/*
 *  OSATT FreeCad files handler
 *
 *  The first argument specifies create or extract
 *  The second specifies the target file or directory
 *  The third specifies where to put the output
 *  
 *  FreeCad files are really just zip files with a different file extension.
 *  In order to track differences in version, we must extract the zip file
 *  and track the resulting directory.  
 *  When a copy of the file is requested, we'll zip it up again for delivery.
 *
 * */

/* Test command :
 *  $node doctools.js teapot_with_sketch.fcstd teapot_with_sketch
 *
 * */ 

var freeCadHandler = {};

function nameFile(source) {
  console.log('source: '+ source);
  source = source.split('/');
  console.log('source: '+ source);
  source = source[source.length-1];
  console.log('source: '+ source);
  source = source.slice[0, source.indexOf('.')];
  console.log('source: '+ source);
  return (source || "teapot_with_shapes") +".fcstd";
}

exports.create = function(source) {
  // resolve source
  source = path.resolve(path.normalize(source));
  var sourcePath = source.split('/');
  // Define new zip object and set attributes.
  var fcstd = new jsz();
  fcstd.name = nameFile(source)
  fcstd.dir = true;

  dir.readFiles(source, {shortName:true}, function(err, fileContent, fileName, next) {
      if (err) throw err;
      fcstd.file(fileName, fileContent, {compression:"DEFLATE"});  
      next();
    }, function(err, files) { // when finished
      if (err) throw err;
      // generate buffer for new file
      var buffer = fcstd.generate({type:"nodebuffer"});
      // write the file
      fs.writeFile(fcstd.name, buffer, function(err) {
        if (err) throw err;
        console.log('new Fcstd created!');
      }); // end writeFile()
  }); // end dir.readFiles
}; //  end create();

exports.extract = function(source, destination) {
  console.log('extracting to '+ destination +' from '+ source +'.');
};
