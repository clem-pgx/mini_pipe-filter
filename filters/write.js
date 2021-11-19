module.exports = async function (str, filepath) {
    fs = require('fs');
    fs.writeFile(filepath, str, function (err) {
        if (err) return console.log(err);
        console.log('The file ' + filepath + ' was saved!');    });
};
