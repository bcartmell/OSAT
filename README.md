OSATT - CAD-Parsers
=====

Currently the only file here is doctools.py.  This file is a slightly-modified
copy of the file by the same name from FreeCad.  It's purpose is to extract and 
re-zip .FStd (FreeCad) files.

To extract FreeCad files in preparation for GIT tracking, run the following command:
```bash
  $python <path/to/doctools.py> extract <name of FreeCad file> <desired output folder>
```


To Compress an extracted folder back into a usable FreeCad file, run the following commad:
```bash
  $python <path/to/doctools.py> create <path to 'Document.xml'> <new_file_name.FCStd>
```

The 'Document.xml' file can be found among the files created by a previous extraction.


### Update!
Adding JS extractor.
  - Requires JSZip (Maybe)
