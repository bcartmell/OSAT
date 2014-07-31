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
'use strict';

var JSZip = require('jszip'),
    fs = require('fs'),
    path = require('path'),
    dir = require('node-dir');

var freeCadHandler = {};
var args = process.argv.slice(2);

freeCadHandler.create = function(source) {
  // Create an empty JSZip object to represent our zip file.
  var zip = new JSZip();

  // Find subdirectories and add them to the zip
  dir.subdirs(source, function(err, subdirs ) {  if (err) throw err;
    for (var i=0; i<subdirs.length; i++) {
      // strip path to original folder from the directory name
      var dirName = subdirs[i].slice(source.length);
      // Create a directory of the same name in the zip file
      zip.folder(dirName);
      console.log('added subdir: '+ dirName);
    } // end for()
  }); // end dirs.subdirs()

  // Add the files to the zipfile
  dir.files(source, function(err, files) { if (err) throw err;
    for (var i=0; i<files.length; i++) {

      /* Pick up here*/
      var data, name;
      console.log((files[i]));
      zip.file();
    }
  });
  //var zipfile = zip.generate({type:"nodebuffer", compression: "DEFLATE"});
};

freeCadHandler.extract = function(source, destination) {
  console.log('extracting to '+ destination +' from '+ source +'.');
};

freeCadHandler.init = function(action, source, destination) {
  if (action == "create" || "extract") { // Only if a valid action is chosen
    console.log(freeCadHandler[action]);
    freeCadHandler[action](source, destination);
  }
  else {
    console.log('Bad input');
  }
}
console.log('calling init');
freeCadHandler.init(args[0],args[1],args[2]);
