const fs = require("node:fs/promises");
const path = require("path");

const readJsonFile = async (filename) => {
  if (filename) {
    try {
      const filePath = path.join(__dirname, `../../_data/${filename}`);
      const result = await fs.readFile(filePath, { encoding: "utf8" });
      return result;
    } catch (err) {
      console.error(err.message);
    }
  }
};

const saveToJsonFile = async (filename, data) => {
  if (filename && data) {
    try {
      const filePath = path.join(__dirname, `../../_data/${filename}`);
      data = JSON.stringify(data, null, 2);
      await fs.writeFile(filePath, data, { encoding: "utf8" });
      return "File written successfully";
    } catch (err) {
      console.error(err.message);
    }
  }
};

module.exports = { readJsonFile, saveToJsonFile };
