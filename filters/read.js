module.exports = async function (file) {
  const fs = require("fs").promises;
  try {
    data = await fs.readFile(file);
    console.log(data.toString());
  } catch (error) {
    console.error(`Got an error trying to read the file: ${error.message}`);
  }
  return data.toString();
};
