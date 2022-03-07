/**
 * Starts rover application with visual ascii art.
 */

const fs = require("fs");
const { createAndConfigApp } = require("./utils");

const { log, roverApp, fileToImport } = createAndConfigApp(__filename);
const stream = fs.createReadStream(fileToImport, "utf8");

roverApp
  .startFromStream(stream)
  .then((outputStream) => {
    console.log(`${log} Output rover monitor from stream:`);
    console.log(outputStream);
  })
  .catch((e) => console.error(e));
