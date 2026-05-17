const connection = require("./connection");
const { logError } = require("./logError");

exports.db = connection;
exports.logError = logError;