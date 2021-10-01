"use strict";

var _database = require("./database");

var _initializeRoles = _interopRequireDefault(require("./libs/initializeRoles"));

var _app = _interopRequireDefault(require("./app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _initializeRoles.default)();

_app.default.listen(3000, () => {
  console.log("Listen");
});