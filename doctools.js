/*
 *  OSATT FreeCad files handler
 *
 *  The first argument specifies create or extract
 *  The second specifies the target file or directory
 *  The third specifies where to put the output
 *
 * */

/* Test command :
 *  $node doctools.js teapot_with_sketch.fcstd teapot_with_sketch
 *
 * */ 

'use strict'
var JSZip = require("jszip"),
    fs = require("fs"),
    path = require("path");

var freeCadHandler = {};
var args = process.argv.slice(2);

freeCadHandler.create = function(source) {
  path.exists(source, function() {
    var zip = new JSZip();
    zip.folder(source);
    var zipfile = zip.generate({type:"nodebuffer", compression: "DEFLATE"});

    fs.writeFile("newFile.fcstd", zipfile, function(err) {
      if (err) throw err;
    });

    console.log('done.');
  });
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
