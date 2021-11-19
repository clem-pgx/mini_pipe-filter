module.exports = async function (str) {
    fs = require('fs');

    fs.writeFile(str[1], str[0], function (err) {
        if (err) return console.log(err);
        console.log(str[0] + ' > ' + str[1]);
    });
};
