var path = require('path');
var fs = require('fs');

function getAssetsFileOptions(folder, compilation) {
    var fileOptions = [];
    var allFiles = Object.keys(compilation.assets);

    /*
    fs.writeFile("C:/Users/rg.CIRCUM/Desktop/Cnp.Agsi.Intra.Theme/log.log", Object.keys(compilation.chunks), function(err) {
        if(err) {
            return console.log(err);
        }    
        console.log("The file was saved!");
    });
    */

    compilation.chunks.forEach(function(chunk) {
		//re-upload only changed files
		if(!chunk.rendered) {
			return;
		}

        allFiles.forEach(function (filePath) {

            //console.log(compilation.assets[filePath].size());
            //console.log(fs.stat(filePath));

            var newFolder = path.join(folder, path.dirname(filePath));
            newFolder = newFolder.replace(/\\/g, '/');

            fileOptions.push({
                folder: newFolder,
                fileName: path.basename(filePath),
                fileContent: compilation.assets[filePath].source()
            })
        });
    });

    return fileOptions;
}

module.exports = {
    getAssetsFileOptions
}