/**
 * Starts rover application with visual ascii art.
 */

const fs = require("fs");
const { createAndConfigApp } = require("./utils");

const { log, roverApp, fileToImport } = createAndConfigApp(__filename);

const buffer = fs.readFileSync(fileToImport);
const output = roverApp.start(buffer.toString());

console.log(`${log} Output rover monitor from string:`);
console.log(output);
