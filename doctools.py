#! python
# -*- coding: utf-8 -*-
# (c) 2010 Werner Mayer LGPL
# FreeCAD Python script to work with the FCStd file format.

# Script modified by OSATT to be accessible from commad line for 
# to extract FreeCad files for tracking in GIT and re-compressing
# for use.

import os,sys,string
import xml.sax
import xml.sax.handler
import xml.sax.xmlreader
import zipfile

# Custom additions by OSATT

import time # for debugging

action = sys.argv[1]
filename = sys.argv[2]
outpath = sys.argv[3]
# End Custom additions by OSATT

# SAX handler to parse the Document.xml
class DocumentHandler(xml.sax.handler.ContentHandler):
	def __init__(self, dirname):
		self.files = []
		self.dirname = dirname

	def startElement(self, name, attributes):
		item=attributes.get("file")
		if item != None:
			self.files.append(os.path.join(self.dirname,str(item)))

	def characters(self, data):
		return

	def endElement(self, name):
		return

def extractDocument(filename, outpath):
	zfile=zipfile.ZipFile(filename)
	files=zfile.namelist()
	
	for i in files:
		data=zfile.read(i)
		dirs=i.split("/")
		if len(dirs) > 1:
			dirs.pop()
			curpath=outpath
			for j in dirs:
				curpath=curpath+"/"+j
				os.mkdir(curpath)
		output=open(outpath+"/"+i,"wb")
		output.write(data)
		output.close()

def createDocument(filename, outpath):
  files=getFilesList(filename)
  # get a list of files in this directory

  compress=zipfile.ZipFile(outpath,'w',zipfile.ZIP_DEFLATED)
  # create zipfile called compress.

  for i in files:
    dirs=os.path.split(i)
    compress.write(i,dirs[-1],zipfile.ZIP_DEFLATED)

  compress.close()

def getFilesList(filename):
	dirname=os.path.dirname(filename)
	handler=DocumentHandler(dirname)
	parser=xml.sax.make_parser()
	parser.setContentHandler(handler)
	parser.parse(filename)

	files=[]
	files.append(filename)
	files.extend(iter(handler.files))
	dirname=os.path.join(dirname,"GuiDocument.xml")
	if os.path.exists(dirname):
		files.append(dirname)
	return files


# Custom additions by OSATT
if action == "create":
  # Create FreeCad file
  print "Creating document..."
  createDocument(filename, outpath)
  print "Document created."
elif action == "extract":
  # Extract FreeCad file
  print "Extracting document..."
  extractDocument(filename, outpath)
  print "Document extracted."
else:
  print "invalid input."
