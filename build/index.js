"use strict";

var _database = require("./database");

var _initializeRoles = _interopRequireDefault(require("./libs/initializeRoles"));

var _config = _interopRequireDefault(require("./config"));

var _app = _interopRequireDefault(require("./app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_app.default.listen(_config.default.PORT || 3000, () => {
  console.log("Listen");
});