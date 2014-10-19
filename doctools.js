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

function fileName(path, withExt) {
  path = path.split('/');
  path = path[path.length-1];
  path = path.slice[0, path.indexOf('.')];
  return withExt ? 
    (source) +".fcstd" :
    source;
}

exports.extract = function(source, destination) {
  if (!destination)  {
    destination = fileName(source);
  }
  fs.mkdir(destination, function() {
    console.log('extracting to '+ destination +' from '+ source +'.');
  });
}; // end .extract()

exports.addFilesToZip = function(files, zipObject, callback) {
  // A recursive function that loops through an array
  // of file paths and adds each one to a zip file.

  var filePath = files.pop();
  // get the last element from the files array.


  var fileName = helpers.whatsFilename(filePath, true);
  // set fileName by stripping directory information from filePath

  console.log('adding '+ fileName +' to zipObject');

  fs.readFile(filePath, function(err, fileContent) {
  // read the file with nodes fs(file-system) library

    zipObject.file(fileName, fileContent, {compression:"DEFLATE"});  
    // add the file to the zip folder.

    if (files.length > 0) {
    // If the array still has files,

      exports.addFilesToZip(files, zipObject, callback);
      //  run addFiles again.

    } else if (callback) {
    // loop is over,

      callback(zipObject);
      // write the file.
    }
  });
  // end fs.readFile() call

}; // end addFiles(files) definition

exports.writeFcstd = function(newFcstd) {
// write file to system

  console.log('\ncreating write buffer');

  var buffer = newFcstd.generate({type:"nodebuffer"});
  // generate buffer for new file

  fs.writeFile(newFcstd.name, buffer, function(err) {
  // write the file
    if (err) throw err;

    console.log('new Fcstd named "'+ newFcstd.name +'" created!');
    // confirm that the process completed successfully .

  }); // end writeFile()
}; // End writeFile() definition

function sortFcstdArray(files, targetName) {
  for (var i=0; i<files.length; i++) {
  // for each file path in the returned array.

    console.log('checking '+ files[i] +' for '+ targetName);
    if (files[i].indexOf(targetName) != -1) {

      console.log('found '+ targetName +' at postion '+ i + '\n');
      // if it is our target

      var target = files.splice(i, 1)[0];
      // pull it out of the array.

      console.log('targetName is '+ target +'\n');

      files.push(target);
      // and move it to the end of the array.

      break;
      // end the for loop, we got what we needed.
    } // end if
  } // end for loop
  return files;
}


exports.create = function(source, destination) {
  // resolve source
  source = helpers.resolveFile(source);

  // Define new zip object and set attributes.
  var fcstd = new jsz();
  console.log('finding the file name from '+ source);
  fcstd.name = helpers.whatsFilename(source) +'.fcstd';
  fcstd.dir = true;                                         

  console.log('name of new file set to '+ fcstd.name);

  dir.files(source, function(err, files) {
  // find all files in source directory
    if (err) throw err;

    files = sortFcstdArray(files, 'GuiDocument.xml');
    files = sortFcstdArray(files, 'Document.xml');
    console.log('files');

    exports.addFilesToZip(files, fcstd, function(newFcstd) {
    // add the files to the zip,

      console.log('writing file');
      exports.writeFcstd(newFcstd);
      // then write the file.

    }); // end addFilesToZip() call
  }); // end dir.files() call

}; //  end create();

