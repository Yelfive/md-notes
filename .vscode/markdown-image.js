/*
Markdown-image.DIY: Path
The Code File Path. You can write a Node.js code file to upload,
and fill in the file path to here. Your code must exports a functionas async
function (filePath:string, savePath:string, markdownPath:string):string.

For example:

const path = require('path');
module.exports = async function(filePath, savePath, markdownPath) {
   // Return a picture access link
   return path.relative(path.dirname(markdownPath), filePath); 
}


The arguments are :

- filePath: The absolute path of the file.
- savePath: The path of the saved file generate according to Markdown-image › Base: Format.
- markdownPath: The path of markdown file being edited.
*/

const path = require('path');

module.exports = async function(filePath, savePath, markdownPath) {
   // Return a picture access link
   console.log({filePath, savePath, markdownPath})
   return './' + path.relative(path.dirname(markdownPath), filePath); 
}