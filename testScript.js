'use strict';
var handleFcstd = require('./handleFcstd.js');
var cadHand = require('./doctools.js');

//cadHand.extract('./teapot_with_sketch/teapot_with_sketch.fcstd', './teapot_with_sketch/teapot_with_sketch_EXTRACTED');

//cadHand.create('./teapot_with_shapes');
//cadHand.create('./teapot_with_sketch/teapot_with_sketch_extract');
handleFcstd.create('./teapot_with_shapes/Document.xml', './teapot.fcstd');
