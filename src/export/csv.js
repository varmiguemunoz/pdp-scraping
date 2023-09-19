const { parse } = require("json2csv");
const path = require("path");
const fs = require("fs");

const outputPath = path.join(__dirname, "../data", "data.csv");

const csv = async () => {
  try {
    const jsonData = require("../../data/data.json");
    const csvData = parse(jsonData);

    fs.writeFile(outputPath, csvData, function (err) {
      if (err) {
        throw err;
      }
      console.log("Exported CSV successfully");
    });
  } catch (error) {
    console.error("Error:", error);
  }
};

csv();
