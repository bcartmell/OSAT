'use strict';
var jsz = require('jszip'),
    fs = require('fs'),
    path = require('path'),
    dir = require('node-dir'),
    helpers = require('./helpers.js');

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

function nameFile(source) {
  source = source.split('/');
  source = source[source.length-1];
  source = source.slice[0, source.indexOf('.')];
  return (source || "teapot_with_shapes") +".fcstd";
}

exports.create = function(source) {
  // resolve source
  source = helpers.resolveFile(source);

  // Define new zip object and set attributes.
  var fcstd = new jsz();
  console.log('finding the file name from '+ source);
  fcstd.name = helpers.whatsFilename(source);
  fcstd.dir = true;

  // Document.xml needs to be the first file in the folder.
  fs.readFile(source+'/Document.xml', function(err, fileContent){
    if (err) throw err;
    fcstd.file('Document.xml', fileContent, {compression:"DEFLATE"});  

    // Add the rest of the files
    dir.readFiles(source, {shortName:true}, function(err, fileContent, fileName, next) {
        if (err) throw err;
        if (fileName != 'Document.xml') {
          fcstd.file(fileName, fileContent, {compression:"DEFLATE"});  
        }
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
  });
}; //  end create();

exports.extract = function(source, destination) {
  console.log('extracting to '+ destination +' from '+ source +'.');
};
